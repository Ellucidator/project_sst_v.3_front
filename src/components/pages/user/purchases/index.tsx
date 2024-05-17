import { userService } from '@/services/userService'
import styles from './styles.module.scss'
import CardPurchase from '@/components/common/cardPurchase'


const UserPurchasesPage = async() => {
    const purchases = await userService.getUserPurchases()

    return (
        <div className={styles.pageBody}>
            <p className={styles.userPurchaseTitle}>Seus Pedidos</p>

            <div className={styles.userPurchasesContainer}>
                {
                    purchases.map((elem)=>{
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