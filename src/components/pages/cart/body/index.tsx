import { Item, ItemPromotion } from '@/types/itemsTypes'
import styles from './styles.module.scss'
import PriceItem from '@/components/common/priceItem'
import Image from 'next/image'
import CartTable from './cartTable'
import CepCalculator from '@/components/common/cepCalculator'

type Props = {
    items: ItemPromotion[] | null
}
interface resumo {
    sub_total: number
    total: number
}
const CartBody = ({ items }: Props) => {

    const resumo = items ? items.reduce((acc: resumo, item) => {
        acc.sub_total += (item.price * item.quantity!)
        acc.total += (item.promotion ? item.ItemPromotion.price * item.quantity! : item.price * item.quantity!)
        return acc
    }, {
        sub_total: 0,
        total: 0
    }) : { sub_total: 0, total: 0 }



    return (
        <>
            <div className={`container ${styles.cartBody}`}>
                <p className={styles.cartTitle}>MEU CARRINHO</p>
                <div className={styles.cartInfo}>
                    <CartTable items={items} />
                    <div className={styles.cartTotal}>
                        <div className={styles.resumo}>
                            <p className={styles.resumoTitle}>RESUMO</p>
                            <div className={styles.resumoItems}>
                                <p>Subtotal</p>
                                <p>{resumo.sub_total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                            </div>
                            <div className={styles.resumoItemsTotal}>
                                <p >Total</p>
                                <p>{resumo.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                            </div>
                        </div>
                        <button type='submit' className={styles.btnBuy} >
                            <Image src="/public/common/bag-check.svg" alt="catalog" className={styles.icon} width={35} height={35} />
                            <p className={styles.subTitle}>FINALIZAR COMPRAS</p>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartBody