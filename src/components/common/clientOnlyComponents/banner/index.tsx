'use client'
import { Promotion } from '@/types/promotionsTypes'
import styles from './styles.module.scss'
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

type Props = {
    promotions:Promotion[]
}

const Banner = ({ promotions }: Props) => {
    const [animation, setAnimation] = useState(true)

    async function animationC() {
        
            const random = Math.floor(Math.random() * promotions.length)
            document.getElementById(`promotionBanner-${promotions[random].id}`)!.style.animationPlayState = 'running'
            await new Promise((resolve) => setTimeout(resolve, 5000));
            document.getElementById(`promotionBanner-${promotions[random].id}`)!.style.animationPlayState = 'paused'
            await new Promise((resolve) => setTimeout(resolve, 10));

    }

    useEffect(() => {
            // animationC()
    }, [animation])

    const mouseHover = () => {
        setAnimation(false)
    }

    return (
        <section className={styles.promotion} >
            {promotions.map((promotion) => {
                return (
                    <Link href={`/promotion/${promotion.id}`} key={promotion.id} 
                        id={`promotionBanner-${promotion.id}`} className={styles.promotionLink}
                        onMouseEnter={ mouseHover}
                        >
                        <Image src={`http://localhost:3000/files/${promotion.thumbnail_url}`} alt="banner" className={styles.promotionBanner} width={700} height={550} />
                    </Link>
                )
            })}
        </section>
    )
}

export default Banner