'use client'
import styles from './styles.module.scss'
import CardPurchase from '@/components/common/cardPurchase'
import PagCount from '@/components/common/pagCount'
import {Purchases } from '@/types/purchaseTypes'
import { useEffect, useState } from 'react'

type Props = {
    purchases: Purchases,
    tooken: string
}
const UserPurchasesPage = ({purchases,tooken}:Props) => {
    

    const [purchasesElements, setPurchasesElements] = useState<Purchases>(purchases)
    const [page, setPage] = useState(1)
    const getPurchases = async () => {
        if(!tooken)return

        const data = await fetch(`http://localhost:3000/user/show/purchases?page=${page}&perPage=${6}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': tooken
            },
            
            cache: 'no-store',
            next: {
                revalidate: 10,
                tags: ['purchases-user'],
            },
        })

        const dataJson = await data.json()

        setPurchasesElements(dataJson)
    }

    useEffect(()=>{
        getPurchases()
    },[page])


    return (
        <div className={styles.pageBody}>
            <p className={styles.userPurchaseTitle}>Seus Pedidos</p>

            <div className={styles.userPurchasesContainer}>
                {   purchasesElements.rows?
                    purchasesElements.rows.map((elem)=>{
                        return(
                            <CardPurchase key={elem.id} userPurchase={elem} />
                        )
                    }):
                    <></>
                }
            </div>
            <PagCount count={purchasesElements.count} page={page} setPage={setPage} perPage={6} />
        </div>
    )
}


export default UserPurchasesPage