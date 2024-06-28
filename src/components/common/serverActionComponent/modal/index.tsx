import { Categories } from "@/types/catalogTypes";
import styles from './styles.module.scss'
import Image from "next/image";
import { cookies } from "next/headers";
import CategoriesAndSubList from "../categories-sub-list";
import ButtonActionById from "../buttonActionById";
import userIcon from '../../../../../public/public/header/user-icon.svg'
import logoutIcon from '../../../../../public/public/header/box-arrow-left.svg'
import Button from "../../button";

type Props = {
    catalog?: Categories[]
    cookieName?: 'modal' | 'modal-user'|'address-modal',
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
    const handlerLogout = async () => {
        'use server'
        cookies().delete('token')
        cookies().delete(cookieName)
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
                : cookieName === 'modal-user' ?
                <>
                    <ButtonActionById buttonAttribute={{ arrow:cookieControl === 'open'?'arrowUp':'arrowDown',
                        iconElem:{src:userIcon,position: 'left', width: 25}, subTitle: '⇱',btnName: user_name!, btnModel: 'model9', btnAction: 'submit' }} idAction={cookieName} actionFunction={btnAction} loading={false} />
                    <form action={handlerLogout} className={classModal}>
                        {cookieControl === 'open' ?
                            <>
                                <Button href="/user/home" btnName="Minha Conta" btnAction="link" btnModel="model6" />
                                <Button href="/user/my-info" btnName="Minhas Informações" btnAction="link" btnModel="model6" />
                                <Button href="/user/my-purchases" btnName="Pedidos" btnAction="link" btnModel="model6" />
                                <Button href="/user/address" btnName="Endereços" btnAction="link" btnModel="model6" />
                                <Button href="/user/favorites" btnName="Favoritos" btnAction="link" btnModel="model6" />
                                <Button btnName="Sair" btnAction="submit" btnModel="model6" iconElem={{ src: logoutIcon, position: 'left', width: 22 }} />
                            </>
                            : <></>}
                    </form>
                </>:
                <>
                    <ButtonActionById buttonAttribute={{btnName: 'Mudar Endereço', btnModel: 'model2'}} idAction={'address-modal'} actionFunction={btnAction} loading={false} />
                    <form action="" className={classModal}></form>
                </>
            }
            {cookieControl === 'open' ?
                <form action={handlerSubmit}>
                    <button type="submit" className={styles.overlayModal}></button>
                </form> :
                <></>
            }
        </div>
    )
}

export default ServerModal