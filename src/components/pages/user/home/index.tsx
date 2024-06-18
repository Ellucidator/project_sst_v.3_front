import { Favorites, UserPayload } from '@/types/userTypes'
import styles from './styles.module.scss'
import { Purchase } from '@/types/purchaseTypes'
import CardItem from '@/components/common/cards/cardItem'
import Container from '@/components/common/container'
import Title from '@/components/common/texts/tiltle'
import CardPurchase from '@/components/common/cards/cardPurchase'

type Props = {
    user: UserPayload
    userPurchase: Purchase
    newestFavorites: Favorites
}
const UserHome = ({ user, userPurchase, newestFavorites }: Props) => {

    return (
        <>
            <p className={styles.userName}>Bem vindo {user.first_name}</p>
            <p className={styles.userEmail}>{user.email}</p>
            <Title fontSize="21px" model='model2' titleText="Ultimo pedido" />
            <CardPurchase userPurchase={userPurchase} />
            <br />
            <Title fontSize="21px" model='model2' titleText="Ultimos favoritos" />
            <Container model='model1' >
                {newestFavorites.rows?newestFavorites.rows.map((favorite)=>{
                    return(
                        <CardItem key={favorite.Item.id} item={favorite.Item}/>
                    )
                }):<></>}
            </Container>
        </>
    )
}


export default UserHome