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
    frete: string
    payment_type: string
    payment_status: string
    ItemSells: ItemSell[]
    Address:UserAddress
    createdAt: string
    updatedAt: string
}

export interface Purchases{
    count: number
    rows: Purchase[]
}