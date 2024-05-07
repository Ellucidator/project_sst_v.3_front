import { ItemPromotion } from '@/types/itemsTypes'
import styles from './styles.module.scss'
import Image from 'next/image'

type Props = {
    items?: ItemPromotion[]
}

const CartTable = ({ items }: Props) => {

    return (

        <table className={styles.tableItems}>
            <thead>
                <tr>
                    <td className={styles.tableTitle}>Produtos</td>
                    <td className={styles.tableTitle}>Qtd</td>
                    <td className={styles.tableTitle}>Preço</td>
                </tr>
            </thead>
            <tbody>
                {
                    items ? items.map((item) => {
                        return (
                            <>
                                <tr>
                                    <td className='flex gap-5 '>
                                        <Image src={`http://localhost:3000/files/${item.thumbnail_url}`} alt="banner" width={100} height={100} className={styles.cardBanner} />
                                        <p>{item.name}</p>
                                    </td>
                                    <td>{item.in_stock === 0 ? 'Indisponível' : item.quantity}</td>
                                    <td>
                                        {item.promotion ? (
                                            <>
                                                <p className={styles.pricePromotion}>{item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                                                <p className={styles.price}>{item.ItemPromotion.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                                            </>
                                        ) : (
                                            <p className={styles.price}>{item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                                        )}
                                    </td>
                                </tr>
                            </>
                        )
                    }) : null
                }
            </tbody>
        </table>

    )
}

export default CartTable