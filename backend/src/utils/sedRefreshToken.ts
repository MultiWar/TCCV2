import { Response } from "express";

export const SendRefreshToken = (res: Response, token: string) => {
    res.cookie('jid', token, {
        httpOnly: true
    })
}