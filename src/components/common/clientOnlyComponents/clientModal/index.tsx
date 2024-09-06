'use client'
import { Categories } from "@/types/catalogTypes";
import styles from './styles.module.scss'
import Image from "next/image";
import { useState } from "react";
import CategoriesAndSubListClient from "./categories-sub-list";
import ModalUserClient from "./modalUser";

type Props = {
    catalog?: Categories[] | false
    cookieName?: 'modal' | 'modalUser' | 'modalAddress' | 'modalFilters'
    user_name?: string
}

const ClientModal =  ({ catalog, cookieName = 'modal', user_name }: Props) => {

    const [cookieControl, setCookieControl] = useState('close')
    const [classModal, setClassModal] = useState<string>(cookieName)
    
    const btnAction = async (name: string) => {

        if (cookieControl === 'close') {
            setClassModal(`${cookieName}Open`)
            setCookieControl('open')
        } else {
            setClassModal(cookieName)
            setCookieControl('close')
        }
    }

    return (
        <div>
            {cookieName === 'modal' ?
                <>

                    <button onClick={() => btnAction(cookieName)} type="submit" className={styles.btnHeader}>
                        <p className="flex gap-2 border-b-2">
                            Catalogo
                            <Image src="/public/header/shop.svg" alt="catalog" className={styles.icon} width={20} height={20} />
                        </p>
                        <p className="flex gap-2">
                            Serviços
                            <Image src="/public/header/pc-display.svg" alt="services" className={styles.icon} width={20} height={20} />
                        </p>
                    </button>

                    <div className={styles[classModal]} id={cookieName}>
                        {cookieControl === 'open' ?
                            <>
                                
                                    <button onClick={() => btnAction(cookieName)} type="button" className={styles.btnModal} >X</button>
                                <CategoriesAndSubListClient categories={catalog!} />
                            </>
                            : <></>}
                    </div>
                </>
                : cookieName === 'modalUser' ?
                    <ModalUserClient cookieControl={cookieControl} user_name={user_name!} classModal={classModal} btnAction={btnAction} /> 
                : 
                    <></>

            }
            {cookieControl === 'open' ?
                <button onClick={() => btnAction(cookieName)} type="button" className={styles.overlayModal}></button>
                :
                <></>
            }
        </div>
    )
}

export default ClientModal

