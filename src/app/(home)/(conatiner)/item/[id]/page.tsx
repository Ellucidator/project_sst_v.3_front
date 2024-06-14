
import { catalogService } from '@/services/catalogService'
import styles from './page.module.scss'
import SlideSectionItem from '@/components/common/slideSectionItem'
import PriceItem from '@/components/common/priceItem'
import { cookieService } from '@/services/cookieService'
import InputQuantity from '@/components/common/inputQuantity'
import CepCalculator from '@/components/common/cepCalculator'
import SlideSection from '@/components/common/slideSection'
import DescriptionList from '@/components/common/descriptionList'
import AvaliationsItem from '@/components/common/avaliationsItem'
import { userService } from '@/services/userService'
import ButtonReturn from '@/components/common/btnReturn'
import catalogServerService from '@/services/catalogServerService'
import Title from '@/components/common/tiltle'
import Button from '@/components/common/button'
import cartIcon from '../../../../../../public/public/common/cart-plus.svg'



export default async function Item({ params }: { params: { id: string } }) {
    
    const [item, avaliations, userAvaliation, itemCharacteristics]= await Promise.all([
        catalogService.getOneItem(params.id),
        catalogServerService.getAllAvaliationsByItemId(params.id),
        userService.getAvaliationByUserId(),
        catalogService.getItemCharacteristics(params.id)
    ])
    item.ItemCharacteristic = itemCharacteristics

    
    const recomendedItems = await catalogService.getItensBySubCategory(item.sub_category_id!)


    const quantityInStock = Array.from({ length: item.in_stock }, (_, i) => i + 1)
    
    const formAction = async (form: FormData) => {
        'use server'
        const buyQuantity = parseInt(form.get('quantity')!.toString())

        await cookieService.addCarItem(item.in_stock,{
            id: item.id,
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
                                <PriceItem item={item} />
                                <form action={formAction}>
                                    <InputQuantity quantityInStock={quantityInStock} in_stock={item.in_stock} />

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