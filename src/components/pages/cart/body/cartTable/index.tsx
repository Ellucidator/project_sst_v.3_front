import { ItemPromotion } from '@/types/itemsTypes'
import styles from './styles.module.scss'
import Image from 'next/image'
import ButtonActionById from '@/components/common/serverTestComponent/buttonActionById';
import { cartServices } from '@/services/cartService';


type Props = {
    items?: ItemPromotion[] | null
}

const CartTable = ({ items }: Props) => {
    

    return (

        <div className={styles.tableItems}>
            <section className={styles.tableHeader}>
                    <p className={styles.tableTitle1}>Produtos</p>
                    <p className={styles.tableTitle2}>Qtd</p>
                    <p className={styles.tableTitle3}>Preço</p>
            </section>
            <section className={styles.tableBody}>
                {
                    items ? items.map((item) => {
                        return (
                            <>
                                <div className={styles.tableRow}  key={item.id}>
                                    <section className={styles.bannerAndName}>
                                        <Image src={`http://localhost:3000/files/${item.thumbnail_url}`} alt="banner" width={100} height={100} className={styles.cardBanner} />
                                        <p>{item.name}</p>
                                    </section>

                                    <section className={styles.quantity}>
                                        <ButtonActionById 
                                            buttonAttribute={{btnName:'-', btnModel:'model4',btnOption:{style:{width:'20px',height:'20px'}}}} 
                                            actionFunction={cartServices.getCookiesCart} idAction={`${item.id}/-/${item.in_stock}`}  />

                                        {item.in_stock === 0 ? 'Indisponível' : item.ItemCharacteristic?.quantity}
                                        <ButtonActionById
                                            buttonAttribute={{btnName:'+', btnModel:'model4', btnOption:{style:{width:'20px',height:'20px'}}}} 
                                            actionFunction={cartServices.getCookiesCart} idAction={`${item.id}/+/${item.in_stock}`}  />
                                    </section>
                                    
                                    <section className={styles.priceAndPromotion}>
                                        {item.promotion ? (
                                            <>
                                                <p className={styles.pricePromotion}>{(item.price * item.ItemCharacteristic?.quantity!).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                                                <p className={styles.price}>{(item.ItemPromotion.price * item.ItemCharacteristic?.quantity!).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                                            </>
                                        ) : (
                                            <p className={styles.price}>{(item.price * item.ItemCharacteristic?.quantity!).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                                        )}
                                    </section>
                                    <section>
                                    <ButtonActionById 
                                            buttonAttribute={{btnName:'x', btnModel:'model4',btnOption:{style:{width:'20px',height:'20px'}}}} 
                                            actionFunction={cartServices.getCookiesCart} idAction={`${item.id}/x/${item.in_stock}`}  />
                                    </section>
                                </div>
                            </>
                        )
                    }) : null
                }
            </section>
        </div>

    )
}

export default CartTable