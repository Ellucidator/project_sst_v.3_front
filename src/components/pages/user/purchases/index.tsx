import styles from './styles.module.scss'
import CardPurchase from '@/components/common/cardPurchase'
import PagCountServer from '@/components/common/serverTestComponent/pagCount'
import Title from '@/components/common/tiltle'
import {Purchases } from '@/types/purchaseTypes'

type Props = {
    purchases: Purchases,
}
const UserPurchasesPage = ({purchases}:Props) => {
    

    return (
        <div className={styles.pageBody}>
            <Title fontSize="25px" model='model5' titleText="Meus pedidos" />

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
            <PagCountServer count={purchases.count} perPage={6} />
        </div>
    )
}


export default UserPurchasesPage