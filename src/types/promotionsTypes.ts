import { Item } from "./itemsTypes"

export interface Promotion{
    id: number
    name: string
    description?: string
    thumbnail_url: string
}

export interface PromotionWithItems extends Promotion{
    items: Item[]
}