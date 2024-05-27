import { Favorites, UserFavorite, UserPayload } from '@/types/userTypes'
import styles from './styles.module.scss'
import { Purchase } from '@/types/purchaseTypes'
import Image from 'next/image'
import CardPurchase from '@/components/common/cardPurchase'
import CardItem from '@/components/common/cardItem'

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
            <p className={styles.userPurchaseTitle}>Ultimo Pedido</p>
            <CardPurchase userPurchase={userPurchase} />
            <p className={styles.userPurchaseTitle}>Ultimos favoritos</p>
            <div className={styles.favoritesContainer}>
                {newestFavorites.rows?newestFavorites.rows.map((favorite)=>{
                    return(
                        <CardItem key={favorite.Item.id} item={favorite.Item}/>
                    )
                }):<></>}
            </div>
        </>
    )
}


export default UserHome