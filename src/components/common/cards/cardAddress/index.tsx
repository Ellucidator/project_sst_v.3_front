import { UserAddress } from '@/types/userTypes'
import styles from './styles.module.scss'
import Button from '../../button'
import ButtonActionById from '../../serverActionComponent/buttonActionById'
import { userService } from '@/services/userService'
import Title from '../../texts/tiltle'
import { cookies } from 'next/headers'

type Props = {
    address: UserAddress
    buttons?: boolean
    btnModal?: boolean
}
export const CardAddress = ({ address, buttons, btnModal }: Props) => {

    const modalAction = async(id:string)=>{
        'use server'
        cookies().set('modalAddressOption', id, {
            maxAge: 0
        })
    }

    return (
        <div className={styles.cardAddress}>

            <div className={styles.divInfo}>
                {address.active ? <Title  model='model5' width='100%' titleText='Endereço Ativo'/>: <></>}

                <p>{`Destinatario: ${address.receiver_name}`}</p>
                <p>{`${address.street} - ${address.neighborhood} - nº${address.house_number}`}</p>
                <p>{`${address.complement ? address.complement : ''} - ${address.reference_point ? address.reference_point : ''}`}</p>
                <p>{`${address.city}, ${address.state}, ${address.zip_code}`}</p>
                <p>{`Telefone: ${address.phone_number.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2 $3-$4')}`}</p>
            </div>
            {buttons?<div className={styles.divButtons}>
                {address.active ? <></> : <ButtonActionById buttonAttribute={{ btnName: 'ATIVAR', btnModel: 'model3' }} idAction={address.id!} actionFunction={userService.activeUserAddress} />}
                { !btnModal ?
                    <Button href={`/user/edit-address/${address.id}`} btnModel='model3' btnAction='link' btnName='EDITAR' />:
                    <ButtonActionById buttonAttribute={{ btnName: 'EDITAR', btnModel: 'model3' }} idAction={address.id!} actionFunction={modalAction}/>
                    }
                <ButtonActionById buttonAttribute={{ btnName: 'EXCLUIR', btnModel: 'model3' }} idAction={address.id!} actionFunction={userService.deleteUserAddress} />
            </div>:<></>}
        </div>
    )
}