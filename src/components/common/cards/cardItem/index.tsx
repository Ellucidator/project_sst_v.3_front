import Image from 'next/image';
import styles from './styles.module.scss'
import { Item, ItemPromotion } from '@/types/itemsTypes';
import Link from 'next/link';
import PriceItem from '../../texts/priceItem';

type Props = {
    item: ItemPromotion | Item
    model?: 'horizontal'|'vertical'
}

export const CardItem = ({ item, model='vertical' }: Props) => {

    return (
        <Link href={`/item/${item.id}`} className={model === 'horizontal' ? styles.cardItemModelH : styles.cardItem}
        >
            
            <div className={styles.bannerAndName}>
                <Image
                    src={process.env.API_HOST + `/files/${item.thumbnail_url}`}
                    alt="banner"
                    className={styles.cardBanner}
                    width={220}
                    height={220}
                />
                <p className={styles.name}>{item.name}</p>
            </div>

            <PriceItem price={item.price} pricePromotion={item.promotion? (item as ItemPromotion).ItemPromotion!.price : undefined}/>

        </Link>

    )
}

export default CardItem