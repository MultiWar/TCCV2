import { atom } from "recoil";

export const subtotal = atom<number>({
    key: 'subtotal',
    default: 0
})