'use client'
import { catalogService } from '@/services/catalogService';
import styles from './page.module.scss'
import { ChangeEvent, useEffect, useState } from 'react';
import CardItem from '@/components/common/cardItem';
import { SubCategories } from '@/types/catalogTypes';
// import CategoryFilter from '@/components/common/categoryFilter';

export default function Catalog({ params }: { params: { id: string[] } }) {
    const [catalog, setCatalog] = useState<SubCategories>();
    const [itemsOrder, setItemsOrder] = useState('created_at-DESC')

    console.log(itemsOrder)

    useEffect(() => {
        async function getCatalog() {
            if (!params.id[1]) {
                const data: SubCategories = await catalogService.getItensByCategory(params.id[0], itemsOrder);
                console.log(data)
                setCatalog(data);
            } else {
                const data: SubCategories = await catalogService.getItensBySubCategory(params.id[1], itemsOrder);
                console.log(data)

                setCatalog(data);
            }

        }

        getCatalog();
    }, [itemsOrder, params.id]);



    const orderChange = (ev: ChangeEvent<HTMLSelectElement>) => {
        setItemsOrder(ev.currentTarget.value)
    }



    return (
        <div className={styles.catalog}>

            <div className={`container ${styles.catalogContainer}`}>

                <div className={styles.catalogOptions}>
                    {/* {catalog[0]?(
                        // <CategoryFilter catalog={catalog} />
                    ):(
                        <></>
                    )} */}
                </div>

                <div className={styles.catalogCardContainer}>
                    <div className={styles.catalogOrder}>
                        {catalog?(
                            params.id[1]?<p className={styles.catalogTitle}>{catalog.category_name?.toUpperCase()}</p>:
                            <p className={styles.catalogTitle}>{catalog.name.toUpperCase()}</p>
                        ):<><p></p></>}
                        
                        <select onChange={orderChange} className={styles.selectOrder} >
                            <option value={'created_at-DESC'}>Novidades</option>
                            <option value={'price-ASC'}>Maior Preço</option>
                            <option value={'price-DESC'}>Menor Preço</option>
                        </select>
                    </div>
                    <div className={styles.cardsContainer} >
                        {catalog ? (
                            <>
                                {params.id[1] ? (
                                    <p className={styles.subCatalogTitle}>{catalog.name}</p>
                                ) : <></>}

                                <div className={styles.cards}>
                                    {catalog.Items ? (
                                        catalog.Items.map(item => (
                                            <CardItem key={item.id} item={item} />
                                        ))
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            </>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>

            </div>

        </div>
    )
}