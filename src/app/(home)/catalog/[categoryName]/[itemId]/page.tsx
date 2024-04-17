import CatalogBody from '@/components/pages/catalog/body'
import styles from './page.module.scss'
import { catalogService } from '@/services/catalogService'


export default async function Catalog({ params }: { params: { categoryName: string, itemId: string } }) {
    
    const catalog = await catalogService.getItensBySubCategory(params.itemId)
    console.log(catalog.countItems)

    return (
        
        <div className={styles.catalog}>
            <CatalogBody categoryName={params.categoryName} catalogServ={catalog}/>
        </div>
    )
}