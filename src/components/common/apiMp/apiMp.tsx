'use client'
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react"

type Props = {
    id: string
}
const ApiMp = ({id}:Props) => {
    initMercadoPago(process.env.PUBLIC_KEY_MP || '')

    return(
        <Wallet 
            initialization={{ preferenceId: id,redirectMode: 'modal'}}
            locale="pt-BR"
            customization={{ texts:{ valueProp: 'payment_methods_logos',action: 'pay', actionComplement: 'brand'}}} />
    )
}

export default ApiMp