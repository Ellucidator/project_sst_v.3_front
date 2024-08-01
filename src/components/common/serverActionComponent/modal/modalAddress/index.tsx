import styles from './styles.module.scss'
import ButtonActionById from "../../buttonActionById";
import { UserAddress } from '@/types/userTypes';
import AddressUpdate from '@/components/pages/user/address/addAddress';
import UserAddressPage from '@/components/pages/user/address';
import { cookies } from 'next/headers';


type Props = {
    cookieControl: string
    adresses: UserAddress[]
    classModal: string
    btnAction: (name: string) => void
}

const ModalAddress = async ({ cookieControl, adresses = [], classModal, btnAction }: Props) => {

    const addressOpt = cookies().get('modalAddress' + 'Option')?.value
    const returnAction = async () => {
        'use server'
        cookies().delete('modalAddress' + 'Option')
    }

    return (
        <>
            <ButtonActionById 
                buttonAttribute={{ btnName: 'Mudar Endereço', btnModel: 'model2' }} 
                idAction={'modalAddress'} actionFunction={btnAction} loading={false} />
            <div className={styles[classModal]}>
                {cookieControl === 'open' ?
                    <>
                        <div className={styles.divButtons}>
                            {addressOpt ? <ButtonActionById buttonAttribute={{ btnName: '< - return', btnModel: 'model7' }} idAction={'modalAddress'} actionFunction={returnAction} /> : <></>}

                            <ButtonActionById buttonAttribute={{ btnName: 'x', btnModel: 'model4' }} idAction={'modalAddress'} actionFunction={btnAction} loading={false} />
                        </div>

                        {addressOpt ? <AddressUpdate addressId={addressOpt} btnBack={false} modal={true} /> : <UserAddressPage modal={true} userAddress={adresses} />}
                    </> : <></>}
            </div>
        </>
    )
}

export default ModalAddress