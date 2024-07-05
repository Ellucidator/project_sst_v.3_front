'use client'
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react"

type Props = {
    id: string
}
const ApiMp = ({id}:Props) => {
    initMercadoPago('APP_USR-f5c11a33-799e-4429-b66b-23920954cd39')
    return(
        <Wallet 
            initialization={{ preferenceId: id,redirectMode: 'self'}}
            locale="pt-BR"
            customization={{ texts:{ valueProp: 'payment_methods_logos',action: 'pay', actionComplement: 'brand'}}} />
    )
}

export default ApiMp