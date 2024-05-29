
import { catalogService } from '@/services/catalogService'
import styles from './page.module.scss'
import Image from 'next/image'
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
        <div className={styles.pageItem}>
            <div className={`container ${styles.itemContainer}`}>
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

                                    <button type='submit' className={styles.btnBuy} >
                                        <div className={styles.btnTexts}>
                                            <p className={styles.title}>Comprar</p>

                                            <p className={styles.subTitle}>Adicionar ao carrinho</p>
                                        </div>
                                        <Image src="/public/common/cart-plus.svg" alt="catalog" className={styles.icon} width={35} height={35} />
                                        <div className={styles.addItem}>+</div>
                                    </button>

                                </form>
                            </section>
                        </div>
                    </div>
                </div>
                <div className={styles.sectionSecond}>
                    <CepCalculator item={item} quantityInStock={quantityInStock} />
                    {recomendedItems.Items ? (
                        <div className={styles.recomendedItems}>
                            <p className={styles.recomendedItemsTitle}>Você pode gostar:</p>
                            <SlideSection allItems={recomendedItems.Items} perPage={5} itemId={item.id} />
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
        </div>
    )
}