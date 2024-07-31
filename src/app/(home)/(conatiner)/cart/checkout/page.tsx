import Title from '@/components/common/texts/tiltle'
import styles from './page.module.scss'
import { userService } from '@/services/userService'
import { CardAddress } from '@/components/common/cards/cardAddress'
import { UserAddress } from '@/types/userTypes'
import ServerModal from '@/components/common/serverActionComponent/modal'
import { cartServices } from '@/services/cartService'
import ItemsTable from '@/components/common/itemsTable'
import { redirect } from 'next/navigation'
import { cepCalculatorByCart } from '@/services/cepService'
import ResultCepCalculator from '@/components/common/cepCalculator/resultCepCalculator'
import Button from '@/components/common/button'
import { cookies } from 'next/headers'
import { Cart } from '@/types/itemsTypes'


export default async function CheckoutPage() {
    const adresses = await userService.getUserAdresses()
    let addressActiv: UserAddress | undefined
    if (adresses) addressActiv = adresses.find((address) => address.active === true)

    const cepResponse = await cepCalculatorByCart(`${addressActiv?.zip_code!}`)

    const [items, total] = await cartServices.getItemsCart()
    if (!items || items.length === 0) redirect('/')

const handlerSubmit = async (form: FormData) => {
    'use server'
    if(!addressActiv) return

    const frete = form.get('cep-result')?.toString()
    const [service, price] = frete!.split('-')
    if(!price) return

    const cartCookie = cookies().get('car')?.value

    const cart:Cart = JSON.parse(cartCookie!)

    cart.frete = {
        address_id: addressActiv.id!,
        name: service,
        price: parseFloat(price)
    }
    cookies().set('car', JSON.stringify(cart))

    redirect('/cart/payment')
}

    return (
        <form action={handlerSubmit} className={styles.pageBody}>
            <Title fontSize="25px" model='model5' titleText="Checar pedido" />
            <div className={styles.addressAndPayment}>
                <div className={styles.divAddressAndFrete}>
                    <div className={styles.divAddress}>
                        <ServerModal cookieName="modalAddress"
                            adresses={adresses || []} />
                        {addressActiv ? <CardAddress address={addressActiv} /> : <></>}
                    </div>
                    <div className={styles.divFrete}>
                        <Title fontSize="25px" model='model5' width='100%' titleText="Metodo de envio:" />
                        <ResultCepCalculator type='form' resultCepCalc={cepResponse} />
                    </div>
                </div>
                <div className={styles.divPayment}>

                    <ItemsTable items={items || []} type='Common' model='model2' total={total}  />
                    <Button btnName='Prosseguir para pagamento' btnAction='submit' btnWidth='fit-content'
                            btnModel='model2' btnOption={{style:{fontSize:'x-large'}}}
                            iconElem={{src:'/public/common/cash-stack.svg',width:30,position:'right'}}

                    />
                </div>
            </div>
        </form>
    )
}