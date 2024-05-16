import { UserPayload } from '@/types/userTypes'
import styles from './styles.module.scss'
import { Purchase } from '@/types/purchaseTypes'

type Props = {
    user:UserPayload
    userPurchase:Purchase
}
const UserHome = ({user,userPurchase}:Props) => {

    return (
        <>
            <p className={styles.userName}>Bem vindo {user.first_name}</p>
            <p className={styles.userEmail}>{user.email}</p>
            <p className={styles.userPurchaseTitle}>Ultimo Pedido</p>
            <div className={styles.userPurchase}>
                
                <div className={styles.userPurchaseInfo}>
                    <p className={styles.userPurchaseInfoTitle}>Número do pedido</p>
                    <p className={styles.userPurchaseInfoValue}>#{userPurchase.id}</p>
                </div>

                <div className={styles.userPurchaseInfo}>
                    <p className={styles.userPurchaseInfoTitle}>Data</p>
                    <p className={styles.userPurchaseInfoValue}>{new Date(userPurchase.createdAt).toLocaleString('pt-BR')}</p>
                </div>

                <div className={styles.userPurchaseInfo}>
                    <p className={styles.userPurchaseInfoTitle}>Total</p>
                    <p className={styles.userPurchaseInfoValue}>{userPurchase.all_value}</p>
                </div>
            </div>
        </>
    )
}


export default UserHome