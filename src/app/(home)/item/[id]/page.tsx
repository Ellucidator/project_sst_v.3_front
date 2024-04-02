import { catalogService } from '@/services/catalogService'
import styles from './page.module.scss'
import Image from 'next/image'
import SlideSectionItem from '@/components/common/slideSectionItem'
import PriceItem from '@/components/common/priceItem'
import { cookieService } from '@/services/cookieService'

export default async function Item({ params }: { params: { id: string } }) {
    const item = await catalogService.getOneItem(params.id)

    const quantity = Array.from({ length: item.in_stock }, (_, i) => i + 1)

    const formAction = async (form:FormData)=>{
        'use server'
        const buyQuantity = form.get('quantity')!.toString()

        await cookieService.addCarItem(item)
    }

    return (
        <div className={styles.pageItem}>
            <div className={`container ${styles.itemContainer}`}>
                <p className={styles.titleItem}>{item.name}</p>
                <div className={styles.cardItem}>

                    <SlideSectionItem allItems={item} />

                    <div className={styles.itemBuy}>
                        <PriceItem item={item} />
                        <form action={formAction} method='POST'>
                            <div className={styles.divQuant}>
                                <p>Quantidade</p>
                                <select name="quantity" id="quantity" className={styles.selectQuant}>
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
                            <button type='submit'>Comprar</button>
                        </form>
                    </div>
                </div>
                <div className={styles.cep} ></div>
                <div className={styles.itemDescription}></div>
                <div className={styles.avaliations} ></div>
            </div>
        </div>
    )
}