import styles from './page.module.scss'
import Image from 'next/image'
import { catalogService } from '@/services/catalogService'
import PagCountServer from '@/components/common/serverActionComponent/pagCount'
import SelectOrder from '@/components/common/serverActionComponent/selectOrder'
import { cookies } from 'next/headers'
import Title from '@/components/common/texts/tiltle'
import { redirect } from 'next/navigation'
import ProductContainer from '@/components/common/productContainer'


export default async function PromotionPage({ params }: { params: { id: string } }) {

    const promotion = await catalogService.getPromotionById(params.id)
    const subCategories = await catalogService.getSubCategories()
    
    if (!promotion) return redirect('/')


    let subId: string = ''
    const promCookie = cookies().get(`promotion${params.id}`)?.value
    if (promCookie) subId = JSON.parse(promCookie).subCategoryId


    const actionSelect = async (form: FormData) => {
        'use server'
        const order = form.get('order')?.toString()!
        const subCategoryId = form.get('subCategoryId')?.toString()!

        const catalogCookie = cookies().get(`promotion${params.id}`)?.value

        if (catalogCookie) {
            const catalogCookieOn: { itemsOrder?: string, subCategoryId?: string } = JSON.parse(catalogCookie)

            catalogCookieOn.itemsOrder = order
            catalogCookieOn.subCategoryId = subCategoryId

            cookies().set(`promotion${params.id}`, JSON.stringify(catalogCookieOn),
                {
                    maxAge: 60 * 60
                })
        } else {
            cookies().set(`promotion${params.id}`, JSON.stringify({ itemsOrder: order, subCategoryId: subCategoryId }),
                {
                    maxAge: 60 * 60
                })
        }
    }

    return (
        <div className={styles.pageContainer}>
            <Image className={styles.pageBanner} src={process.env.API_HOST+`/files/${promotion.thumbnail_url}`} alt={'promotion'} width={1100} height={550} />
            <div className={styles.titleAndSelects}>
                <Title titleText={promotion.name} model='model3' fontSize='25px' />
                <SelectOrder subAc={subId} formFunction={actionSelect} type='order&subCategoryId' subCategories={subCategories} />
            </div>
            <ProductContainer products={promotion.Items}
                containerAttributes={{ justifyContent: 'center' }}
            />
            <PagCountServer count={promotion.countItems || 0} perPage={12} />
        </div>
    )
}