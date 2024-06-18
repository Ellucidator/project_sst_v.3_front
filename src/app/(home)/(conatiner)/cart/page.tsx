import Title from '@/components/common/texts/tiltle';
import styles from './page.module.scss'
import { cookieService } from '@/services/cookieService'
import { ItemCharacteristics } from '@/types/itemsTypes'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Button from '@/components/common/button'
import CepCalculator from '@/components/common/cepCalculator'
import CartTable from '@/components/pages/cart/cartTable'

interface Resumo {
    sub_total: number
    total: number
}

export default async function Cart() {
    const items = await cookieService.getItemsCart()

    const resumo = items ? items.reduce((acc: Resumo, item) => {
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

        if (!verify) {
            cookies().set('redirect', '/cart', {
                maxAge: 60 * 60
            })

            redirect('/form/login')
        }

        redirect('/cart/checkout')
    }

    return (
        <>
            <div className={`container ${styles.cartBody}`}>
                <Title model='model1' fontSize="25px" titleText="MEU CARRINHO" />
                <div className={styles.cartInfo}>
                    <CartTable items={items} />
                    <form action={handlerSubmit} className={styles.cartTotal}>
                        <div className={styles.resumo}>
                            <Title model='model3' fontSize='22px' titleText='RESUMO DO PEDIDO' />
                            <div className={styles.resumoItems}>
                                <Title model='simple' titleText='Subtotal' />
                                <Title model='simple' 
                                    titleText={resumo.sub_total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} />
                            </div>
                            <div className={styles.resumoItemsTotal}>
                                <Title model='simple' fontSize='28px' titleText='Total' />
                                <Title model='simple' fontSize='28px' 
                                    titleText={resumo.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} />
                            </div>
                        </div>
                        <Button btnName='FINALIZAR COMPRA' btnModel='model5' btnAction='submit'
                            iconElem={{ src: '/public/common/bag-check.svg', position: 'left', width: 35 }}
                            btnOption={{ style: { padding: '10px 20px', fontSize: '22px' } }} />
                    </form>

                </div>
                <div className={styles.cartFrete}>
                    <CepCalculator type='multi' itemsCharacteristics={itemsCharacteristics} />
                </div>
            </div>
        </>
    )
}