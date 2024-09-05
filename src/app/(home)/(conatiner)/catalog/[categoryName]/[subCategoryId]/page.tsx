import styles from './page.module.scss'
import { catalogService } from '@/services/catalogService'
import PagCountServer from '@/components/common/serverActionComponent/pagCount'
import { cookies } from 'next/headers'
import TagsFilterServ from '@/components/pages/catalog/servTagsFilter';
import ScrollToTop from '@/components/common/clientOnlyComponents/scrollToTop';
import SelectOrder from '@/components/common/serverActionComponent/selectOrder';
import Title from '@/components/common/texts/tiltle'
import ServerModal from '@/components/common/serverActionComponent/modal'
import ProductContainer from '@/components/common/productContainer'


export default async function Catalog({ params }: { params: { categoryName: string, subCategoryId: string } }) {
    const [catalog, tags] = await Promise.all([
        catalogService.getItensBySubCategory(params.subCategoryId),
        catalogService.getTags(params.subCategoryId)
    ])

    let filters: string[] = []
    const catalogCookie = cookies().get(`catalog${params.subCategoryId}`)?.value
    if (catalogCookie) {
        filters = JSON.parse(catalogCookie).tags

    }
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
                <TagsFilterServ filters={filters} tags={tags} subCategoryId={params.subCategoryId} />
            </div>

            <div className={styles.catalogCardContainer}>
                <div className={styles.select}>
                    <Title fontSize="25px" model='model2' titleText={decodeURIComponent(params.categoryName).toUpperCase()} />
                    <p className={styles.filters}>{`${filters.join(', ')}`}</p>
                    <div className={styles.responsiveFilters} >
                        <ServerModal cookieName='modalFilters' tags={tags} filters={filters} subCategoryId={params.subCategoryId} />
                    </div>
                    <SelectOrder type='order' formFunction={actionSelect} />

                </div>


                {catalog ? (
                    <>
                        <ProductContainer
                            products={catalog.Items} 
                            containerAttributes={{
                                title:{ titleText: catalog.name, model: 'model3', fontSize: '22px' },
                                justifyContent:'center'
                            }}
                        />
                        <PagCountServer count={catalog.countItems!} perPage={10} />

                    </>
                ) : (
                    <></>
                )}

            </div>
        </>
    )
}