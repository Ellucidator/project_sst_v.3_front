import { ItemPromotion } from '@/types/itemsTypes'
import styles from './styles.module.scss'
import Image from 'next/image'
import { Purchase } from '@/types/purchaseTypes'
import PriceItem from '../texts/priceItem'

type Props = {
    items: ItemPromotion[] | Purchase
    total?: number
    type?: 'Common' | 'Purchase'
    model?: 'model1' | 'model2'
}
const ItemsTable = ({ items, type='Common', model='model1', total=0}: Props) => {

    if (type === 'Common') {
        items = items as ItemPromotion[]

        return (
            <div className={styles[model]}>
                <div className={styles.divItems}>
                    <p className={styles.titleItems}>Itens:</p>
                    {items.map((elem) => {
                        return (
                            <div key={elem.name} className={styles.item}>
                                <Image className={styles.itemImg} src={`http://localhost:3000/files/${elem.thumbnail_url}`} alt={elem.name} width={50} height={50} />
                                <p>{`${elem.ItemCharacteristic?.quantity}x ${elem.name}`}</p>
                                <PriceItem model='model2' width='fit-content' pricePromotion={elem.promotion ? elem.ItemPromotion?.price : undefined} price={elem.price} />
                            </div>
                        )
                    })}
                    <div className={styles.item}>
                        <p className={styles.titleItems}>Total:</p>
                        <p className={styles.titleItems} > {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                    </div>
                </div>
            </div>
        )
    } else {
        items = items as Purchase

        return (
            <div className={styles[model]}>
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