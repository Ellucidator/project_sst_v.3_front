'use server'
import { ItemPromotion } from '@/types/itemsTypes'
import styles from './styles.module.scss'
import CardItemSearch from '@/components/common/inputSearch/searchModal/cardItemSearch'
import { userService } from '@/services/userService'
import ButtonActionById from '../address/buttonActionById'


const FavoritesPage = async () => {
    const favorites = await userService.getUserFavorites()
    

    return (
        <div className={styles.pageBody}>
            <p className={styles.favoritesTitle}>Seus Favoritos</p>

            <div className={styles.favoritesContainer}>
                {   favorites?
                        favorites.map((item)=>{
                            return (
                                <div key={item.Item.id} className={styles.favoritesCard}>
                                    <CardItemSearch item={item.Item} />
                                    <ButtonActionById buttonName="x" actionFunction={userService.deleteUserFavorites} idAction={item.Item.id!}/>
                                </div>
                            )
                        })
                    :<></>
                }
            </div>
        </div>
    )
}

export default FavoritesPage