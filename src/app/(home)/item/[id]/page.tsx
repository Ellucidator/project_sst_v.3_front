import { catalogService } from '@/services/catalogService'
import styles from './page.module.scss'

export default async function Item({ params }: { params: { id: string } }){
    const item = await catalogService.getOneItem(params.id)

    
    


    return(
        <div className={styles.pageItem}>
            <div className={`container ${styles.itemContainer}`}>
                <p>{item.name}</p>
                <div className={styles.cardItem}>
                    <div></div>
                    <div className={styles.ItemBuy}></div>
                </div>
            </div>
        </div>
    )
}