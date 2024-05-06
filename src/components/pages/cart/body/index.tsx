import { Item, ItemPromotion } from '@/types/itemsTypes'
import styles from './styles.module.scss'
import PriceItem from '@/components/common/priceItem'
import Image from 'next/image'
import CartTable from './cartTable'

type Props = {
    items: ItemPromotion[]
}
interface resumo{
    sub_total:number
    total:number
}
const CartBody = ({ items }: Props) => {

    const resumo = items.reduce((acc:resumo, item) => {
        acc.sub_total += (item.price * item.quantity!)
        acc.total += (item.promotion ? item.ItemPromotion.price * item.quantity! : item.price * item.quantity!)
        return acc
    }, {
        sub_total:0,
        total:0
    })

    

    return (
        <>
            <div className={`container ${styles.cartBody}`}>
                {/* <p className={styles.cartTitle}>MEU CARRINHO</p> */}
                <CartTable items={items} />
                <div className={styles.cartTotal}>
                    <div className={styles.resumo}>
                        <p className={styles.resumoTitle}>RESUMO</p>
                        <div className={styles.resumoItems}>
                            <p>Subtotal</p>
                            <p>{resumo.sub_total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                        </div>
                        <div className={styles.resumoItems}>
                            <p>Total</p>
                            <p>{resumo.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                        </div>
                    </div>
                    <button>FINALIZAR COMPRA</button>
                </div>
            </div>
        </>
    )
}

export default CartBody