
export interface SubCategories{
    id: number
    name: string
}
export interface Categories{
    id: number
    name: string
    SubCategories: SubCategories[]
}

