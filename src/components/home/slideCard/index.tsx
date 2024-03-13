'use client'
import Image from 'next/image';
import styles from './styles.module.scss'
import { Item, ItemPromotion } from '@/types/itemsTypes';

type Props = {
    item: ItemPromotion | Item
}

export const SlideCard = ({ item }: Props) => {

    let itemPromotion

    if (item.promotion) {
        itemPromotion = item as ItemPromotion
    }

    return (
        <>
            <div className={styles.slideCard}>
                <section className={styles.cardContent}>
                    <Image
                        src={`http://localhost:3000/files/${item.thumbnail_url}`}
                        alt="banner"
                        className={styles.cardBanner}
                        width={180}
                        height={180}
                    />

                    <p className={styles.name}>{item.name}</p>
                </section>

                {
                    itemPromotion ? (
                        <>
                            <div className={styles.priceContainer}>
                                <p className={styles.price}>{
                                    itemPromotion.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                                }</p>
                                <p className={styles.pricePromotion}>{
                                    itemPromotion.price_promotion.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                                }</p>
                            </div>
                        </>
                    ) : <p className={styles.price}>{
                        item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                    }</p>
                }

            </div>
        </>
    )
}

export default SlideCard