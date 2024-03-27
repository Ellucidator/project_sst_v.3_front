import Image from 'next/image';
import styles from './styles.module.scss'
import { Item, ItemPromotion } from '@/types/itemsTypes';
import Link from 'next/link';

type Props = {
    item: ItemPromotion | Item
}

export const CardItem = ({ item }: Props) => {

    const itemP = item.promotion?(item as ItemPromotion):undefined
    
    return (
        <>

            <Link href={`/item/${item.id}`} className={styles.cardItem}>
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
                    itemP ? (
                        <>
                            <div className={styles.priceContainer}>
                                <p className={styles.pricePromotion}>{
                                    `${itemP.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`
                                    }
                                </p>
                                <p className={styles.price}>{
                                    itemP.ItemPromotion.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
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

            </Link>

        </>
    )
}

export default CardItem