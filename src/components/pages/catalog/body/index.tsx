'use client'
import { catalogService } from '@/services/catalogService';
import styles from './styles.module.scss'
import { ChangeEvent, useEffect, useState } from 'react';
import CardItem from '@/components/common/cardItem';
import { SubCategories } from '@/types/catalogTypes';
// import CategoryFilter from '@/components/common/categoryFilter';

type Props = {
    catalogServ: SubCategories;
    categoryName: string
}
const CatalogBody = ({catalogServ, categoryName}:Props)=> {
    const [catalog, setCatalog] = useState<SubCategories>(catalogServ);
    const [itemsOrder, setItemsOrder] = useState('created_at-DESC')


    const orderChange = (ev: ChangeEvent<HTMLSelectElement>) => {
        setItemsOrder(ev.currentTarget.value)
    }
    const getCatalog = async () => {
        const data: SubCategories = await catalogService.getItensBySubCategory(catalogServ.id.toString(), itemsOrder);
        setCatalog(data);
    }

    useEffect(()=>{
        getCatalog()
    },[orderChange])



    return (

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
                    
                    <p className={styles.catalogTitle}>{categoryName.toUpperCase()}</p>

                    <select onChange={orderChange} className={styles.selectOrder} >
                        <option value={'created_at-DESC'}>Novidades</option>
                        <option value={'price-ASC'}>Maior Preço</option>
                        <option value={'price-DESC'}>Menor Preço</option>
                    </select>
                </div>
                <div className={styles.cardsContainer} >
                    {catalog ? (
                        <>
                            <p className={styles.subCatalogTitle}>{catalog.name}</p>
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
    )
}

export default CatalogBody