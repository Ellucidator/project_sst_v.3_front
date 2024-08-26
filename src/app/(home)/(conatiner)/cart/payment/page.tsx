import styles from "./page.module.scss"
import { cartServices } from "@/services/cartService"
import { redirect } from "next/navigation"
import { MercadoPagoConfig, Preference } from 'mercadopago';
import ApiMp from '@/components/common/apiMp/apiMp'
import Title from "@/components/common/texts/tiltle";
import ItemsTable from "@/components/common/itemsTable";


export default async function Payment() {
    const client = new MercadoPagoConfig({ accessToken: process.env.ACCESS_TOKEN_MP! });
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
                success: process.env.LOCAL_HOST + `/api/checkoutOk?address_id=${frete.address_id}`,
                pending: process.env.LOCAL_HOST + `/api/checkoutOk?address_id=${frete.address_id}`,
            },
            auto_return: 'approved'
        }
    })

    return (
        <>
            <div className={styles.pageBody}>
                <Title fontSize="25px" model='model5' titleText="Finalizar pedido" />
                <div className={styles.divPayment}>
                    <ItemsTable items={items || []} type='Common' model='model2' 
                        total={total} frete={frete.price} />

                    <ApiMp id={res.id!} public_key={process.env.PUBLIC_KEY_MP!} />
                </div>
            </div>
        </>
    )
}
