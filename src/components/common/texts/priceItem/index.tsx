import styles from './styles.module.scss'

type Props = {
    price: number
    pricePromotion?: number
    model?: 'model1' | 'model2'
    width?: string
}

export const PriceItem = ({ price, pricePromotion, model = 'model1', width }: Props) => {

    return (
        <div className={`${styles.priceContainer} ${styles[model]}`}
            style={width?{width}:{flex:1}}
            >
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