import Title from '@/components/common/texts/tiltle'
import styles from './page.module.scss'
import { userService } from '@/services/userService'
import { CardAddress } from '@/components/common/cards/cardAddress'
import { UserAddress } from '@/types/userTypes'
import ServerModal from '@/components/common/serverActionComponent/modal'


export default async function CheckoutPage() {

    const adresses = await userService.getUserAdresses()
    let addressActiv: UserAddress | undefined

    if(adresses) addressActiv = adresses.find((address) => address.active === true)


    return(
        <div className={styles.pageBody}>
            <Title fontSize="25px" model='model5' titleText="Finalizar pedido" />
            <div className={styles.addressAndPayment}>
                <div className={styles.divAddress}>
                    <ServerModal cookieName="modalAddress" 
                        adresses={adresses||[]}/>
                    {addressActiv?<CardAddress address={addressActiv} />:<></>}
                </div>
                <div className={styles.divPayment}></div>
            </div>
        </div>
    )
}