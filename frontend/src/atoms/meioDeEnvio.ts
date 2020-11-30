import { atom } from "recoil";

interface meioDeEnvioEscolhido {
    servico: string,
    preco: number,
    prazo: string
}


export const meioDeEnvio = atom<meioDeEnvioEscolhido | undefined>({
    key: 'meioDeEnvioEscolhido',
    default: undefined
})