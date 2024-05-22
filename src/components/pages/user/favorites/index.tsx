import { ItemPromotion } from '@/types/itemsTypes'
import styles from './styles.module.scss'
import CardItemSearch from '@/components/common/inputSearch/searchModal/cardItemSearch'
import { userService } from '@/services/userService'


const FavoritesPage = async () => {
    const favorites = await userService.getUserFavorites()
    

    return (
        <div className={styles.pageBody}>
            <p className={styles.favoritesTitle}>Seus Favoritos</p>

            <div className={styles.favoritesContainer}>
                {   favorites?
                        favorites.map((item)=>{
                            return <CardItemSearch key={item.Item.id} item={item.Item} />
                        })
                    :<></>
                }
            </div>
        </div>
    )
}

export default FavoritesPage