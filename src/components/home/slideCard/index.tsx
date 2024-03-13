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
                <Image src={`http://localhost:3000/files/${item.thumbnail_url}`} alt="banner" className={styles.slideBanner} width={180} height={180} />
                <p>{item.name}</p>

                {
                    itemPromotion ? (
                        <>
                            <p>{itemPromotion.price}</p>
                            <p>{itemPromotion.price_promotion}</p>
                        </>
                    ) : <p>{item.price}</p>
                }

            </div>
        </>
    )
}

export default SlideCard