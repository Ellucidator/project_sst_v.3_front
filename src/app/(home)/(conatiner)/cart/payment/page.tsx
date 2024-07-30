import { cartServices } from "@/services/cartService"
import { redirect } from "next/navigation"
import { MercadoPagoConfig, Preference } from 'mercadopago';
import ApiMp from '@/components/common/apiMp/apiMp'


export default async function Payment() {
    const client = new MercadoPagoConfig({ accessToken: 'APP_USR-658438204342310-070510-884ee4cac7fc572dc65f9a5c11bee043-1888685170' });
    const preference = new Preference(client);

    const [items, total, frete] = await cartServices.getItemsCart()
    if (!items || items.length === 0) redirect('/')

    let itemsPreference = items.map((item) => {
        return {
            id: `${item.id}`,
            title: item.name,
            quantity: item.ItemCharacteristic!.quantity!,
            unit_price: item.promotion ? item.ItemPromotion!.price : item.price,
        }
    })
    itemsPreference.push({
        id: frete.address_id,
        title: frete.name,
        quantity: 1,
        unit_price: frete.price
    })

    const res = await preference.create({
        body: {
            items: itemsPreference,
            back_urls: {
                success: `http://localhost:3001/api/checkoutOk?address_id=${frete.address_id}`,
                pending: `http://localhost:3001/api/checkoutOk?address_id=${frete.address_id}`,
            },
            auto_return: 'approved'
        }
    })
    return (
        <>
            <ApiMp id={res.id!} />
        </>
    )
}
