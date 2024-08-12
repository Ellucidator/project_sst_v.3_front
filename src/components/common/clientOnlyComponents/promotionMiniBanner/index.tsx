'use client'
import Link from 'next/link'
import styles from './styles.module.scss'
import Image from 'next/image'
import { useEffect, useState } from 'react'

type Props = {
    apiUrl: string
}
const PromotionMiniBanner = ({ apiUrl }: Props) => {
    const [info, setInfo] = useState<{id: string|number, thumbnail_url: string} | null>(null)
    
    useEffect(() => {
        const infoStorage = localStorage.getItem('promotionFeature')
        if(infoStorage)setInfo(JSON.parse(infoStorage))
    },[])

    if(!info) return <></>
    return (
        <Link href={`/promotion/${info.id}`} key={info.id}
            id={`promotionBanner-${info.id}`} className={styles.promotionLink}>
            <Image src={apiUrl + `/files/${info.thumbnail_url}`} alt="banner"
                className={styles.promotionBanner} width={700} height={300} />
        </Link>
    )
}

export default PromotionMiniBanner