export interface TagValue{
    id: number
    name: string
}

export interface Tag {
    id: number
    name: string
    TagValues?: TagValue[]
}