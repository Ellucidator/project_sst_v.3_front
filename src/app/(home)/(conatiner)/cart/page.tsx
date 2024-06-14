import { cookieService } from '@/services/cookieService'
import CartBody from '@/components/pages/cart/body'

export default async function Cart() {
    const cartItems = await cookieService.getItemsCart()
    
    return (
            <CartBody items={cartItems}/>
    )
}