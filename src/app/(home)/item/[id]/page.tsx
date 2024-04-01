import { catalogService } from '@/services/catalogService'
import styles from './page.module.scss'
import Image from 'next/image'
import SlideSectionItem from '@/components/common/slideSectionItem'
import PriceItem from '@/components/common/priceItem'

export default async function Item({ params }: { params: { id: string } }){
    const item = await catalogService.getOneItem(params.id)

    
    


    return(
        <div className={styles.pageItem}>
            <div className={`container ${styles.itemContainer}`}>
                <p className={styles.titleItem}>{item.name}</p>
                <div className={styles.cardItem}>

                    <SlideSectionItem allItems={item} />

                    <div className={styles.itemBuy}>
                        <PriceItem item={item}/>
                    </div>
                </div>
                <div className={styles.cep} ></div>
                <div className={styles.itemDescription}></div>
                <div className={styles.avaliations} ></div>
            </div>
        </div>
    )
}