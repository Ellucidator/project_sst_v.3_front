import { Purchase } from '@/types/purchaseTypes'
import styles from './styles.module.scss'
import Image from 'next/image'
import PurchaseInfo from './purchaseInfo'
import Button from '../../button'



type Props = {
    userPurchase: Purchase
}
const CardPurchase = ({ userPurchase }: Props) => {
    if(!userPurchase) return <></>
    return (

        <div className={styles.userPurchase}>
            <div className={styles.userPurchaseImg}>
                {userPurchase.ItemSells.map((item, i) => {
                    if (i < 4) return (
                        <Image key={item.Item.name} src={process.env.API_HOST + `/files/${item.Item.thumbnail_url}`} alt={item.Item.name} width={50} height={50} />
                    )
                })}
            </div>

            <div className={styles.userPurchaseInfoContainer}>
                <PurchaseInfo purchase={userPurchase} />
                <div className={styles.btnsUserPurchase}>
                    <Button btnModel='model1' btnAction='link' href={`purchase/${userPurchase.id}`} btnName='Detalhes'/>
                    <Button btnModel='model1' btnAction='link' href={`my-purchases`} btnName='Suporte'/>
                </div>
            </div>

        </div>
    )
}



export default CardPurchase