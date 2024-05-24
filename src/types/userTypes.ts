import { JWTPayload } from "jose"
import { Item } from "./itemsTypes"

export interface User{
    id: number
    first_name: string
    last_name: string
    email: string
};
export interface UserInfo extends User {
    imgUrl: string
}

export interface CreateUser extends Omit<User, 'id'>{
    password: string
    phone: string
    birth: string
}

export interface UserPayload extends JWTPayload,User{}

export interface UserAddress{
    id?: number
    receiver_name: string
    zip_code: number
    state: string
    city: string
    neighborhood: string
    street: string
    house_number: string
    complement?: string
    phone_number: string
    reference_point?: string
    active: boolean
}

export interface UserFavorite{
    Item:Item
}