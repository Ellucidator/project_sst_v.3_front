import { cookieService } from '@/services/cookieService'
import styles from './page.module.scss'

export default async function Cart() {
    const test = cookieService.getItemsCart()
    return (
        <div>
            <h1>Cart</h1>
        </div>
    )
}