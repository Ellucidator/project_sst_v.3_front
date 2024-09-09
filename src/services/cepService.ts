import { helpers } from "@/helpers/helpers"
import { Cart, ItemCharacteristics } from "@/types/itemsTypes"

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

            'Authorization': process.env.MV_TOKEN || '',

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
            revalidate: 0
        },
        cache: 'no-cache'
    })
    if(res.status === 422)return [{name:'Product',error:'Frete Indisponivel',company:{name:'Error',picture:false}} ]

    const data = await res.json()

    return data
    
}

export async function cepCalculatorByCart(cep:string) {
    const cartCookies:Cart = helpers.getCookieValue('car')
    if(!cartCookies) return []

    const itemsCharacteristics:ItemCharacteristics[] = cartCookies.items.map((item)=>{
        return item.ItemCharacteristics
    })

    return await cepCalculator(cep,itemsCharacteristics)
}






