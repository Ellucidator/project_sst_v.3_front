import styles from './styles.module.scss'
import CardPurchase from '@/components/common/cardPurchase'
import PagCountServer from '@/components/common/serverTestComponent/pagCount'
import {Purchases } from '@/types/purchaseTypes'

type Props = {
    purchases: Purchases,
    tooken: string
}
const UserPurchasesPage = ({purchases}:Props) => {
    

    return (
        <div className={styles.pageBody}>
            <p className={styles.userPurchaseTitle}>Seus Pedidos</p>

            <div className={styles.userPurchasesContainer}>
                {   purchases.rows?
                    purchases.rows.map((elem)=>{
                        return(
                            <CardPurchase key={elem.id} userPurchase={elem} />
                        )
                    }):
                    <></>
                }
            </div>
            <PagCountServer count={purchases.count} perPage={6} page={1} />
        </div>
    )
}


export default UserPurchasesPage