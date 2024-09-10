export interface Avaliation{
    user_id?: number
    rating: number | string
    title: string
    comment: string
}

export interface CreateAvaliation extends Avaliation{
    item_id: number | string
}

export interface AvaliationAndCount{
    count: number
    rows: Avaliation[]
}