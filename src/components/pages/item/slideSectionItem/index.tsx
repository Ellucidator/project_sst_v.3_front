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
    const quantImg = allItems.images?.key.length
    useEffect(() => {
        var main = new Splide('#mainSlide', {
            type: 'fade',
            rewind: true,
            heightRatio: 0.5,
            pagination: false,
            arrows: quantImg && quantImg > 1 ? true : false,
            focus: 'center',
            height: 650,
            breakpoints: {
                1350: {
                    height: 500
                },
                1050: {
                    height: 400
                },
                800: {
                    height: 500
                },
                600: {
                    height: 350
                },
                475: {
                    height: 250
                }
            }

        })
        var miniSlide = new Splide('#miniSlide', {
            rewind: true,
            fixedWidth: 130,
            isNavigation: true,
            // focus:'center',
            arrows: false,
            gap: 5,
            pagination: false,
            dragMinThreshold: {
                mouse: 4,
                touch: 10,
            },
            breakpoints: {
                1350: {
                    fixedWidth: 100
                },
                1050: {
                    fixedWidth: 80,
                }
            }

        })
        main.sync(miniSlide)
        main.mount()
        miniSlide.mount()

    }, [])

    return (
        <div className={styles.slideItem}>
            <section className='splide' id='mainSlide'>
                <div className="splide__track">
                    <ul className={`splide__list`}>
                        <li key={`img00`} className="splide__slide">
                            <Image
                                className={styles.itemImgs}
                                src={`http://localhost:3000/files/${allItems.thumbnail_url}`}
                                alt=''
                                width={600}
                                height={400}
                            />
                        </li>
                        {
                            allItems.images?.key.map((key, i) => {
                                return (
                                    <li key={`img${i}`} className="splide__slide">
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
            <section className={`splide`} id='miniSlide'>
                <div className={`splide__track ${styles.miniSlide}`}>
                    <ul className={`splide__list ${styles.ulMiniSlide}`}>
                        <li key={`img00`} className="splide__slide">
                            <Image
                                className={styles.itemImgsMini}
                                src={`http://localhost:3000/files/${allItems.thumbnail_url}`}
                                alt=''
                                width={110}
                                height={90}
                            />
                        </li>
                        {
                            allItems.images?.key.map((key, i) => {
                                return (
                                    <li key={`img${i}`} className="splide__slide">
                                        <Image
                                            className={styles.itemImgsMini}
                                            src={`http://localhost:3000/files/${key}`}
                                            alt=''
                                            width={118}
                                            height={118}
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