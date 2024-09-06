import styles from './styles.module.scss'
import userIcon from '../../../../../../public/public/header/user-icon.svg'
import logoutIcon from '../../../../../../public/public/header/box-arrow-left.svg'
import Button from "../../../button";


type Props = {
    cookieControl: string
    user_name: string
    classModal: string
    btnAction: (name: string) => void
}

const ModalUserClient =  ({cookieControl, user_name, classModal, btnAction}: Props) => {

    return (
                    <>
                        <Button
                            btnOption={{onClick: () => btnAction('modalUser')}}
                            arrow={ cookieControl === 'open' ? 'arrowUp' : 'arrowDown'}
                            iconElem= {{ src: userIcon,srcR:'/public/common/arrow.svg', position: 'left&right', width: 25,widthR: 15 }} 
                            btnName={ user_name!} btnModel='model9'
                        />
                        <div className={styles[classModal]} id='modalUser'>
                            {cookieControl === 'open' ?
                                <>
                                    <Button href="/api/link/home" btnName="Minha Conta" btnAction="link" btnModel="model6" />
                                    <Button href="/api/link/my-info" btnName="Minhas Informações" btnAction="link" btnModel="model6" />
                                    <Button href="/api/link/my-purchases" btnName="Pedidos" btnAction="link" btnModel="model6" />
                                    <Button href="/api/link/address" btnName="Endereços" btnAction="link" btnModel="model6" />
                                    <Button href="/api/link/favorites" btnName="Favoritos" btnAction="link" btnModel="model6" />
                                    <Button btnName="Sair" btnAction="link" href='/api/logout' btnModel="model6" iconElem={{ src: logoutIcon, position: 'left', width: 22 }} />
                                </>
                                : 
                                <></>}
                        </div>
                    </> 
    )
}

export default ModalUserClient