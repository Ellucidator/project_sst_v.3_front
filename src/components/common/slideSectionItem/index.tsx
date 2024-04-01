'use client'

import Splide from '@splidejs/splide';
import styles from './styles.module.scss'
import '@splidejs/react-splide/css';
import { ItemFull } from '@/types/itemsTypes';
import Image from 'next/image';
import { useEffect } from 'react';

type Props = {
    allItems: ItemFull
}
const SlideSectionItem = ({ allItems }: Props) => {

    useEffect(() => {
        var main = new Splide('#mainSlide', {
            type: 'fade',
            heightRatio: 0.5,
            pagination: false,
            arrows: false,
            focus: 'center',
            height:500

        })
        var miniSlide = new Splide('#miniSlide', {
            rewind: true,
            fixedWidth: 110,
            fixedHeight: 90,
            isNavigation: true,
            gap: 5,
            focus: 'center',
            pagination: false,
            dragMinThreshold: {
                mouse: 4,
                touch: 10,
            },
            breakpoints: {
                640: {
                    fixedWidth: 66,
                    fixedHeight: 60,
                },
            },
        })
        main.sync(miniSlide)
        main.mount()
        miniSlide.mount()

    }, [])

    return (
        <div>
            <section className='splide' id='mainSlide'>
                <div className="splide__track">
                    <ul className="splide__list">
                        {
                            allItems.images?.key.map((key) => {
                                return (
                                    <li className="splide__slide">
                                        <Image
                                            className={styles.itemImgs}
                                            src={`http://localhost:3000/files/${key}`}
                                            alt=''
                                            width={600}
                                            height={400}
                                        />
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </section>
            <section className='splide' id='miniSlide'>
                <div className="splide__track">
                    <ul className="splide__list">
                        {
                            allItems.images?.key.map((key) => {
                                return (
                                    <li className="splide__slide">
                                        <Image
                                            className={styles.itemImgs}
                                            src={`http://localhost:3000/files/${key}`}
                                            alt=''
                                            width={110}
                                            height={90}
                                        />
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </section>
        </div>
    )
}

export default SlideSectionItem