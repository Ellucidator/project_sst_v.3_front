import { cookieService } from '@/services/cookieService'
import styles from './page.module.scss'
import CartBody from '@/components/pages/cart/body'

export default async function Cart() {
    const cartItems = await cookieService.getItemsCart()
    
    return (
        <div className={styles.pageCart}>
            <CartBody items={cartItems}/>
        </div>
    )
}