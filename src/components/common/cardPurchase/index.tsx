import { Purchase } from '@/types/purchaseTypes'
import styles from './styles.module.scss'
import Image from 'next/image'


type Props = {
    userPurchase: Purchase
}
const CardPurchase = ({ userPurchase }: Props) => {


    return (

        <div className={styles.userPurchase}>
            <div className={styles.userPurchaseImg}>
                {userPurchase.ItemSells.map((item, i) => {
                    if (i < 3) return (
                        <Image key={item.Item.name} src={`http://localhost:3000/files/${item.Item.thumbnail_url}`} alt={item.Item.name} width={50} height={50} />
                    )
                })}
            </div>

            <div className={styles.userPurchaseInfoContainer}>
                <div className={styles.userPurchaseInfoDiv}>

                    <div className={styles.userPurchaseInfo}>
                        <p className={styles.userPurchaseInfoTitle}>Número do pedido</p>
                        <p className={styles.userPurchaseInfoValue}>#{userPurchase.id}</p>
                    </div>

                    <div className={styles.userPurchaseInfo}>
                        <p className={styles.userPurchaseInfoTitle}>Data/Hora</p>
                        <p className={styles.userPurchaseInfoValue}>{new Date(userPurchase.createdAt).toLocaleString('pt-BR')}</p>
                    </div>

                    <div className={styles.userPurchaseInfo}>
                        <p className={styles.userPurchaseInfoTitle}>Total</p>
                        <p className={styles.userPurchaseInfoValue}>{userPurchase.all_value}</p>
                    </div>

                    <div className={styles.userPurchaseInfoStatus}>
                        <p className={styles.userPurchaseInfoTitle}>Status</p>
                        <p className={styles.userPurchaseInfoValue}>Pedido {userPurchase.status}</p>
                    </div>

                </div>

                <div className={styles.btnsUserPurchase}>
                    <button>Detalhes</button>
                    <button>Suporte</button>
                </div>
            </div>

        </div>
    )
}



export default CardPurchase