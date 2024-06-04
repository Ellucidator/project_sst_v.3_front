import CatalogBody from '@/components/pages/catalog/body'
import styles from './page.module.scss'
import { catalogService } from '@/services/catalogService'


export default async function Catalog({ params }: { params: { categoryName: string, subCategoryId: string } }) {
    
    const [catalog, tags] = await Promise.all([
        catalogService.getItensBySubCategory(params.subCategoryId),
        catalogService.getTags(params.subCategoryId)
    ])

    return (
        
        <div className={styles.catalog}>
            <CatalogBody categoryName={params.categoryName} catalogServ={catalog} tagsServ={tags}/>
        </div>
    )
}