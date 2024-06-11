import { Categories } from "@/types/catalogTypes";
import styles from './styles.module.scss'
import Image from "next/image";
import { cookies } from "next/headers";
import CategoriesAndSubList from "../categories-sub-list";
import ButtonActionById from "../buttonActionById";

type Props = {
    catalog?: Categories[]
    cookieName?: 'modal' | 'modal-user',
    user_name?:string
}

const ServerModal = async ({ catalog, cookieName = 'modal', user_name }: Props) => {
    let classModal = cookieName === 'modal' ? styles.modalBody : styles.modalBodyUser
    const cookieControl = cookies().get(cookieName)?.value
    if (cookieControl === 'open') classModal = cookieName === 'modal' ? styles.modalBodyOpen : styles.modalBodyUserOpen

    const btnAction = async(name: string) => {
        'use server'
        if (cookieControl === 'open') {
            cookies().set(name, 'close', {
                maxAge: 60 * 5
            })
        } else {
            cookies().set(name, 'open', {
                maxAge: 60 * 5
            })
        }
    }
    const handlerSubmit = async (form: FormData) => {
        'use server'

        await btnAction(cookieName)
    }

    return (
        <div className={styles.modal}>


            {cookieName === 'modal' ?
                <>
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

                                <CategoriesAndSubList categories={catalog!} />
                            </>
                            : <></>}
                    </div>
                </>
                :
                <>
                    <ButtonActionById buttonAttribute={{ arrow: 'arrowUp', subTitle: '⇱',btnName: user_name!, btnModel: 'model6', btnAction: 'submit' }} idAction={cookieName} actionFunction={btnAction} />
                    <div className={classModal}>
                        {classModal === styles.modalBodyUserOpen ?
                            <>

                            </>
                            : <></>}
                    </div>
                </>
            }
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