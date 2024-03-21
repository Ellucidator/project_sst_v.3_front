'use client'
import { catalogService } from '@/services/catalogService';
import styles from './page.module.scss'
import { Categories } from '@/types/catalogTypes';
import { useEffect } from 'react';

export default function Catalog(){
    

    useEffect(() => {
        catalogService.getCatalog()
    }, [])


    
    
    

    return (
        <div className={styles.catalog}>

            <div className={`container ${styles.catalogContainer}`}>

                <div className={styles.catalogOptions}>
                    <p>Filtros</p>
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