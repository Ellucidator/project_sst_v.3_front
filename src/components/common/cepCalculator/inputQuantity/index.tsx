import styles from './styles.module.scss'

type Props = {
    in_stock: number
    quantityInStock:number[]
}
const InputQuantity = ({ in_stock, quantityInStock }: Props) => {
    return (
        <div className={styles.divQuant}>
            <p>Quantidade</p>
            <select name="quantity" disabled={in_stock > 0 ? false : true} id="quantity" className={styles.selectQuant}>
                {
                    quantityInStock.map((num,i) => {
                        if(i>9)return
                        
                        return (
                            <option key={num} value={num}>
                                {num}
                            </option>
                        )
                    })
                }
            </select>
        </div>
    )
}

export default InputQuantity