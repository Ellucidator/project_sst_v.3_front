import { ItemPromotion } from '@/types/itemsTypes'
import styles from './styles.module.scss'
import Image from 'next/image'
import { Purchase } from '@/types/purchaseTypes'
import PriceItem from '../texts/priceItem'

type Props = {
    items: ItemPromotion[] | Purchase
    total?: number
    frete?: number
    type?: 'Common' | 'Purchase'
    model?: 'model1' | 'model2'
}
const ItemsTable = ({ items, type = 'Common', model = 'model1', total = 0, frete = 0 }: Props) => {

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
                                <div className={styles.infoAndPrice}>
                                    <p>{`${elem.ItemCharacteristic?.quantity}x ${elem.name}`}</p>
                                    <PriceItem model='model2' width='fit-content' pricePromotion={elem.promotion ? elem.ItemPromotion?.price : undefined} price={elem.price} />
                                </div>
                            </div>
                        )
                    })}
                    {frete > 0 ?
                        <div className={styles.item}>
                            <p>Frete:</p>
                            <p > {frete.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                        </div> :
                        <></>}
                    <div className={styles.item}>
                        <p className={styles.titleItems}>Total:</p>
                        <p className={styles.titleItems} > {(total + frete).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
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
                                <Image src={`http://localhost:3000/files/${elem.Item.thumbnail_url}`} alt={elem.Item.name} width={80} height={80} />
                                <div className={styles.infoAndPrice}>
                                    <p>{`${elem.quantity}x ${elem.Item.name}`}</p>
                                    <p className={styles.price}>{elem.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                                </div>
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
    }
}


export default ItemsTable