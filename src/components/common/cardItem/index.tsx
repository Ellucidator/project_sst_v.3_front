import Image from 'next/image';
import styles from './styles.module.scss'
import { Item, ItemPromotion } from '@/types/itemsTypes';
import Link from 'next/link';
import PriceItem from '../priceItem';

type Props = {
    item: ItemPromotion | Item
    model?: 'horizontal'|'vertical'
    sizeImgModelH?: string
}

export const CardItem = ({ item, model='vertical', sizeImgModelH='180px' }: Props) => {

    return (
        <Link href={`/item/${item.id}`} className={model === 'horizontal' ? styles.cardItemModelH : styles.cardItem}
            style={{height:model==='horizontal'?sizeImgModelH:''}}
        >

            <div className={styles.bannerAndName}>
                <Image
                    src={`http://localhost:3000/files/${item.thumbnail_url}`}
                    alt="banner"
                    className={styles.cardBanner}
                    width={220}
                    height={220}
                    style={{width:model==='horizontal'?sizeImgModelH:'100%'}}
                />
                <p className={styles.name}>{item.name}</p>
            </div>

            <PriceItem item={item} />

        </Link>

    )
}

export default CardItem