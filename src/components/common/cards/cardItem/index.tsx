import Image from 'next/image';
import styles from './styles.module.scss'
import { Item, ItemPromotion } from '@/types/itemsTypes';
import Link from 'next/link';
import PriceItem from '../../texts/priceItem';
import ButtonActionById from '../../serverActionComponent/buttonActionById';

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
            <ButtonActionById
                formOption={{style: {position: 'absolute', alignSelf:'flex-end'}}}
                buttonAttribute={{btnModel: 'model10', btnAction: 'submit',iconElem:{src:'/public/common/heart.svg',position:'left',width:15}}} idAction={item.id} actionFunction={() => {}}
                />
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

            <PriceItem price={item.price} pricePromotion={item.promotion? (item as ItemPromotion).ItemPromotion!.price : undefined}/>

        </Link>

    )
}

export default CardItem