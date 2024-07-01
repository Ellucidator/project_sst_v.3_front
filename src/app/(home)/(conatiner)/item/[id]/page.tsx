
import { catalogService } from '@/services/catalogService'
import styles from './page.module.scss'
import SlideSectionItem from '@/components/pages/item/slideSectionItem'
import PriceItem from '@/components/common/texts/priceItem'
import InputQuantity from '@/components/common/cepCalculator/inputQuantity'
import CepCalculator from '@/components/common/cepCalculator'
import DescriptionList from '@/components/pages/item/descriptionList'
import AvaliationsItem from '@/components/pages/item/avaliationsItem'
import { userService } from '@/services/userService'
import {itemService} from '@/services/itemService'
import Title from '@/components/common/texts/tiltle';
import Button from '@/components/common/button'
import cartIcon from '../../../../../../public/public/common/cart-plus.svg'
import ButtonReturn from '@/components/common/clientOnlyComponents/btnReturn'
import SlideSection from '@/components/common/clientOnlyComponents/slideSection'
import { cartServices } from '@/services/cartService'



export default async function Item({ params }: { params: { id: string } }) {
    
    const [item, avaliations, userAvaliation, itemCharacteristics]= await Promise.all([
        itemService.getOneItem(params.id),
        itemService.getAllAvaliationsByItemId(params.id),
        userService.getAvaliationByUserId(),
        itemService.getItemCharacteristics(params.id)
    ])
    item.ItemCharacteristic = itemCharacteristics

    console.log(item.promotion)
    const recomendedItems = await catalogService.getItensBySubCategory(`${item.sub_category_id!}`)


    const quantityInStock = Array.from({ length: item.in_stock }, (_, i) => i + 1)
    
    const formAction = async (form: FormData) => {
        'use server'
        const buyQuantity = parseInt(form.get('quantity')!.toString())
        const price = parseFloat(form.get('price')!.toString())
        
        await cartServices.addCarItem(item.in_stock,{
            id: item.id,
            price,
            quantity: buyQuantity
        })

    }

    return (
        <>
            <div className={` ${styles.itemContainer}`}>
                <ButtonReturn />
                <p className={styles.titleItem}>{item.name}</p>
                <div className={styles.cardItem}>

                    <SlideSectionItem allItems={item} />

                    <div className={styles.itemBuy}>
                        {item.in_stock > 0 ? (
                            <p className={styles.itemStockT}>Produto Disponivel</p>
                        ) : (
                            <p className={styles.itemStockF}>Produto Indisponivel</p>
                        )}
                        
                        <div className={styles.itemInfo}>
                            <section className={styles.sectionPayInfo}>

                            </section>

                            <section className={styles.sectionBuy}>
                                <PriceItem  price={item.price} pricePromotion={item.promotion? item.ItemPromotion!.price : undefined} />
                                <form action={formAction}>
                                    <InputQuantity quantityInStock={quantityInStock} in_stock={item.in_stock} />

                                    <input type="hidden" name='price' value={item.promotion? item.ItemPromotion!.price : item.price} />

                                    <Button btnWidth='100%' btnModel='model5' btnName='Comprar' subTitle='Adicionar ao carrinho' btnAction='submit' iconElem={{ src: cartIcon, position: 'right', width: 35 }} />

                                </form>
                            </section>
                        </div>
                    </div>
                </div>
                <div className={styles.sectionSecond}>
                    <CepCalculator item={item} quantityInStock={quantityInStock} />
                    {recomendedItems.Items ? (
                        <div className={styles.recomendedItems}>
                            <Title model='model2' fontSize='20px' titleText='Voce pode gostar' />
                            <SlideSection allItems={recomendedItems.Items} perPage={4} itemId={item.id} />
                        </div>
                    ) : null}

                </div>
                <div className={styles.itemDescription}>
                    <DescriptionList tagList={item.TagValues} />
                </div>
                <div className={styles.avaliations} >
                    <AvaliationsItem item_id={item.id} user_id={1} avaliation={userAvaliation} allAvaliation={avaliations}/>
                </div>
            </div>
        </>
    )
}