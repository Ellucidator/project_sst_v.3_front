import { Purchase } from '@/types/purchaseTypes'
import styles from './styles.module.scss'
import Image from 'next/image'
import PurchaseInfo from './purchaseInfo'


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
                <PurchaseInfo purchase={userPurchase} />
                <div className={styles.btnsUserPurchase}>
                    <button>Detalhes</button>
                    <button>Suporte</button>
                </div>
            </div>

        </div>
    )
}



export default CardPurchase