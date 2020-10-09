import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Query, Resolver, UseMiddleware } from "type-graphql";
import { tblUser as User } from "../entitites/User";
import argon from 'argon2'
import rand from 'csprng'
import { MyContext } from "../MyContext";
import { changePassword, createAccessToken, refreshAccessToken } from "../utils/auth";
import { isAuth } from "../utils/isAuth";
import { SendRefreshToken } from "../utils/sedRefreshToken";
import { sendEmail } from "../utils/sendEmail";
import { validateCpf, validateEmail, validateEndereco, validateName, validateSenha, validateTelefone } from "../utils/validateFields";
import { verify } from "jsonwebtoken";
import { CHANGE_PASSWORD_SECRET } from "../consts";

@ObjectType()
class FieldError {
    @Field()
    field: string

    @Field()
    message: string
}

@ObjectType()
class UserResponse {
    @Field(() => [FieldError], {nullable: true})
    errors?: FieldError[]

    @Field(() => String, {nullable: true})
    accessToken?: string
}

@InputType()
class LoginInput {
    @Field()
    cpf: string

    @Field()
    senhaUser: string
}

@InputType()
class RegisterInput {
    @Field()
    cpf: string

    @Field()
    nomeUser: string

    @Field()
    senhaUser: string

    @Field()
    email: string

    @Field()
    telefone: string

    @Field()
    cep: string

    @Field()
    rua: string

    @Field()
    numero: string

    @Field(() => String, {nullable: true})
    complemento?: string
}

@Resolver()
export class userResolver {

    @Mutation(() => UserResponse)
    async register(
        @Arg('input') input: RegisterInput
    ): Promise<UserResponse> {
        const errosCpf = validateCpf(input.cpf)
        if(errosCpf) {
            return {errors: errosCpf}
        }

        const errosNome = validateName(input.nomeUser)
        if(errosNome) {
            return {errors: errosNome}
        }

        const errosSenha = validateSenha(input.senhaUser)
        if(errosSenha) {
            return {errors: errosSenha}
        }

        const errosEmail = validateEmail(input.email)
        if(errosEmail) {
            return {errors: errosEmail}
        }

        const errosTelefone = validateTelefone(input.telefone)
        if(errosTelefone) {
            return {errors: errosTelefone}
        }

        const errosEndereco = validateEndereco(input.cep, input.rua, input.numero)
        if(errosEndereco) {
            return {errors: errosEndereco}
        }
        const endereco = `${input.cep},${input.rua},${input.numero},${input.complemento}`

        const salt = rand(256, 16)
        console.log('salt: ', salt)
        const senhaIntermed = salt + input.senhaUser
        const hashedPassword = await argon.hash(senhaIntermed)
        let user: User
        try {
            user = await User.create({cpf: input.cpf, senhaUser: hashedPassword, nomeUser: input.nomeUser, fone: input.telefone, salt, email: input.email, endereco: endereco}).save()
        }
        catch(err) {
            if(err.number === 2627) {
                return {
                    errors: [{
                        field: 'cpf',
                        message: 'cpf já cadastrado'
                    }]
                }
            }
        }
        return {
            accessToken: createAccessToken(user!)
        }
        // return {user}
    }

    @Mutation(() => UserResponse || Boolean)
    async login(
        @Arg('input') input: LoginInput,
        @Ctx() {res}: MyContext
    ): Promise<UserResponse | Boolean> {
        if(!input.cpf) {
            return {errors: [{
                field: 'cpf',
                message: 'Este campo é obrigatório'
            }]}
        }
        if(input.cpf.length !== 11) {
            return {errors: [{
                field: 'cpf',
                message: 'Verifique se o CPF foi digitado corretamente'
            }]}
        }
        if(input.cpf === '11111111111' || input.cpf === '22222222222' || input.cpf === '33333333333' || input.cpf === '44444444444' || input.cpf === '55555555555' || input.cpf === '66666666666' || input.cpf === '77777777777' || input.cpf === '88888888888' || input.cpf === '99999999999' || input.cpf === '00000000000') {
            return {errors: [{
                field: 'cpf',
                message: 'CPF inválido'
            }]}
        }
        if(!input.cpf.match(/^[0-9]+$/)) {
            return {errors: [{
                field: 'cpf',
                message: 'Digite apenas os números, sem pontos ou traços'
            }]}
        }
        if(!input.senhaUser) {
            return {
                errors: [{
                    field: 'senha',
                    message: 'Digite sua senha'
                }]
            }
        }
        const user = await User.findOne({cpf: input.cpf})
        if(!user) {
            return {
                errors: [{
                    field: 'cpf',
                    message: 'este cpf não está cadastrado no sistema'
                }]
            }
        }
        const senhaIntermed = user.salt + input.senhaUser
        const valid = await argon.verify(user.senhaUser, senhaIntermed)
        if(!valid) {
            console.log('valid: ', valid)
            console.log('senha usuario: ', user.senhaUser)
            return {
                errors: [{
                    field: 'senha',
                    message: 'senha incorreta'
                }]
            }
        }
        SendRefreshToken(res, user)
        return {
            accessToken: createAccessToken(user)
        }
        // return true
    }

