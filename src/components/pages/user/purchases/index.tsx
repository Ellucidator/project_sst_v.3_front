import Container from '@/components/common/container'
import styles from './styles.module.scss'
import PagCountServer from '@/components/common/serverActionComponent/pagCount'
import Title from '@/components/common/texts/tiltle';
import { Purchases } from '@/types/purchaseTypes'
import CardPurchase from '@/components/common/cards/cardPurchase';

type Props = {
    purchases: Purchases | false,
}
const UserPurchasesPage = ({ purchases }: Props) => {


    return (
        <div className={styles.pageBody}>
            <Title width='100%' fontSize="25px" model='model5' titleText="Meus pedidos" />

            {purchases ? (
                <>
                    <Container direction='column'>
                        {purchases.rows ?
                            purchases.rows.map((elem) => {
                                return (
                                    <CardPurchase key={elem.id} userPurchase={elem} />
                                )
                            }) :
                            <></>
                        }
                    </Container>
                    <PagCountServer count={purchases.count} perPage={6} />
                </>
            ) :
            <></>}
        </div>
    )
}


export default UserPurchasesPage