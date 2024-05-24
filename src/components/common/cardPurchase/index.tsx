import { Purchase } from '@/types/purchaseTypes'
import styles from './styles.module.scss'
import Image from 'next/image'
import PurchaseInfo from './purchaseInfo'
import Link from 'next/link'


type Props = {
    userPurchase: Purchase
}
const CardPurchase = ({ userPurchase }: Props) => {
    if(!userPurchase) return <></>

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
                    <Link href={`purchase/${userPurchase.id}`}>Detalhes</Link>
                    <Link href={`/support/${userPurchase.id}`}>Suporte</Link>
                </div>
            </div>

        </div>
    )
}



export default CardPurchase