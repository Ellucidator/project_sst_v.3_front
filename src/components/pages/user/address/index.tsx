import { UserAddress } from '@/types/userTypes'
import styles from './styles.module.scss'
import Title from '@/components/common/texts/tiltle';
import Button from '@/components/common/button'
import { CardAddress } from '@/components/common/cards/cardAddress';
import ButtonActionById from '@/components/common/serverActionComponent/buttonActionById';
import { cookies } from 'next/headers';

type Props = {
    userAddress: UserAddress[] | false,
    modal?: boolean
}
const UserAddressPage = async ({ userAddress, modal = false }: Props) => {


    const activeAddress =userAddress? userAddress.find(address => address.active === true):undefined
    
    const modalAction = async (id: string) => {
        'use server'
        cookies().set('modalAddressOption', id, {
            maxAge: 0
        })
    }

    return (
        <>
            <div className={styles.divAddress}>
                <Title width='100%' fontSize="25px" model='model5' titleText="Endereços" />

                {!userAddress || userAddress && userAddress.length < 6 ?
                    (
                        <>
                            {!modal ?
                                <Button href="/user/edit-address/0" btnModel='model2' btnAction='link' btnName='Adicionar Endereço' /> :
                                <ButtonActionById buttonAttribute={{ btnName: 'Adicionar Endereço', btnModel: 'model2' }} idAction={0} actionFunction={modalAction} />}
                        </>

                    )
                    : <></>
                }
                {userAddress ?
                    <div className={styles.divAddressList}>
                        {
                            activeAddress ?
                                <CardAddress address={activeAddress} buttons btnModal={modal}/>
                                : <></>
                        }
                        {
                            userAddress.map((address) => {
                                if (address.id === activeAddress?.id) return
                                return (
                                    <CardAddress key={address.id} address={address} buttons btnModal={modal} />
                                )
                            })
                        }
                    </div>
                    : <></>}

            </div>
        </>
    )
}


export default UserAddressPage