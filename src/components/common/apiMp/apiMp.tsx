'use client'
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react"

type Props = {
    id: string
}
const ApiMp = ({id}:Props) => {
    initMercadoPago('APP_USR-d394f58b-0f2f-41e3-a070-407876d0405c')
    return(
        <Wallet 
            initialization={{ preferenceId: id,redirectMode: 'modal'}}
            locale="pt-BR"
            customization={{ texts:{ valueProp: 'payment_methods_logos',action: 'pay', actionComplement: 'brand'}}} />
    )
}

export default ApiMp