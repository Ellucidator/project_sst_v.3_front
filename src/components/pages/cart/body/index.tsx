import { ItemCharacteristics, ItemPromotion } from '@/types/itemsTypes'
import styles from './styles.module.scss'
import CartTable from './cartTable'
import CepCalculator from '@/components/common/cepCalculator'
import Title from '@/components/common/tiltle'
import Button from '@/components/common/button'
import { cookieService } from '@/services/cookieService'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

type Props = {
    items: ItemPromotion[] | null
}
interface resumo {
    sub_total: number
    total: number
}
const CartBody = ({ items }: Props) => {



    const resumo = items ? items.reduce((acc: resumo, item) => {
        acc.sub_total += (item.price * item.ItemCharacteristic!.quantity!)
        acc.total += (item.promotion ? item.ItemPromotion.price * item.ItemCharacteristic!.quantity! : item.price * item.ItemCharacteristic!.quantity!)
        return acc
    }, {
        sub_total: 0,
        total: 0
    }) : { sub_total: 0, total: 0 }

    const itemsCharacteristics: ItemCharacteristics[] = items ? items!.map((item) => {
        return item.ItemCharacteristic!
    }) : []

    const handlerSubmit = async (form: FormData) => {
        'use server'

        const verify = await cookieService.verifySession()
            return redirect('/login')
        }
        
        return redirect('/checkout')
    }

    return (
        <>
            <div className={`container ${styles.cartBody}`}>
                <Title fontSize="25px" titleText="MEU CARRINHO" />
                <div className={styles.cartInfo}>
                    <CartTable items={items} />
                    <form className={styles.cartTotal}>
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
                        <Button btnName='FINALIZAR COMPRA' btnModel='model5' btnAction='submit'
                            iconElem={{ src: '/public/common/bag-check.svg', position: 'left', width: 35 }}
                            btnOption={{ style: { padding: '10px 20px', fontSize: '22px' } }} />
                    </form>
                    
                </div>
                <div className={styles.cartFrete}>
                    <CepCalculator itemsCharacteristics={itemsCharacteristics} />
                </div>
            </div>
        </>
    )
}

export default CartBody