import styles from './page.module.scss'
import { catalogService } from '@/services/catalogService'
import { cookieService } from '@/services/cookieService'
import TagsFilterServ from '@/components/common/tagsFilter/servTagsFilter'
import Title from '@/components/common/tiltle'
import Container from '@/components/common/container'
import CardItem from '@/components/common/cardItem'


export default async function Catalog({ params }: { params: { categoryName: string, subCategoryId: string } }) {
    const [catalog, tags] = await Promise.all([
        cookieService.getItensBySubCategoryServ(params.subCategoryId),
        catalogService.getTags(params.subCategoryId)
    ])

    return (

        <div className={styles.catalog}>
            <div className={`container ${styles.catalogContainer}`}>

                <div className={styles.catalogOptions}>
                    <TagsFilterServ tags={tags} subCategoryId={params.subCategoryId} />
                </div>

                <div className={styles.catalogCardContainer}>
                    <div className={styles.catalogOrder}>
                        <Title fontSize="25px" model='model2' titleText={params.categoryName.toUpperCase()} />
                        <select className={styles.selectOrder} >
                            <option value={'created_at-DESC'}>Novidades</option>
                            <option value={'price-DESC'}>Maior Preço</option>
                            <option value={'price-ASC'}>Menor Preço</option>
                        </select>
                    </div>

                    {catalog ? (
                        <Container titleModel='model3' title={catalog.name}>
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
                </div>
            </div>
        </div>
    )
}