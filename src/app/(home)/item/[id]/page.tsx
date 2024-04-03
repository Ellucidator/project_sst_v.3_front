import { catalogService } from '@/services/catalogService'
import styles from './page.module.scss'
import Image from 'next/image'
import SlideSectionItem from '@/components/common/slideSectionItem'
import PriceItem from '@/components/common/priceItem'
import { cookieService } from '@/services/cookieService'
import { cepService } from '@/services/cepService'

export default async function Item({ params }: { params: { id: string } }) {
    const item = await catalogService.getOneItem(params.id)

    const quantity = Array.from({ length: item.in_stock }, (_, i) => i + 1)

    const formAction = async (form: FormData) => {
        'use server'
        const buyQuantity = parseInt(form.get('quantity')!.toString())

        await cookieService.addCarItem({
            id: item.id,
            quantity: buyQuantity
        })
    }

    const formActionCep = async (form: FormData) => {
        'use server'
        await cepService.cepCalculator('')
    }


    return (
        <div className={styles.pageItem}>
            <div className={`container ${styles.itemContainer}`}>
                <p className={styles.titleItem}>{item.name}</p>
                <div className={styles.cardItem}>

                    <SlideSectionItem allItems={item} />

                    <div className={styles.itemBuy}>
                        {item.in_stock > 0 ? (
                            <p className={styles.itemStockT}>Produto Disponivel</p>
                        ) : (
                            <p className={styles.itemStockF}>Produto Indisponivel</p>
                        )}
                        <PriceItem item={item} />
                        <form action={formAction} method='POST'>
                            <div className={styles.divQuant}>
                                <p>Quantidade</p>
                                <select name="quantity" disabled={item.in_stock > 0 ? false : true} id="quantity" className={styles.selectQuant}>
                                    {
                                        quantity.map((num) => {
                                            return (
                                                <option value={num}>
                                                    {num}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>

                            <button type='submit' className={styles.btnBuy} >
                                <div className={styles.btnTexts}>
                                    <p className={styles.title}>Comprar</p>

                                    <p className={styles.subTitle}>Adicionar ao carrinho</p>
                                </div>
                                <Image src="/public/common/cart-plus.svg" alt="catalog" className={styles.icon} width={35} height={35} />

                            </button>

                        </form>
                    </div>
                </div>
                <div className={styles.cep} >
                    <form action={formActionCep}>
                        <button type="submit">teste</button>
                    </form>
                </div>
                <div className={styles.itemDescription}></div>
                <div className={styles.avaliations} ></div>
            </div>
        </div>
    )
}