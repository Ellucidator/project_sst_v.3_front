import { Item } from '@/types/itemsTypes'
import styles from './styles.module.scss'
import Image from 'next/image'

type Props = {
    items: Item[]
}
const ItemsTable = ({items}: Props) => {


    return(
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
}


export default ItemsTable