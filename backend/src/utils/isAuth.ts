import { verify } from "jsonwebtoken";
import { MiddlewareFn } from "type-graphql";
import { ACCESS_TOKEN_SECRET } from "../consts";
// import { tblUser as User } from "./entitites/User";
import { MyContext } from "../MyContext";

export const isAuth: MiddlewareFn<MyContext> = ({context}, next) => {
    const authorization = context.req.headers['authorization']
    if(!authorization) {
        throw new Error('not authorized')
    }

    const bearer = authorization.split(' ')[0]
    const token = authorization.split(' ')[1]

    if(bearer !== 'bearer') {
        throw new Error('not authorized')
    }
    if(!token) {
        throw new Error('not authorized')
    }
    let payload
    try {
        payload = verify(token, ACCESS_TOKEN_SECRET) as any
    } catch(err) {
        if(err.message === 'jwt expired') {
            console.log('yay')
        }
        throw new Error(err)
    }
    context.payload = payload as any
    console.log('payload: ', payload.userId)
    return next()

}