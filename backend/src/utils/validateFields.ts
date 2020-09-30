export const validateEmail = (email: string): [{field: string, message: string}] | undefined => {
    if(!email) {
        return [{
            field: 'email',
            message: 'É necessário inserir um email'
        }]
    }
    if(!email.includes('@')) {
        return [{
            field: 'email',
            message: 'Insira um email válido'
        }]
    }
    if(email.length < 7) {
        return [{
            field: 'email',
            message: 'Insira um email válido'
        }]
    }
    return undefined
}

export const validateName = (name: string): [{field: string, message: string}] | undefined => {
    if(!name) {
        return [{
            field: 'nome',
            message: 'É necessário inserir um nome'
        }]
    }
    if(name.length < 5) {
        return [{
            field: 'nome',
            message: 'Por favor, insira seu nome completo'
        }]
    }
    return undefined
}

export const validateSenha = (senha: string): [{field: string, message: string}] | undefined => {
    if(!senha) {
        return [{
            field: 'senha',
            message: 'É necessário inserir uma senha'
        }]
    }
    if(senha.length < 5) {
        return [{
            field: 'senha',
            message: 'A senha precisa ter pelo menos 6 caracteres'
        }]
    }
    return undefined
}

export const validateCpf = (cpf: string): [{field: string, message: string}] | undefined => {
    if(cpf.length !== 11) {
        return [{
            field: 'cpf',
            message: 'Verifique se o cpf foi digitado corretamente'
        }]
    }
    if(cpf === '11111111111' || cpf === '22222222222' || cpf === '33333333333' || cpf === '44444444444' || cpf === '55555555555' || cpf === '66666666666' || cpf === '77777777777' || cpf === '88888888888' || cpf === '99999999999' || cpf === '00000000000') {
        return [{
            field: 'cpf',
            message: 'CPF inválido'
        }]
    }
    let soma: number = 0
    // i * j durante todo o loop:
    // (0 * 10) (1 * 9) (2 * 8) (3 * 7) (4 * 6) (5 * 5) (6 * 4) (7 * 3) (8 * 2) 9 10
    for(let i: number = 0; i <= 8; i++) {
        soma = soma + (parseInt(cpf.charAt(i)) * (10 - i))
    }
    const mod = (soma * 10) % 11
    if(mod !== parseInt(cpf.charAt(9))) {
        if(mod !== 10 || (mod === 10 && parseInt(cpf.charAt(9)) !== 0) ) {
            return [{
                field: 'cpf',
                message: 'cpf inválido'
            }]
        }
    }
    return undefined
}

export const validateTelefone = (telefone: string): [{field: string, message: string}] | undefined => {
    if(!telefone) {
        return [{
            field: 'telefone',
            message: 'é necessário digitar um número de celular'
        }]
    }
    if(!telefone.match(/^[0-9]+$/)) {
        return [{
            field: 'telefone',
            message: 'Por favor, insira apenas números'
        }]
    }
    if(telefone.replace(/\s/g,'').length < 11) {
        return [{
            field: 'telefone',
            message: 'É necessário inserir o DDD na frente do número'
        }]
    }
    if(telefone.replace(/\s/g,'').length > 11) {
        return [{
            field: 'telefone',
            message: 'Não é necessário inserir o código do país, apenas o DDD e o número'
        }]
    }
    return undefined
}

export const validateEndereco = (cep: string, rua: string, numero: string): [{field: string, message: string}] | undefined => {
    // VALIDAÇÃO DO CEP
    if(!cep) {
        return [{
            field: 'cep',
            message: 'Por favor, insira um CEP'
        }]
    }
    if(!cep.match(/^[0-9]+$/)) {
        return [{
            field: 'cep',
            message: 'Por favor, insira um CEP válido'
        }]
    }
    if(cep.length !== 8) {
        return [{
            field: 'cep',
            message: 'Por favor, verifique se o CEP foi digitado corretamente'
        }]
    }

    // VALIDAÇÃO DA RUA
    if(!rua) {
        return [{
            field: 'rua',
            message: 'Por favor, insira o nome da sua rua'
        }]
    }
    
    // VALIDAÇÃO NUMERO
    if(!numero) {
        return [{
            field: 'numero',
            message: 'Por favor, insira o número de sua casa ou condomínio'
        }]
    }
    if(!numero.match(/^[0-9]+$/)) {
        return [{
            field: 'numero',
            message: 'Por favor, verifique se o número foi digitado corretamente'
        }]
    }
    return undefined
}