'use client'
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react"

type Props = {
    id: string,
    public_key: string
}
const ApiMp = ({ id, public_key }: Props) => {
    initMercadoPago(public_key)

    return (
        <Wallet
            initialization={{preferenceId: id}}
            locale="pt-BR"
            customization={{ texts: { valueProp: 'payment_methods_logos', action: 'pay', actionComplement: 'brand' } }}
        />
    )
}

export default ApiMp