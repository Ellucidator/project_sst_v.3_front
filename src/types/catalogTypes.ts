import { Item } from "./itemsTypes"

export interface SubCategories{
    id: number
    name: string
    Items?: Item[]
    countItems?: number
}
export interface Categories{
    id: number
    name: string
    SubCategories: SubCategories[]
}

