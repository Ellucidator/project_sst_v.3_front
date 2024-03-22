import { Item } from "./itemsTypes"

export interface SubCategories{
    id: number
    name: string
    items?: Item[]
}
export interface Categories{
    id: number
    name: string
    SubCategories: SubCategories[]
}