    @Query(() => String)
    @UseMiddleware(isAuth)
    testeAuth(
        @Ctx() {payload}: MyContext
    ): String {
        console.log(payload)
        return `your user id is: ${payload?.userId}`
    }

    @Query(() => User || undefined)
    @UseMiddleware(isAuth)
    async me(
        @Ctx() {payload}: MyContext
    ): Promise<User | undefined> {
        if(!payload?.userId) {
            console.log('payload user id: ', payload?.userId)
            return undefined
        }
        const user = await User.findOne(payload.userId)
        if(!user) {
            console.log('user: ', user)
            return undefined
        }
        return user
    }

    @Mutation(() => Boolean)
    async forgotPassword(
        @Arg('email') email: string
    ): Promise<Boolean> {
        const user = await User.findOne({email: email})
        if(!user) {
            return false
        }
        const token = changePassword(user)
        sendEmail(email,`<a href="http://localhost:3000/change-password/${token}">trocar senha</a>`)
        return true
    }

    @Mutation(() => UserResponse)
    async changePassword(
        @Arg('senha') senha: string,
        @Arg('confirmarSenha') confirmarSenha: string,
        @Arg('token') token: string
    ): Promise<UserResponse> {
        const valid = verify(token, CHANGE_PASSWORD_SECRET) as {userId: string, iat: number, exp: number}
        if(!valid) {
            return {
                errors: [{
                    field: 'token',
                    message: 'token inválido, solicite um novo'
                }]
            }
        }
        const user = await User.findOne(valid.userId)
        if(!user) {
            return {
                errors: [{
                    field: 'token',
                    message: 'token inválido, solicite um novo'
                }]
            }
        }
        const errosSenha = validateSenha(senha)
        if(errosSenha) {
            return {errors: errosSenha}
        }
        if(senha !== confirmarSenha) {
            return {
                errors: [{
                    field: 'confimarSenha',
                    message: 'as senhas devem bater'
                }]
            }
        }
        user.senhaUser = await argon.hash(user.salt + senha)
        await user.save()
        return {accessToken: createAccessToken(user)}
    }

    @Mutation(() => UserResponse || Boolean)
    @UseMiddleware(isAuth)
    async changeInformations(
        @Arg('email') email: string,
        @Arg('telefone') telefone: string,
        @Arg('cep') cep: string,
        @Arg('rua') rua: string,
        @Arg('numero') numero: string,
        @Arg('complemento', () => String, {nullable: true}) complemento: string,
        @Ctx() {payload}: MyContext
        ): Promise<UserResponse | Boolean> {
        const errosEmail = validateEmail(email)
        if(errosEmail) {
            return {errors: errosEmail}
        }
        
        const errosTelefone = validateTelefone(telefone)
        if(errosTelefone) {
            return {errors: errosTelefone}
        }

        const errosEndereco = validateEndereco(cep, rua, numero)
        if(errosEndereco) {
            return {errors: errosEndereco}
        }

        const user = await User.findOne(payload?.userId)
        if(!user) {
            return {
                errors: [{
                    field: 'token',
                    message: 'token inválido'
                }]
            }
        }
        user.email = email
        user.fone = telefone
        user.endereco = `${cep},${rua},${numero},${complemento}`
        await user.save()
        return true
    }

    @Mutation(() => Boolean)
    async wipeUsers(): Promise<Boolean> {
        try{
            await User.delete({})
        }
        catch (err) {
            console.log(err)
        }
        return true
    }

    @Query(() => User || undefined)
    async testeAqui(
        // @Arg('id') id: string,
        @Ctx() {payload}: MyContext
    ):Promise<User | undefined> {
        console.log('payload user Id: ', payload?.userId)
        return await User.findOne(payload?.userId)
    }
}