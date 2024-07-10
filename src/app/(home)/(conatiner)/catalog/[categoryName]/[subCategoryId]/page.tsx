import styles from './page.module.scss'
import { catalogService } from '@/services/catalogService'
import Container from '@/components/common/container'
import CardItem from '@/components/common/cards/cardItem'
import PagCountServer from '@/components/common/serverActionComponent/pagCount'
import { cookies } from 'next/headers'
import TagsFilterServ from '@/components/pages/catalog/servTagsFilter';
import ScrollToTop from '@/components/common/clientOnlyComponents/scrollToTop';
import SelectOrder from '@/components/common/serverActionComponent/selectOrder';


export default async function Catalog({ params }: { params: { categoryName: string, subCategoryId: string } }) {
    const [catalog, tags] = await Promise.all([
        catalogService.getItensBySubCategory(params.subCategoryId),
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

                <SelectOrder title={params.categoryName} type='order' formFunction={actionSelect} />

                {catalog ? (
                    <Container title={{titleText:catalog.name,model:'model3',fontSize:'22px'}} 
                        justifyContent={catalog.Items!.length>3?'space-between':''}>

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