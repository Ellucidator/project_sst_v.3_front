import { UserAddress } from "./userTypes"

export interface ItemSell{
    quantity: number
    price: number
    Item:{name: string,thumbnail_url: string}
}

export interface Purchase{
    id: number
    all_value: number
    status: string
    createdAt: string
    updatedAt: string
    ItemSells: ItemSell[]
    Address:UserAddress
}

export interface Purchases{
    count: number
    rows: Purchase[]
}