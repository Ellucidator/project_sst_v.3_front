import { catalogService } from '@/services/catalogService'
import styles from './page.module.scss'
import Image from 'next/image'
import SlideSectionItem from '@/components/common/slideSectionItem'
import PriceItem from '@/components/common/priceItem'
import { cookieService } from '@/services/cookieService'
import InputQuantity from '@/components/common/inputQuantity'
import CepCalculator from '@/components/common/cepCalculator'

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
                            <InputQuantity quantity={quantity} in_stock={item.in_stock} />

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
                <CepCalculator />
                <div className={styles.itemDescription}></div>
                <div className={styles.avaliations} ></div>
            </div>
        </div>
    )
}