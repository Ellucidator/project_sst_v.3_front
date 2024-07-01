import { Item } from '@/types/itemsTypes'
import styles from './styles.module.scss'
import Image from 'next/image'
import { Purchase } from '@/types/purchaseTypes'

type Props = {
    items: Item[] | Purchase
    type: 'Common' | 'Purchase'
}
const ItemsTable = ({ items, type }: Props) => {


    if (type === 'Common') {
        items = items as Item[]

        return (
            <div className={styles.divInfo}>
                <div className={styles.divItems}>
                    <p className={styles.titleItems}>Itens:</p>
                    {items.map((elem) => {
                        return (
                            <div key={elem.name} className={styles.item}>
                                <Image src={`http://localhost:3000/files/${elem.thumbnail_url}`} alt={elem.name} width={50} height={50} />
                                <p>{`${elem.quantity}x ${elem.name}`}</p>
                                <p>{elem.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    } else {
        items = items as Purchase

        return (
            <div className={styles.divInfo}>
                <div className={styles.divItems}>
                    <p className={styles.titleItems}>Itens:</p>
                    {items.ItemSells.map((elem) => {
                        return (
                            <div key={elem.Item.name} className={styles.item}>
                                <Image src={`http://localhost:3000/files/${elem.Item.thumbnail_url}`} alt={elem.Item.name} width={50} height={50} />
                                <p>{`${elem.quantity}x ${elem.Item.name}`}</p>
                                <p>{elem.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}


export default ItemsTable