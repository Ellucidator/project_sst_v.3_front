import { Categories } from "@/types/catalogTypes";
import styles from './styles.module.scss'
import Image from "next/image";
import { cookies } from "next/headers";
import CategoriesAndSubList from "../categories-sub-list";
import ButtonActionById from "../buttonActionById";
import userIcon from '../../../../../public/public/header/user-icon.svg'
import logoutIcon from '../../../../../public/public/header/box-arrow-left.svg'
import Button from "../../button";
import UserAddressPage from "@/components/pages/user/address";
import AddressUpdate from "@/components/pages/user/address/addAddress";
import { UserAddress } from "@/types/userTypes";

type Props = {
    catalog?: Categories[]
    cookieName?: 'modal' | 'modalUser' | 'modalAddress'
    user_name?: string
    adresses?: UserAddress[]
}

const ServerModal = async ({ catalog, cookieName = 'modal', user_name, adresses = [] }: Props) => {

    let classModal = cookieName
    const cookieControl = cookies().get(cookieName)?.value
    const addressOpt = cookies().get(cookieName + 'Option')?.value

    if (cookieControl === 'open') classModal += 'Open'

    const returnAction = async () => {
        'use server'
        cookies().delete(cookieName + 'Option')
    }
    const btnAction = async (name: string) => {
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
        <div>
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
                    <div className={styles[classModal]}>
                        {cookieControl === 'open' ?
                            <>
                                <form action={handlerSubmit} className={styles.btnModal}>
                                    <button type="submit" className={styles.btnModal} >X</button>
                                </form>

                                <CategoriesAndSubList categories={catalog!} />
                            </>
                            : <></>}
                    </div>
                </>
                : cookieName === 'modalUser' ?
                    <>
                        <ButtonActionById buttonAttribute={{
                            arrow: cookieControl === 'open' ? 'arrowUp' : 'arrowDown',
                            iconElem: { src: userIcon, position: 'left', width: 25 }, subTitle: '⇱', btnName: user_name!, btnModel: 'model9', btnAction: 'submit'
                        }} idAction={cookieName} actionFunction={btnAction} loading={false} />
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
                    </> :
                    <>
                        <ButtonActionById buttonAttribute={{ btnName: 'Mudar Endereço', btnModel: 'model2' }} idAction={cookieName} actionFunction={btnAction} loading={false} />
                        <div className={styles[classModal]}>
                            {cookieControl === 'open' ?
                                <>
                                    <div className={styles.divButtons}>
                                        {addressOpt?<ButtonActionById buttonAttribute={{ btnName: '< - return', btnModel: 'model7' }} idAction={cookieName} actionFunction={returnAction}/>:<></>}

                                        <ButtonActionById buttonAttribute={{ btnName: 'x', btnModel: 'model4' }} idAction={cookieName} actionFunction={btnAction} loading={false} />
                                    </div>

                                    {addressOpt ? <AddressUpdate addressId={addressOpt} btnBack={false} modal={true} /> : <UserAddressPage modal={true} userAddress={adresses} />}
                                </> : <></>}
                        </div>
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