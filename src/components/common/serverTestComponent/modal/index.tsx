import { Categories } from "@/types/catalogTypes";
import styles from './styles.module.scss'
import Link from "next/link";
import Image from "next/image";
import { cookies } from "next/headers";
import CategoriesAndSubList from "../categories-sub-list";

type Props = {
    catalog: Categories[]
}

const ServerModal = async ({ catalog }: Props) => {
    let classModal = styles.modalBody
    const cookieControl = cookies().get('modal')?.value
    if (cookieControl === 'open') classModal = styles.modalBodyOpen


    const handlerSubmit = async (form: FormData) => {
        'use server'

        if (cookieControl === 'open') {
            cookies().set('modal', 'close', {
                maxAge: 60*5
            })
        } else {
            cookies().set('modal', 'open', {
                maxAge: 60*5
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

            <div className={classModal}>
                {classModal === styles.modalBodyOpen ?
                    <>
                        <form action={handlerSubmit} className={styles.btnModal}>
                            <button type="submit" className={styles.btnModal} >X</button>
                        </form>

                        <CategoriesAndSubList categories={catalog} />
                    </>
                    : <></>}
            </div>

            {classModal === styles.modalBodyOpen ?
                <form action={handlerSubmit}>
                    <button type="submit" className={styles.overlayModal}></button>
                </form> :
                <></>
            }
        </div>
    )
}

export default ServerModal