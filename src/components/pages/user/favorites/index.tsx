import styles from './styles.module.scss'
import { userService } from '@/services/userService'
import ButtonActionById from '../../../common/serverActionComponent/buttonActionById'
import PagCountServer from '@/components/common/serverActionComponent/pagCount'
import CardItem from '@/components/common/cards/cardItem'
import Title from '@/components/common/texts/tiltle';
import Container from '@/components/common/container'


const FavoritesPage = async () => {
    const favorites = await userService.getUserFavorites()
    

    return (
        <div className={styles.pageBody}>
            <Title width='100%' fontSize="25px" model='model5' titleText="Meus favoritos" />

            <Container direction='column'>
                {favorites ?
                    <>
                        {favorites.rows.map((item) => {
                            return (
                                <div key={item.Item.id} className={styles.favoritesCard}>
                                    <CardItem item={item.Item} model='horizontal'/>
                                    <ButtonActionById buttonAttribute={{ btnName: 'x'}} actionFunction={userService.deleteUserFavorites} idAction={item.Item.id!} />
                                </div>
                            )
                        })}
                    </>
                    : <></>
                }
                <PagCountServer count={favorites?favorites.count:0} perPage={5}/>
            </Container>
        </div>
    )
}

export default FavoritesPage