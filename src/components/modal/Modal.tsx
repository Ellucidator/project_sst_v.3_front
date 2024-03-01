'use client'
import { Categories } from "@/types/catalogTypes";
import ReactModal from "react-modal"
import styles from './styles.module.scss'
import { MouseEvent, useState } from "react";

type Props = {
    catalog: Categories[]
}

const Modal = ({catalog}: Props) => {
    const [open, setOpen] = useState(false)
    const [test, setTest] = useState(()=>{
        return `${styles.btnSub}`
    })
    

    const handleClick = () => {
        setOpen(!open)
    }

    const subCategoryOpen = (ev:MouseEvent<HTMLButtonElement>) => {
        //@ts-ignore
        const subCategory = ev.target.parentNode.parentNode.children.subCategory

        if(subCategory.style.display === 'none'){
            subCategory.style.display = 'block'
            setTest(`${styles.btnSubTest}`)
        }else{
            subCategory.style.display = 'none'
            setTest(`${styles.btnSub}`)
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
            

            >
                <button onClick={handleClick} type="button" className={styles.btnModal} >X</button>
                {catalog.map((category) => (
                    <div key={category.id} className={styles.categories}>             
                            <h3  className={styles.categoryTittle}>
                                {category.name}
                                <button onClick={subCategoryOpen} className={`${test}`}>V</button>
                            </h3>
                            <ul id="subCategory" className={styles.subCategory}>
                            {category.SubCategories.map((subCategory) => (
                                <li key={subCategory.id} >
                                    {subCategory.name}
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