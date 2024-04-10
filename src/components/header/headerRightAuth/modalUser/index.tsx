'use client'
import ReactModal from "react-modal"
import styles from './styles.module.scss'
import { useEffect, useState } from "react"
import Image from "next/image"
import { UserPayload } from "@/types/userTypes"

type Props = {
    payload: UserPayload
}
const ModalUser = ({payload}: Props) => {

    console.log(payload)

    const [element, setElement] = useState<HTMLElement>()
    useEffect(() => {
        const elementClient: HTMLElement = document.getElementById('userModal')!
        setElement(elementClient)
    }, [])

    const [iconSetaClass, setIconSetaClass] = useState(() => styles.iconSeta)
    const [open, setOpen] = useState(false)
    const [styleModal, setStyleModal] = useState(styles.modal)
    const handleClick = () => {

        setOpen(!open)

        setTimeout(() => {
            if (open) {
                setStyleModal(styles.modal);
                setIconSetaClass(styles.iconSeta)
            } else {
                setStyleModal(styles.modalOpen);
                setIconSetaClass(styles.iconSetaOpen)
            }
        }, 0.1);
        
    }
    return (
        <div>
            <div className={styles.divUser}  onClick={handleClick}>
                <div  className={styles.username}>
                    <Image src='/public/header/user-icon.svg' alt="user" className={styles.userIcon} width={30} height={30} />
                    {payload.first_name}
                </div>
                <p className={iconSetaClass}>
                    ⇱
                </p>
            </div>
            <ReactModal
                isOpen={open}
                className={styleModal}
                overlayClassName={styles.overlayModal}
                appElement={element}
                shouldCloseOnEsc={true}
                shouldCloseOnOverlayClick={true}
                onRequestClose={handleClick}
            >
                <p>teste</p>
            </ReactModal>
        </div>
    )
}

export default ModalUser