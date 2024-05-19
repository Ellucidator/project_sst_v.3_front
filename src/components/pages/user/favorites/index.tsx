import { ItemPromotion } from '@/types/itemsTypes'
import styles from './styles.module.scss'
import CardItemSearch from '@/components/common/inputSearch/searchModal/cardItemSearch'

type Props = {
    items: ItemPromotion[]
}
const FavoritesPage = ({ items }: Props) => {


    return (
        <div className={styles.pageBody}>
            <p className={styles.favoritesTitle}>Seus Favoritos</p>

            <div className={styles.favoritesContainer}>
                {   items?
                        items.map((item)=>{
                            return <CardItemSearch key={item.id} item={item} />
                        })
                    :<></>
                }
            </div>
        </div>
    )
}

export default FavoritesPage