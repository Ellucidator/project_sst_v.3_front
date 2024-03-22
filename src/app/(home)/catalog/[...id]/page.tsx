'use client'
import { catalogService } from '@/services/catalogService';
import styles from './page.module.scss'
import { useEffect, useState } from 'react';
import { Item } from '@/types/itemsTypes';
import CardItem from '@/components/common/cardItem';
// import CategoryFilter from '@/components/common/categoryFilter';

export default function Catalog({ params }: { params: { id: string[] } }) {
    const [catalog, setCatalog] = useState<Item[]>([]);

    useEffect(() => {
        async function getCatalog() {
            const data: Item[] = await catalogService.getItensBySubCategory(params.id[1]);
            console.log(data)
            setCatalog(data);
        }

        getCatalog();
    }, [])






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
                        <p>teste</p>
                    </div>
                    <div className={styles.cardsContainer} >
                        <div className={styles.cards}>
                            {catalog[0] ? (
                                catalog.map(item => (
                                    <CardItem key={item.id} item={item} />
                                ))
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}