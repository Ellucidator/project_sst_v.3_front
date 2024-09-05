export interface Avaliation{
    rating: number | string
    title: string
    comment: string
    created_at?: Date
}

export interface CreateAvaliation extends Avaliation{
    item_id: number | string
}

export interface AvaliationAndCount{
    count: number
    rows: Avaliation[]
}