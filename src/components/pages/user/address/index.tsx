import { UserAddress } from '@/types/userTypes'
import styles from './styles.module.scss'
import { userService } from '@/services/userService'
import ButtonActionById from '../../../common/serverTestComponent/buttonActionById'
import Link from 'next/link'

type Props = {
    userAddress: UserAddress[]
}
const UserAddressPage = async({ userAddress }: Props) => {
    const activeAddress = userAddress.find(address => address.active === true)
    

    return (
        <>
            <div className={styles.divAddress}>
                <p className={styles.divAddressTitle}>Seus Endereços</p>
                <Link href="/user/edit-address/0" className={styles.linkAdd}>Adicionar Endereço</Link>
                <div className={styles.divAddressList}>
                    {
                        activeAddress ?
                            <div className={styles.divAddressItem}>
                                <p className={styles.divAddressActive}>Endereço Ativo</p>

                                <p>{`Destinatario: ${activeAddress.receiver_name}`}</p>
                                <p>{`${activeAddress.street} - ${activeAddress.neighborhood} - nº${activeAddress.house_number}`}</p>
                                <p>{`${activeAddress.complement} - ${activeAddress.reference_point}`}</p>
                                <p>{`${activeAddress.city}, ${activeAddress.state}, ${activeAddress.zip_code}`}</p>
                                <p>{`Telefone: ${activeAddress.phone_number.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2 $3-$4')}`}</p>
                            </div>
                            : <></>
                    }
                    {
                        userAddress.map((address) => {
                            if(address.id === activeAddress?.id) return
                            return (
                                <div key={address.id} className={styles.divAddressItem}>
                                    <div >
                                        <p>{`Destinatario: ${address.receiver_name}`}</p>
                                        <p>{`${address.street} - ${address.neighborhood} - nº${address.house_number}`}</p>
                                        <p>{`${address.complement} - ${address.reference_point}`}</p>
                                        <p>{`${address.city}, ${address.state}, ${address.zip_code}`}</p>
                                        <p>{`Telefone: ${address.phone_number.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2 $3-$4')}`}</p>
                                    </div>
                                    <div className={styles.divButtons}>
                                        <ButtonActionById buttonName='ATIVAR' idAction={address.id!} actionFunction={userService.activeUserAddress} />
                                        <Link href={`/user/edit-address/${address.id}`} className={styles.btnEdit}>EDITAR</Link>
                                        <ButtonActionById buttonName='EXCLUIR' idAction={address.id!} actionFunction={userService.deleteUserAddress} />
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