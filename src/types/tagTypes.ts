export interface TagValue{
    id: number
    name: string
    Tag?: Tag
}

export interface Tag {
    id: number
    name: string
    TagValues?: TagValue[]
}