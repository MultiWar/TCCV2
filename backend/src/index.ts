import 'dotenv/config'
import { createConnection } from "typeorm"
import 'reflect-metadata'
import express from 'express'
import {ApolloServer} from 'apollo-server-express'
import {buildSchema} from 'type-graphql'
import { userResolver } from "./resolvers/userResolver"
import cookieParser from 'cookie-parser'
import { verify } from 'jsonwebtoken'
import { REFRESH_TOKEN_SECRET } from './consts'
import { createAccessToken, refreshAccessToken } from './utils/auth'
import { SendRefreshToken } from './utils/sedRefreshToken'
import { tblAgenda as Agenda } from './entitites/Agenda'
import { tblDetalhePedido as DetalhesPedido } from './entitites/DetalhesPedido'
import { tblEstoque as Estoque } from './entitites/Estoque'
import { tblFornecedor as Fornecedor } from './entitites/Fornecedor'
import { tblFuncionario as Funcionario } from './entitites/Funcionario'
import { tblPedido as Pedido } from './entitites/Pedido'
import { tblProduto as Produto } from './entitites/Produto'
import { tblProgEntrega as ProgEntrega } from './entitites/ProgEntrega'
import { tblUnidade as Unidade } from './entitites/Unidade'
import { tblUser as User } from "./entitites/User"
import { produtoResolver } from './resolvers/produtoResolver'
import cors from 'cors'

const main = async () => {
    await createConnection({
        type: 'mssql',
        port: 1433,
        host: 'localhost',
        database: 'MedicareDev',
        username: 'sa',
        password: 'etesp',
        entities: [Agenda, DetalhesPedido, Estoque, Fornecedor, Funcionario, Pedido, Produto, ProgEntrega, Unidade, User],
        logging: true,
        synchronize: true
    })

    // sendEmail('asdas@sdasd.aca', 'teste')

    const app = express()
    app.use(cors({
        origin: 'http://localhost:3000',
        credentials: true
    }))
    app.use(cookieParser())
    app.post('/refresh-token', async (req, res) => {
        const token = req.cookies.jid
        if(!token) {
            return res.send({ok: false, acessToken: ''})
        }
        let payload = null
        try {
            payload = verify(token, REFRESH_TOKEN_SECRET) as any
        } catch(err) {
            console.log(err)
            return res.send({ok: false, accessToken: ''})
        }
        const user = await User.findOne({idUser: payload.userId})
        if(!user) {
            return res.send({ok: false, acessToken: ''})
        }
        SendRefreshToken(res, refreshAccessToken(user))
        return res.send({ok: true, accessToken: createAccessToken(user)})
    })

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [userResolver, produtoResolver],
            validate: false
        }),
        context: ({req, res}) => ({req, res})
    })

    apolloServer.applyMiddleware({app, cors: false})

    app.listen(3333, () => {
        console.log('server started on http://localhost:3333')
    })
}

main().catch(err => {
    console.log(err)
})