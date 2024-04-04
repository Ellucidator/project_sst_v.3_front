import styles from './styles.module.scss'

type Props = {
    in_stock: number
    quantity:number[]
}
const InputQuantity = ({ in_stock, quantity }: Props) => {
    return (
        <div className={styles.divQuant}>
            <p>Quantidade</p>
            <select name="quantity" disabled={in_stock > 0 ? false : true} id="quantity" className={styles.selectQuant}>
                {
                    quantity.map((num) => {
                        return (
                            <option value={num}>
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