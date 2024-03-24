'use client'
import ReactModal from "react-modal"
import styles from './styles.module.scss'
import Link from "next/link";
import { useEffect, useState } from "react";
import { Item } from "@/types/itemsTypes";
import Image from "next/image";
import CardItem from "../../cardItem";
import CardItemSearch from "./cardItemSearch";


type Props = {
    items:Item[]
}

const SearchModal = ({items}: Props) => {

    const [element, setElement] = useState<HTMLElement>()
    useEffect(() => {
        const elementClient: HTMLElement = document.getElementById('search')!
        setElement(elementClient)
    }, [])
    const [open, setOpen] = useState(false)
    useEffect(() => {
        if(items.length === 0) setOpen(false)
        else {
            setOpen(true)
        }
    },[items])
    const handleClick = () => {
        setOpen(!open)

    }




    return (
        <>
            <ReactModal
                isOpen={open}
                shouldCloseOnEsc={true}
                className={styles.modal}
                overlayClassName={styles.overlayModal}
                appElement={element}
                shouldCloseOnOverlayClick={true}
                onRequestClose={handleClick}
                shouldFocusAfterRender={false}
            >

                <div>
                    {items.map((item) => {
                        return (
                            <CardItemSearch key={item.id} item={item} />
                        )
                    })}
                </div>

            </ReactModal>
        </>
    )
}

export default SearchModal