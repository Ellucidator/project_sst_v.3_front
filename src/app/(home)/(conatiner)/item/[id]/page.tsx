
import { catalogService } from '@/services/catalogService'
import styles from './page.module.scss'
import SlideSectionItem from '@/components/pages/item/slideSectionItem'
import PriceItem from '@/components/common/texts/priceItem'
import InputQuantity from '@/components/common/cepCalculator/inputQuantity'
import CepCalculator from '@/components/common/cepCalculator'
import DescriptionList from '@/components/pages/item/descriptionList'
import AvaliationsItem from '@/components/pages/item/avaliationsItem'
import { userService } from '@/services/userService'
import { itemService } from '@/services/itemService'
import Button from '@/components/common/button'
import cartIcon from '../../../../../../public/public/common/cart-plus.svg'
import { cartServices } from '@/services/cartService'
import Container from '@/components/common/container'
import CardItem from '@/components/common/cards/cardItem'
import ButtonActionById from '@/components/common/serverActionComponent/buttonActionById'
import PromotionMiniBanner from '@/components/common/clientOnlyComponents/promotionMiniBanner'



export default async function Item({ params }: { params: { id: string } }) {

    const [item, avaliations, userAvaliation, itemCharacteristics, favorite] = await Promise.all([
        itemService.getOneItem(params.id),
        itemService.getAllAvaliationsByItemId(params.id),
        userService.getAvaliationByUserId(),
        itemService.getItemCharacteristics(params.id),
        userService.getUserFavoriteByItemId(params.id),
    ])

    item.ItemCharacteristic = itemCharacteristics
    const recomendedItems = await catalogService.getItensBySubCategory(`${item.sub_category_id!}`, 4)

    const quantityInStock = Array.from({ length: item.in_stock }, (_, i) => i + 1)

    const formAction = async (form: FormData) => {
        'use server'
        const buyQuantity = form.get('quantity')?.toString()
        if (!buyQuantity) return



        const price = parseFloat(form.get('price')!.toString())

        await cartServices.addCarItem(item.in_stock, {
            id: item.id,
            price,
            ItemCharacteristics: {
                ...itemCharacteristics,
                quantity: parseInt(buyQuantity)
            }
        })

    }

    return (
        <>
            <div className={` ${styles.itemContainer}`}>
                <p className={styles.titleItem}>{item.name}</p>
                <ButtonActionById
                    idAction={item.id} actionFunction={favorite ? userService.deleteUserFavorites : userService.addUserFavorites}
                    formOption={{ style: { position: 'absolute', alignSelf: 'flex-end' } }}
                    buttonAttribute={{ btnModel: 'model10', btnAction: 'submit', iconElem: { src: `/public/common/${favorite ? 'heart-fill' : 'heart'}.svg`, position: 'left', width: 15 } }}
                />
                <div className={styles.cardItem}>

                    <SlideSectionItem allItems={item} />

                    <div className={styles.itemBuy}>
                        <div>
                            {item.in_stock > 0 ? (
                                <p className={styles.itemStockT}>Produto Disponivel</p>
                            ) : (
                                <p className={styles.itemStockF}>Produto Indisponivel</p>
                            )}

                            <PromotionMiniBanner />
                        </div>

                        <div className={styles.itemInfo}>
                            <section className={styles.sectionPayInfo}>

                            </section>

                            <section className={styles.sectionBuy}>
                                <PriceItem price={item.price} pricePromotion={item.promotion ? item.ItemPromotion!.price : undefined} />
                                <form action={formAction}>
                                    <InputQuantity quantityInStock={quantityInStock} in_stock={item.in_stock} />

                                    <input type="hidden" name='price' value={item.promotion ? item.ItemPromotion!.price : item.price} />

                                    <Button btnWidth='100%' btnModel='model5' btnName='Comprar' subTitle='Adicionar ao carrinho' btnAction='submit' iconElem={{ src: cartIcon, position: 'right', width: 35 }} />

                                </form>
                            </section>
                        </div>
                    </div>
                </div>
                <div className={styles.sectionSecond}>
                    <CepCalculator item={item} quantityInStock={quantityInStock} />
                    <div className={styles.recomendedItems}>
                        {recomendedItems.Items ? (
                            <Container title={{ titleText: 'Itens Recomendados', model: "model1", fontSize: "25px" }}
                                model="model1" modelTw='container' justifyContent='center' >
                                {recomendedItems.Items.map((elem) => {
                                    if (elem.id === item.id) return
                                    return (
                                        <CardItem key={elem.id} item={elem} />
                                    )
                                })}
                            </Container>
                        ) : null}
                    </div>

                </div>
                <div className={styles.itemDescription}>
                    <DescriptionList tagList={item.TagValues} />
                </div>
                <div className={styles.avaliations} >
                    <AvaliationsItem item_id={item.id} user_id={1} avaliation={userAvaliation} allAvaliation={avaliations} />
                </div>
            </div>
        </>
    )
}