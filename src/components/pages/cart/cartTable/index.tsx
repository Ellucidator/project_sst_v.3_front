import { ItemPromotion } from '@/types/itemsTypes'
import styles from './styles.module.scss'
import Image from 'next/image'
import ButtonActionById from '@/components/common/serverActionComponent/buttonActionById';
import { cartServices } from '@/services/cartService';
import PriceItem from '@/components/common/texts/priceItem';
import Link from 'next/link';
import Title from '@/components/common/texts/tiltle';


type Props = {
    items?: ItemPromotion[] | null
}

const CartTable = ({ items }: Props) => {

    return (

        <div className={styles.tableItems}>
            <section className={styles.tableHeader}>
                <Title titleText='Produto' model='simple' fontWeight='bold' width='35%' />
                <Title titleText='Qtd' model='simple' fontWeight='bold' />
                <Title titleText='Preço' model='simple' fontWeight='bold' width='29%' />
            </section>
            <section className={styles.tableBody}>
                {
                    items ? items.map((item) => {
                        return (
                            <>
                                <div className={styles.tableRow} key={item.id}>
                                    <Link href={`/item/${item.id}`} className={styles.bannerAndName}>
                                        <Image src={process.env.API_HOST + `/files/${item.thumbnail_url}`} alt="banner" width={100} height={100} className={styles.cardBanner} />
                                        <p>{item.name}</p>
                                    </Link>

                                    <section className={styles.quantity}>
                                        <ButtonActionById
                                            buttonAttribute={{ btnName: '-', btnModel: 'model4', btnOption: { style: { width: '20px', height: '20px' } } }}
                                            actionFunction={cartServices.updateCart} idAction={`${item.id}/-/${item.in_stock}`} />

                                        {item.in_stock === 0 ? 'Indisponível' : item.ItemCharacteristic?.quantity}
                                        <ButtonActionById
                                            buttonAttribute={{ btnName: '+', btnModel: 'model4', btnOption: { style: { width: '20px', height: '20px' } } }}
                                            actionFunction={cartServices.updateCart} idAction={`${item.id}/+/${item.in_stock}`} />
                                    </section>

                                    <section className={styles.price}>
                                        <PriceItem model='model2' width='fit-content'
                                            price={item.price * item.ItemCharacteristic?.quantity!}
                                            pricePromotion={item.promotion ? item.ItemPromotion!.price * item.ItemCharacteristic?.quantity! : undefined}
                                        />

                                        <ButtonActionById
                                            buttonAttribute={{ btnName: 'x', btnModel: 'model4', btnOption: { style: { width: '20px', height: '20px' } } }}
                                            actionFunction={cartServices.updateCart} idAction={`${item.id}/x/${item.in_stock}`} />
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