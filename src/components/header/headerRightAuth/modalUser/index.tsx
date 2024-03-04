'use client'
import ReactModal from "react-modal"
import styles from './styles.module.scss'
import { useEffect, useState } from "react"


const ModalUser = () => {
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
    return (
        <div>
            <span>
                <button onClick={handleClick} className={styles.btnHeader}>
                    teste
                </button>
            </span>
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