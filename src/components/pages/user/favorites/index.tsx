'use server'
import styles from './styles.module.scss'
import { userService } from '@/services/userService'
import ButtonActionById from '../../../common/serverTestComponent/buttonActionById'
import PagCountServer from '@/components/common/serverTestComponent/pagCount'
import CardItem from '@/components/common/cardItem'
import Title from '@/components/common/tiltle'


const FavoritesPage = async () => {
    const favorites = await userService.getUserFavorites()
    




    return (
        <div className={styles.pageBody}>
            <Title fontSize="25px" model='model5' titleText="Meus favoritos" />

            <div className={styles.favoritesContainer}>
                {favorites ?
                    <div>
                        {favorites.rows.map((item) => {
                            return (
                                <div key={item.Item.id} className={styles.favoritesCard}>
                                    <CardItem item={item.Item} model='horizontal'/>
                                    <ButtonActionById buttonName="x" actionFunction={userService.deleteUserFavorites} idAction={item.Item.id!} />
                                </div>
                            )
                        })}
                    </div>
                    : <></>
                }
                <PagCountServer count={favorites?favorites.count:0} perPage={6}/>
            </div>
        </div>
    )
}

export default FavoritesPage