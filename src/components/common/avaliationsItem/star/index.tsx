'use client'
import { useState } from 'react'
import styles from './styles.module.scss'
import Image from 'next/image'


const Stars = () => {
    const [starChecked, setStarChecked] = useState(0)
    const [clicked, setClicked] = useState(false)
    const stars = [1, 2, 3, 4, 5]
    return (
        <div className={styles.stars}>
            <ul className={styles.listStars}>
                {
                    stars.map((star) => {
                        return (
                            <li
                                value={star}
                                key={star}
                                onMouseOver={() => !clicked ? setStarChecked(star) : null}
                                onClick={() => {
                                    setStarChecked(star)
                                    starChecked !== star ? null : setClicked(!clicked)
                                }}
                            >
                                <Image
                                    className={starChecked >= star ? styles.starOn : styles.starOff}

                                    src='/public/common/star.svg' alt="star" width={20} height={20} />
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Stars