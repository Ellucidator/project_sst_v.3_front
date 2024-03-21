'use client'
import { catalogService } from '@/services/catalogService';
import styles from './page.module.scss'
import { Categories } from '@/types/catalogTypes';
import { useEffect, useState } from 'react';

export default function Catalog(){
    const [catalog, setCatalog] = useState<Categories[]>([]);

    useEffect(() => {
        async function getCatalog() {
            const data = await catalogService.getCatalog();
            console.log(data)
            setCatalog(data);
        }

        getCatalog();
    }, [])

    
    
    
    

    return (
        <div className={styles.catalog}>

            <div className={`container ${styles.catalogContainer}`}>

                <div className={styles.catalogOptions}>
                    {catalog[0]?(
                        <p>{catalog[0].name}</p>
                    ):(
                        <></>
                    )}
                </div>

                <div className={styles.catalogCardContainer}>
                    <div className={styles.catalogOrder}>
                        <p>teste</p>
                    </div>
                    <div className={styles.cardsContainer} >
                        <p>teste</p>
                    </div>
                </div>

            </div>

        </div>
    )
}