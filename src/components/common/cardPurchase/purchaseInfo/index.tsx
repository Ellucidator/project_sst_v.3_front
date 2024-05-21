import { Purchase } from '@/types/purchaseTypes'
import styles from './styles.module.scss'


const PurchaseInfo = ({ purchase }: { purchase: Purchase }) => {

    return (
        <div key={purchase.id} className={styles.userPurchaseInfoDiv}>

            <div className={styles.userPurchaseInfo}>
                <p className={styles.userPurchaseInfoTitle}>Número do pedido</p>
                <p className={styles.userPurchaseInfoValue}>#{purchase.id}</p>
            </div>

            <div className={styles.userPurchaseInfo}>
                <p className={styles.userPurchaseInfoTitle}>Data/Hora</p>
                <p className={styles.userPurchaseInfoValue}>{new Date(purchase.createdAt).toLocaleString('pt-BR')}</p>
            </div>

            <div className={styles.userPurchaseInfo}>
                <p className={styles.userPurchaseInfoTitle}>Total</p>
                <p className={styles.userPurchaseInfoValue}>{purchase.all_value}</p>
            </div>

            <div className={styles.userPurchaseInfoStatus}>
                <p className={styles.userPurchaseInfoTitle}>Status</p>
                <p className={styles.userPurchaseInfoValue}>Pedido {purchase.status}</p>
            </div>

        </div>
    )
}

export default PurchaseInfo