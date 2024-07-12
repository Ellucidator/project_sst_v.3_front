import { Promotion } from '@/types/promotionsTypes'
import styles from './styles.module.scss'
import Image from "next/image"
import Link from "next/link"

type Props = {
    promotions:Promotion[]
}

const Banner = ({ promotions }: Props) => {


    return (
        <section className={styles.promotion} >
            {promotions.map((promotion) => {
                return (
                    <Link href={`/promotion/${promotion.id}`} key={promotion.id} 
                        id={`promotionBanner-${promotion.id}`} className={styles.promotionLink}>
                        <Image src={`http://localhost:3000/files/${promotion.thumbnail_url}`} alt="banner" className={styles.promotionBanner} width={700} height={550} />
                    </Link>
                )
            })}
        </section>
    )
}

export default Banner