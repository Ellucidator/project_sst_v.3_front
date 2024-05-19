import styles from './styles.module.scss'
import CardPurchase from '@/components/common/cardPurchase'
import {Purchases } from '@/types/purchaseTypes'

type Props = {
    purchases: Purchases
}
const UserPurchasesPage = async({purchases}:Props) => {

    return (
        <div className={styles.pageBody}>
            <p className={styles.userPurchaseTitle}>Seus Pedidos</p>

            <div className={styles.userPurchasesContainer}>
                {
                    purchases.rows.map((elem)=>{
                        return(
                            <CardPurchase key={elem.id} userPurchase={elem} />
                        )
                    })
                }
            </div>
        </div>
    )
}


export default UserPurchasesPage