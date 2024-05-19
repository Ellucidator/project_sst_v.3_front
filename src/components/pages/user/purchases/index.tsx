'use client'
import styles from './styles.module.scss'
import CardPurchase from '@/components/common/cardPurchase'
import PagCount from '@/components/common/pagCount'
import {Purchases } from '@/types/purchaseTypes'
import { useEffect, useState } from 'react'

type Props = {
    purchases: Purchases
}
const UserPurchasesPage = ({purchases}:Props) => {

    const [purchasesElements, setPurchasesElements] = useState<Purchases>(purchases)
    const [page, setPage] = useState(1)

    const getPurchases = async () => {
        const data = await fetch(`http://localhost:3000/user/show/purchases?page=${page}&perPage=${10}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbmRyYWRlZmoxM0Bob3RtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJNYXJjZWxvIiwiaW1nVXJsIjpudWxsLCJpYXQiOjE3MTYxMzk3ODYsImV4cCI6MTcxNjE2ODU4Nn0.vQdyCRqFGas7KMnI9L2_jWOT5Ez-I2I4-eXGPm0NjrM`
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
                {
                    purchasesElements.rows.map((elem)=>{
                        return(
                            <CardPurchase key={elem.id} userPurchase={elem} />
                        )
                    })
                }
            </div>
            <PagCount count={7} page={page} setPage={setPage} perPage={6} />
        </div>
    )
}


export default UserPurchasesPage