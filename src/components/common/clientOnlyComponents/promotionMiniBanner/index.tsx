'use client'
import Link from 'next/link'
import styles from './styles.module.scss'
import Image from 'next/image'


const PromotionMiniBanner = () => {
    const infoStorage = localStorage.getItem('promotionFeature')
    if(!infoStorage)return<></>

    const info:{id: string|number, thumbnail_url: string} = JSON.parse(infoStorage)

    return (
        <Link href={`/promotion/${info.id}`} key={info.id}
            id={`promotionBanner-${info.id}`} className={styles.promotionLink}>
            <Image src={`http://localhost:3000/files/${info.thumbnail_url}`} alt="banner"
                className={styles.promotionBanner} width={700} height={300} />
        </Link>
    )
}

export default PromotionMiniBanner