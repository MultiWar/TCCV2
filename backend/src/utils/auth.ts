import { sign } from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, CHANGE_PASSWORD_SECRET, REFRESH_TOKEN_SECRET } from "../consts";
import { tblUser as User } from "../entitites/User";

export const createAccessToken = (user: User) => {
    return  sign({userId: user.idUser}, ACCESS_TOKEN_SECRET, {expiresIn: '7d'})
}

export const refreshAccessToken = (user: User) => {
    return sign({userId: user.idUser}, REFRESH_TOKEN_SECRET, {expiresIn: '60d'})
}

export const changePassword = (user: User) => {
    return sign({userId: user.idUser}, CHANGE_PASSWORD_SECRET, {expiresIn: '48h'})
}