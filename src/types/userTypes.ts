import { JWTPayload } from "jose"

export interface User{
    id: number
    first_name: string
    email: string
};
export interface UserInfo extends User {
    imgUrl: string
}

export interface CreateUser extends Omit<User, 'id'>{
    last_name: string
    password: string
    phone: string
    birth: string
}

export interface UserPayload extends JWTPayload,User{}