import { Response } from "express";

export const SendRefreshToken = (res: Response, token: string) => {
    res.cookie('jid', token, {
        httpOnly: true,
        sameSite: 'lax',
        expires: new Date(Date.now() + 5184000000)
    })
}