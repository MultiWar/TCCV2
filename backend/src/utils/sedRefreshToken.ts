import { Response } from "express";
import { tblUser } from "../entitites/User";
import { refreshAccessToken } from "./auth";

export const SendRefreshToken = (res: Response, user: tblUser) => {
    const token = refreshAccessToken(user)
    res.cookie('jid', token, {
        httpOnly: true,
        sameSite: 'lax'
    })
}