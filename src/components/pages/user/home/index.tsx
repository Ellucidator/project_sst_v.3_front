import { UserPayload } from '@/types/userTypes'
import styles from './styles.module.scss'
import { Purchase } from '@/types/purchaseTypes'
import Image from 'next/image'
import CardPurchase from '@/components/common/cardPurchase'

type Props = {
    user: UserPayload
    userPurchase: Purchase
}
const UserHome = ({ user, userPurchase }: Props) => {

    return (
        <>
            <p className={styles.userName}>Bem vindo {user.first_name}</p>
            <p className={styles.userEmail}>{user.email}</p>
            <p className={styles.userPurchaseTitle}>Ultimo Pedido</p>
            <CardPurchase userPurchase={userPurchase} />
        </>
    )
}


export default UserHome