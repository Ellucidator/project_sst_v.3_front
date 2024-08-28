import styles from "./page.module.scss"
import { cartServices } from "@/services/cartService"
import { redirect } from "next/navigation"
import { MercadoPagoConfig, Preference } from 'mercadopago';
import ApiMp from '@/components/apiMp/apiMp'
import Title from "@/components/common/texts/tiltle";
import ItemsTable from "@/components/common/itemsTable";
import { userService } from "@/services/userService";


export default async function Payment() {
    const preferenceId = await userService.createPurchase()
    
    const [items, total, frete] = await cartServices.getItemsCart()
    if (!items || items.length === 0) redirect('/')


    return (
        <>
            <div className={styles.pageBody}>
                <Title fontSize="25px" model='model5' titleText="Finalizar pedido" />
                <div className={styles.divPayment}>
                    <ItemsTable items={items || []} type='Common' model='model2' 
                        total={total} frete={frete.price} />

                    <ApiMp id={preferenceId!.preference_id} public_key={process.env.PUBLIC_KEY_MP!} />
                </div>
            </div>
        </>
    )
}
