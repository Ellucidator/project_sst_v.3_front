import { UserAddress } from '@/types/userTypes'
import styles from './styles.module.scss'
import { userService } from '@/services/userService'
import { revalidateTag } from 'next/cache'
import ButtonActionById from './buttonActionById'

type Props = {
    userAddress: UserAddress[]
}
const UserAddressPage = async({ userAddress }: Props) => {
    const activeAddress = userAddress.find(address => address.active === true)

    const handlerSubmitDelete = async(form: FormData)=>{
        'use server'
        const id = form.get('id') as string
        await userService.deleteUserAddress(id)
    }

    return (
        <>
            <div className={styles.divAddress}>
                <div className={styles.divAddressActive}>
                    <p>Endereço Ativo</p>
                    {
                        activeAddress ?
                            <div className={styles.divAddressInfo}>
                                <p>{`Destinatario: ${activeAddress.receiver_name}`}</p>
                                <p>{`${activeAddress.street} - ${activeAddress.neighborhood} - nº${activeAddress.house_number}`}</p>
                                <p>{`${activeAddress.complement} - ${activeAddress.reference_point}`}</p>
                                <p>{`${activeAddress.city}, ${activeAddress.state}, ${activeAddress.zip_code}`}</p>
                                <p>{`Telefone: ${activeAddress.phone_number.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2 $3-$4')}`}</p>
                            </div>
                            : <></>
                    }
                </div>
                <div className={styles.divAddressList}>
                    {
                        userAddress.map((address) => {

                            return (
                                <div key={address.id}>
                                    <div className={styles.divAddressInfo}>
                                        <p>{`Destinatario: ${address.receiver_name}`}</p>
                                        <p>{`${address.street} - ${address.neighborhood} - nº${address.house_number}`}</p>
                                        <p>{`${address.complement} - ${address.reference_point}`}</p>
                                        <p>{`${address.city}, ${address.state}, ${address.zip_code}`}</p>
                                        <p>{`Telefone: ${address.phone_number.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2 $3-$4')}`}</p>
                                    </div>
                                    <div>
                                        <ButtonActionById buttonName='EXCLUIR' idAction={address.id} actionFunction={userService.deleteUserAddress} />
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}


export default UserAddressPage