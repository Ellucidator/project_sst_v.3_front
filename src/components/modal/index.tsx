'use client'
import { Categories } from "@/types/catalogTypes";
import ReactModal from "react-modal"
import styles from './styles.module.scss'
import { MouseEvent, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import HeaderRightAuth from "../header/headerRightAuth";
import HeaderRightGeneric from "../header/headerRightGeneric";

type Props = {
    catalog: Categories[]
    validate: any
}

const Modal = ({ catalog, validate }: Props) => {

    const [element, setElement] = useState<HTMLElement>()
    useEffect(() => {
        const elementClient: HTMLElement = document.getElementById('header')!
        setElement(elementClient)
    }, [])
    const [open, setOpen] = useState(false)
    const [styleModal, setStyleModal] = useState(styles.modal)
    const handleClick = () => {

        setOpen(!open)

        setTimeout(() => {
            if (open) {
                setStyleModal(styles.modal);
            } else {
                setStyleModal(styles.modalOpen);
            }
        }, 0.1);

    }



    const subCategoryOpen = (ev: MouseEvent<HTMLButtonElement>, category: Categories) => {
        const button = ev.currentTarget

        const subCategory = document.getElementById(`${category.name}-${category.id}`)
        if (subCategory?.className === styles.subCategoryList) {
            subCategory.className = styles.subCategoryOpen
            button.className = styles.btnSubActive
        } else {
            subCategory!.className = styles.subCategoryList
            button.className = styles.btnSub
        }
    }

    return (
        <>
            <button onClick={handleClick} type="button" className={styles.btnHeader}>
                <p className="flex gap-2 border-b-2">
                    Catalogo
                    <Image src="/public/header/shop.svg" alt="catalog" className={styles.icon} width={20} height={20} />
                </p>
                <p className="flex gap-2">
                    Serviços
                    <Image src="/public/header/pc-display.svg" alt="services" className={styles.icon} width={20} height={20} />
                </p>
            </button>
            <ReactModal
                isOpen={open}
                shouldCloseOnEsc={true}
                className={styleModal}
                overlayClassName={styles.overlayModal}
                appElement={element}
                shouldCloseOnOverlayClick={true}
                onRequestClose={handleClick}
            >
                <button onClick={handleClick} type="button" className={styles.btnModal} >X</button>
                {/* <div className={styles.headerRight}>
                    <div className={styles.linkHeader}>
                    </div>
                    {validate ? <HeaderRightAuth payload={validate} /> : <HeaderRightGeneric />}
                </div> */}

                {catalog.map((category) => (
                    <div key={category.id} className={styles.categories}>
                        <div className="flex">
                            <Link href={`/`}>
                                <h3 className={styles.categoryTittle}>
                                    {category.name}
                                </h3>
                            </Link>
                            <button onClick={(ev) => subCategoryOpen(ev, category)} className={`${styles.btnSub}`}>⇱</button>
                        </div>
                        <ul key={`${category.id}`} id={`${category.name}-${category.id}`} className={styles.subCategoryList}>
                            {category.SubCategories.map((subCategory) => (
                                <li key={subCategory.id} className={styles.subCategory} >
                                    <Link href={`/`}>
                                        {subCategory.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                ))}

            </ReactModal>
        </>
    )
}

export default Modal