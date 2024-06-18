import styles from './styles.module.scss'

type Props = {
    price: number
    pricePromotion?: number
    model?: 'model1' | 'model2'
}

export const PriceItem = ({ price, pricePromotion, model = 'model1' }: Props) => {

    return (
        <div className={`${styles.priceContainer} ${styles[model]}`}>
            <p className={pricePromotion? styles.pricePromotion : styles.price}>
                {`${price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`}
            </p>
            {pricePromotion ?
                <p className={styles.price}>
                    {`${pricePromotion!.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`}
                </p>
                :
                <></>}
        </div>
    )
}

export default PriceItem