export interface ItemSell{
    quantity: number
    price: number
    Item:{name: string,thumbnail_url: string}
}

export interface Purchase{
    id: number
    all_value: number
    createdAt: string
    upstringdAt: string
    ItemSells: ItemSell[]
}