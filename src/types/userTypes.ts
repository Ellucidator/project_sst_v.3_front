import { JWTPayload } from "jose"

export interface User{
    id: number
    name: string
    email: string|null
    imgUrl: string
};

export interface UserPayload extends JWTPayload,User{}