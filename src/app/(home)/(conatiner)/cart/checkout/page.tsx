import Title from '@/components/common/texts/tiltle'
import styles from './page.module.scss'
import { userService } from '@/services/userService'
import { CardAddress } from '@/components/common/cards/cardAddress'
import { UserAddress } from '@/types/userTypes'
import ServerModal from '@/components/common/serverActionComponent/modal'
import { cartServices } from '@/services/cartService'
import ItemsTable from '@/components/common/itemsTable'
import { MercadoPagoConfig, Preference } from 'mercadopago';
import ApiMp from '@/components/common/apiMp/apiMp'
import ButtonReturn from '@/components/common/clientOnlyComponents/btnReturn'


export default async function CheckoutPage() {
    const client = new MercadoPagoConfig({ accessToken: 'APP_USR-1682299063331004-070414-57654f1818c2c7881d67bf58f7a58e8d-156112622' });
    const preference = new Preference(client);

    const [items, total] = await cartServices.getItemsCart()

    const res = await preference.create({
        body: {
            items: items.map((item) => {
                return {
                    id: `${item.id}`,
                    title: item.name,
                    quantity: item.ItemCharacteristic!.quantity!,
                    unit_price: item.promotion? item.ItemPromotion!.price: item.price,
                }
            })
        }
    })

    const adresses = await userService.getUserAdresses()
    let addressActiv: UserAddress | undefined

    if (adresses) addressActiv = adresses.find((address) => address.active === true)


    return (
        <div className={styles.pageBody}>
            <Title fontSize="25px" model='model5' titleText="Finalizar pedido" />
            <div className={styles.addressAndPayment}>
                <div className={styles.divAddress}>
                    <ServerModal cookieName="modalAddress"
                        adresses={adresses || []} />
                    {addressActiv ? <CardAddress address={addressActiv} /> : <></>}
                </div>
                <div className={styles.divPayment}>
                    <ItemsTable items={items || []} type='Common' model='model2' total={total} />

                    <ApiMp id={res.id!} />
                </div>
            </div>
        </div>
    )
}