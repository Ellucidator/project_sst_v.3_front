import styles from './styles.module.scss'
import userIcon from '../../../../../../public/public/header/user-icon.svg'
import logoutIcon from '../../../../../../public/public/header/box-arrow-left.svg'
import Button from "../../../button";
import { useRouter } from 'next/navigation';


type Props = {
    cookieControl: string
    user_name: string
    classModal: string
    btnAction: (ev: React.MouseEvent<HTMLButtonElement>, name: string) => Promise<void>
}

const ModalUserClient =  ({cookieControl, user_name, classModal, btnAction}: Props) => {
    const router = useRouter()
    const logout= () =>{
        router.push('/api/logout')
    } 

    return (
                    <>
                        <Button
                            btnOption={{onClick: async(ev) => btnAction(ev,'modalUser')}}
                            arrow={ cookieControl === 'open' ? 'arrowUp' : 'arrowDown'}
                            iconElem= {{ src: userIcon,srcR:'/public/common/arrow.svg', position: 'left&right', width: 25,widthR: 15 }} 
                            btnName={ user_name!} btnModel='model9'
                            btnAction='button'
                        />
                        <div className={styles[classModal]} id='modalUser'>
                            {cookieControl === 'open' ?
                                <>
                                    <Button href="/user/home" btnName="Minha Conta" btnAction="link" btnModel="model6" />
                                    <Button href="/user/my-info" btnName="Minhas Informações" btnAction="link" btnModel="model6" />
                                    <Button href="/user/my-purchases" btnName="Pedidos" btnAction="link" btnModel="model6" />
                                    <Button href="/user/address" btnName="Endereços" btnAction="link" btnModel="model6" />
                                    <Button href="/user/favorites" btnName="Favoritos" btnAction="link" btnModel="model6" />
                                    <Button
                                        btnOption={{onClick: logout}} 
                                        btnName="Sair" btnAction="button" btnModel="model6" iconElem={{ src: logoutIcon, position: 'left', width: 22 }} />
                                </>
                                : 
                                <></>}
                        </div>
                    </> 
    )
}

export default ModalUserClient