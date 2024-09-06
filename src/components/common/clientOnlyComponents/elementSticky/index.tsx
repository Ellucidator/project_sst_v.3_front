'use client'
import styles from './styles.module.scss'
import Link from "next/link"
import ClientModal from "../clientModal"
import Image from "next/image"
import { Categories } from '@/types/catalogTypes'
import { useEffect } from 'react'

type Props = {
    catalog: Categories[] | false
}
const ElementSticky = ({catalog}: Props) => {


    function onScroll() {
        const header = document.getElementById('header')!
        const elementSticky = document.getElementById('elementSticky')!

        const posicaoHeader = header.getBoundingClientRect().top;
        const posicaoViewport = window.innerHeight;


        if (posicaoHeader+posicaoViewport < 600) {
            elementSticky.className = styles.elementActive
        }else{
            elementSticky.className = styles.element
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', onScroll)
    })

    return (
        <div className={styles.element} id='elementSticky'>
            <ClientModal catalog={catalog} cookieName="modal" />
            <Link href="/" className={styles.logoHeader}>
                <Image src='/public/header/logoHeader.svg' alt="logo" className={styles.logo} width={250} height={95} />
            </Link>
        </div>
    )
}

export default ElementSticky