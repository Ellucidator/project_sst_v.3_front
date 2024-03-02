'use client'
import { Categories } from "@/types/catalogTypes";
import ReactModal from "react-modal"
import styles from './styles.module.scss'
import { MouseEvent, useEffect, useState } from "react";
import Link from "next/link";

type Props = {
    catalog: Categories[]
}

const Modal = ({ catalog }: Props) => {
    
    const [element, setElement] = useState<HTMLElement>()
    useEffect(() => {
        const elementClient: HTMLElement = document.getElementById('header')!
        setElement(elementClient)
    },[])
    const [open, setOpen] = useState(false)
    const handleClick = () => {
        setOpen(!open)
    }


    
    const subCategoryOpen = (ev: MouseEvent<HTMLButtonElement>, category: Categories) => {
        const button = ev.currentTarget
        console.log(button)

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
            <button onClick={handleClick} type="button" className={styles.btnHeader}>≡</button>
            <ReactModal
                isOpen={open}
                shouldCloseOnEsc={true}
                className={styles.modal}
                overlayClassName={styles.overlayModal}
                appElement={element}
            >
                <button onClick={handleClick} type="button" className={styles.btnModal} >X</button>
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