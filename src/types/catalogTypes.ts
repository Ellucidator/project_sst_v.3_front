import { Item } from "./itemsTypes"

export interface SubCategories{
    id: number
    name: string
    Items?: Item[]
}
export interface Categories{
    id: number
    name: string
    SubCategories: SubCategories[]
}

