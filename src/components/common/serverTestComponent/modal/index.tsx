import { Categories } from "@/types/catalogTypes";
import styles from './styles.module.scss'
import Image from "next/image";
import { cookies } from "next/headers";
import CategoriesAndSubList from "../categories-sub-list";

type Props = {
    catalog?: Categories[]
    cookieName?: 'modal' | 'modal-user'
}

const ServerModal = async ({ catalog, cookieName = 'modal' }: Props) => {
    let classModal = cookieName === 'modal' ? styles.modalBody : styles.modalBodyUser
    const cookieControl = cookies().get(cookieName)?.value
    if (cookieControl === 'open') classModal = cookieName === 'modal' ? styles.modalBodyOpen : styles.modalBodyUserOpen


    const handlerSubmit = async (form: FormData) => {
        'use server'

        if (cookieControl === 'open') {
            cookies().set(cookieName, 'close', {
                maxAge: 60 * 5
            })
        } else {
            cookies().set(cookieName, 'open', {
                maxAge: 60 * 5
            })
        }
    }

    return (
        <div className={styles.modal}>
            <form action={handlerSubmit}>
                <button type="submit" className={styles.btnHeader}>
                    <p className="flex gap-2 border-b-2">
                        Catalogo
                        <Image src="/public/header/shop.svg" alt="catalog" className={styles.icon} width={20} height={20} />
                    </p>
                    <p className="flex gap-2">
                        Serviços
                        <Image src="/public/header/pc-display.svg" alt="services" className={styles.icon} width={20} height={20} />
                    </p>
                </button>
            </form>

            {cookieName === 'modal' ?
                <div className={classModal}>
                    {classModal === styles.modalBodyOpen ?
                        <>
                            <form action={handlerSubmit} className={styles.btnModal}>
                                <button type="submit" className={styles.btnModal} >X</button>
                            </form>

                            <CategoriesAndSubList categories={catalog!} />
                        </>
                        : <></>}
                </div>
                :
                <div className={classModal}>
                    {classModal === styles.modalBodyUserOpen ?
                        <>
                            
                        </>
                        : <></>}
                </div>}
            {classModal === styles.modalBodyOpen || classModal === styles.modalBodyUserOpen ?
                <form action={handlerSubmit}>
                    <button type="submit" className={styles.overlayModal}></button>
                </form> :
                <></>
            }
        </div>
    )
}

export default ServerModal