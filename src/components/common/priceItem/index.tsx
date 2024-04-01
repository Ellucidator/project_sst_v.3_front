import styles from './styles.module.scss'
import { Item, ItemFull, ItemPromotion } from '@/types/itemsTypes';

type Props = {
    item: ItemPromotion | Item | ItemFull
}

export const PriceItem = ({ item }: Props) => {

    const itemP = item.promotion ? (item as ItemPromotion) : undefined

    return (
        <>
            {
                itemP ? (
                    <>
                        <div className={styles.priceContainer}>
                            <p className={styles.pricePromotion}>{
                                `${itemP.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`
                            }
                            </p>
                            <p className={styles.price}>{
                                `${ itemP.ItemPromotion.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`
                            }
                            </p>
                        </div>
                    </>
                ) : (
                    <>
                        <p className={styles.price}>
                            {item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </p>
                    </>
                )
            }

        </>
    )
}

export default PriceItem