import { ItemPromotion } from "./itemsTypes"

export interface Promotion{
    id: number
    name: string
    description?: string
    thumbnail_url: string
}

export interface PromotionWithItems extends Promotion{
    Items: ItemPromotion[]
    countItems?: number
}