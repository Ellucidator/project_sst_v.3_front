import { TagValue } from "./tagTypes";

export interface ItemToCar{
    id:number
    price:number
    ItemCharacteristics: ItemCharacteristics
}
export interface Cart{
    purchase_id?:string
    items:ItemToCar[]
    frete?:{
        address_id:string|number
        name:string
        price:number,
        range:string
    }
    total:number
}

export interface ItemCharacteristics{
    id: number
    width: number
    height: number
    length: number
    weight: number
    insurance_value: number
    quantity: number 
}

export interface Item {
    id: number;
    name: string;
    description?: string;
    price: number;
    in_stock: number;
    featured?: boolean;
    promotion: boolean;
    thumbnail_url: string;
    sub_category_id?: number;
    quantity?:number;
    ItemCharacteristic?: ItemCharacteristics
}

export interface ItemPromotionAtributes{
    price:number
}

export interface ItemPromotion extends Item {
    ItemPromotion?:ItemPromotionAtributes;
}

export interface ItemFull extends ItemPromotion {
    bucket?: string;
    mime?: string;
    size?: number;
    images?: {
        key:string[],
        mime?:string[],
        size?:string[],
        bucket?:string[]
    };
    TagValues?: TagValue[]
}