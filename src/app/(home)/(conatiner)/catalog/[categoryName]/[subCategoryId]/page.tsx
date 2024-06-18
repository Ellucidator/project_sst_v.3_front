import styles from './page.module.scss'
import { catalogService } from '@/services/catalogService'
import { cookieService } from '@/services/cookieService'
import Title from '@/components/common/texts/tiltle';
import Container from '@/components/common/container'
import CardItem from '@/components/common/cards/cardItem'
import PagCountServer from '@/components/common/serverActionComponent/pagCount'
import Button from '@/components/common/button'
import { cookies } from 'next/headers'
import Loading from '@/components/common/clientOnlyComponents/loading'
import TagsFilterServ from '@/components/pages/catalog/servTagsFilter';
import ScrollToTop from '@/components/common/clientOnlyComponents/scrollToTop';


export default async function Catalog({ params }: { params: { categoryName: string, subCategoryId: string } }) {
    const [catalog, tags] = await Promise.all([
        cookieService.getItensBySubCategoryServ(params.subCategoryId),
        catalogService.getTags(params.subCategoryId)
    ])
    
    const actionSelect = async (form: FormData) => {
        'use server'


        const order = form.get('order')?.toString()!
        const catalogCookie = cookies().get(`catalog${params.subCategoryId}`)?.value


        if (catalogCookie) {
            const catalogCookieOn: { itemsOrder?: string, tags?: any[] } = JSON.parse(catalogCookie)
            catalogCookieOn.itemsOrder = order
            cookies().set(`catalog${params.subCategoryId}`, JSON.stringify(catalogCookieOn),
                {
                    maxAge: 60 * 60
                })
        } else {
            cookies().set(`catalog${params.subCategoryId}`, JSON.stringify({ itemsOrder: order, tags: [] }),
                {
                    maxAge: 60 * 60
                })
        }
    }

    return (

        <>
            <ScrollToTop />
            <div className={styles.catalogOptions}>
                <TagsFilterServ tags={tags} subCategoryId={params.subCategoryId} />
            </div>

            <div className={styles.catalogCardContainer}>

                <form action={actionSelect} className={styles.catalogOrderContainer}>
                    <Loading model='modelArea' />
                    <Title fontSize="25px" model='model2' titleText={params.categoryName.toUpperCase()} />
                    <div className={styles.catalogOrder}>
                        <select className={styles.selectOrder} name='order' >
                            <option value={'created_at-DESC'}>Novidades</option>
                            <option value={'price-DESC'}>Maior Preço</option>
                            <option value={'price-ASC'}>Menor Preço</option>
                        </select>
                        <Button btnModel="model4" btnName="Aplicar" btnAction="submit" />
                    </div>
                </form>

                {catalog ? (
                    <Container title={{titleText:catalog.name,model:'model3',fontSize:'22px'}} justifyContent='space-between'>
                        {catalog.Items ? (
                            catalog.Items.map(item => (
                                <CardItem key={item.id} item={item} />
                            ))
                        ) : (
                            <></>
                        )}
                    </Container>
                ) : (
                    <></>
                )}
                <PagCountServer count={catalog.countItems!} perPage={10} />
            </div>
        </>
    )
}