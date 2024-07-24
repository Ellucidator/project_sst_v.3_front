import { Cart, ItemCharacteristics } from "@/types/itemsTypes"
import { cookies } from "next/headers"



export async function cepCalculator(cep:string,itemCharacteristics:ItemCharacteristics[]) {
    const verify = itemCharacteristics.every((item)=>{
        return (item.height>0 && 
                item.insurance_value>0&& 
                item.length>0&& 
                item.weight>0&& 
                item.width>0
            )
    })
    if(!verify)return [{name:'Product',error:'Frete Indisponivel',company:{name:'Error',picture:false}} ]   

    const res = await fetch('https://www.melhorenvio.com.br/api/v2/me/shipment/calculate',{
        headers:{
            'Content-Type': 'application/json',

            'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMTMzYzE3M2U4MjRlMTdmMDZkYWQwNzg4YTcyN2MzZTI5YmI5YTJiZWE4MDU5MTM2MjEwMzc1YTg3MWIyYWI4MGFkYzIxOGVlMDc4ODIwMmMiLCJpYXQiOjE3MTIxODMxNzkuMjEzMjUzLCJuYmYiOjE3MTIxODMxNzkuMjEzMjU0LCJleHAiOjE3NDM3MTkxNzkuMTkxMDU5LCJzdWIiOiI5YmI4YzQ4OS1lYjdlLTQyMGMtYjk3ZC05ZjZkZGYxMzY4YTkiLCJzY29wZXMiOlsic2hpcHBpbmctY2FsY3VsYXRlIl19.R3z5FmzZvQmqHB0O69W-sa4bC3CaPcKJUaAW8KD92osrwDdXuiKNeFgNan15bcJrpQNnrk-RCXhB5E8UBl0LQQyBU7WzMhEXuOk87tU42Lf4BQdgI2q2atBmKLPFIqIaJvzP0Llui_yMVOd5AQR5wJv1ZQX8zDMrRy84ScgDtCo-0yp11I9ClqFp4l3Bmo4AX9Tz0npXACYWWu2LrSVvOLGji2YVlEi1HAmTLPgXkGxqVB22DihK0nCkRjXVu1VaV-wlbRPfz7SDKSEAC3GkKq18rVyq7tFQ61tjupNy5z6v02jXyKjvvjNKkziTBvOuiVkEzwvwiM-Cz170acdgJAHJnC6dfGRgrRaB6WPh8FbuDBlhtbOzeCgbKFtCCAo27kwD8X26IboVtBOomQvU-zgy08y8LlEZjblb-UJ7xvmytTDTmzrzb-_Ig9-H4jeepQ8fK1D81ToA2idd3FXVLQ2YmPFFuxjzWOQ-cLL3Vl4B1chUfB8C727Yykqcz-95tJbLZWaoatEwI_Y_aYzYvsREVUWKfX0mOvYNY5lczz-x91F626MZqABlXQUMngGQfaiVO9rQb3EzkxdHTCanKv6amMXGxk67WY6ZYeR09FD2KvG5MQcW_KF4-HaSoEZqFWooHoqsWQmWA25cKod2nhUF426_iUi2pH-G8WzuDEg`,

            'Accept': 'application/json',
            'User-Agent': 'Aplicação andradefj13@hotmail.com'
        },
        method: 'POST',
        body: JSON.stringify({
            "from": {
                "postal_code": "45470000"
            },
            "to": {
                "postal_code": cep
            },
            "products": itemCharacteristics,
            "options": {
                "receipt": false,
                "own_hand": false
            },
            "services": "1,2"
        }),
        next:{
            tags: ['cep-calculator-fetch'],
        },
        cache: 'no-cache'
    })
    if(res.status === 422)return [{name:'Product',error:'Frete Indisponivel',company:{name:'Error',picture:false}} ]

    const data = await res.json()

    return data
    
}

export async function cepCalculatorByCart(cep:string) {
    const cartCookies = cookies().get('car')?.value
    if(!cartCookies) return []

    const cart:Cart = JSON.parse(cartCookies)

    const itemsCharacteristics:ItemCharacteristics[] = cart.items.map((item)=>{
        return item.ItemCharacteristics
    })
    return await cepCalculator(cep,itemsCharacteristics)
}






