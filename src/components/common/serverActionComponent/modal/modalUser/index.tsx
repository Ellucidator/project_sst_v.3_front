import styles from './styles.module.scss'
import { cookies } from "next/headers";
import ButtonActionById from "../../buttonActionById";
import userIcon from '../../../../../../public/public/header/user-icon.svg'
import logoutIcon from '../../../../../../public/public/header/box-arrow-left.svg'
import Button from "../../../button";


type Props = {
    cookieControl: string
    user_name: string
    classModal: string
    btnAction: (name: string) => void
}

const ModalUser = async ({cookieControl, user_name, classModal, btnAction}: Props) => {

    const handlerLogout = async () => {
        'use server'
        cookies().delete('token')
        cookies().delete('modalUser')
    }
    return (
                    <>
                        <ButtonActionById buttonAttribute={{
                            arrow: cookieControl === 'open' ? 'arrowUp' : 'arrowDown',
                            iconElem: { src: userIcon, position: 'left', width: 25 }, subTitle: '⇱', btnName: user_name!, btnModel: 'model9', btnAction: 'submit'
                        }} idAction={'modalUser'} actionFunction={btnAction} loading={false} />
                        <form action={handlerLogout} className={styles[classModal]}>
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
                    </> 
    )
}

export default ModalUser