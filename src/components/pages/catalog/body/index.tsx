'use client'
import { catalogService } from '@/services/catalogService';
import styles from './styles.module.scss'
import { ChangeEvent, useEffect, useState } from 'react';
import CardItem from '@/components/common/cardItem';
import { SubCategories } from '@/types/catalogTypes';
import PagCount from '@/components/common/pagCount';
import { Tag } from '@/types/tagTypes';
import TagsFilter from '@/components/common/tagsFilter';
import Title from '@/components/common/tiltle';
import Container from '@/components/common/container';
// import CategoryFilter from '@/components/common/categoryFilter';

type Props = {
    catalogServ: SubCategories;
    categoryName: string;
    tagsServ: Tag[]
}
const CatalogBody = ({ catalogServ, categoryName, tagsServ }: Props) => {
    const [catalog, setCatalog] = useState<SubCategories>(catalogServ);
    const [itemsOrder, setItemsOrder] = useState('created_at-DESC')
    const [page, setPage] = useState(1)
    const [filter, setfilter] = useState<string[]>([])
    const orderChange = (ev: ChangeEvent<HTMLSelectElement>) => {
        setItemsOrder(ev.currentTarget.value)
    }
    const getCatalog = async () => {
        if (filter.length > 0) {
            const data: SubCategories = await catalogService.getItensByTags(catalogServ.id.toString(), itemsOrder, page, filter);
            setCatalog(data);
        } else {
            const data: SubCategories = await catalogService.getItensBySubCategory(catalogServ.id.toString(), itemsOrder, page);
            setCatalog(data);
        }

    }

    useEffect(() => {
        getCatalog()
    }, [itemsOrder, page, filter])



    return (

        <div className={`container ${styles.catalogContainer}`}>

            <div className={styles.catalogOptions}>
                <TagsFilter tags={tagsServ} setFilter={setfilter} />
            </div>

            <div className={styles.catalogCardContainer}>
                <div className={styles.catalogOrder}>
                    <Title fontSize="25px" model='model2' titleText={categoryName.toUpperCase()} />
                    <select onChange={orderChange} className={styles.selectOrder} >
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
                <PagCount count={catalog.countItems!} page={page} setPage={setPage} perPage={10} />
            </div>
        </div>
    )
}

export default CatalogBody