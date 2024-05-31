import ButtonReturn from '@/components/common/btnReturn'
import styles from './styles.module.scss'
import { userService } from '@/services/userService'
import { UserAddress } from '@/types/userTypes'
import { revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'
import Title from '@/components/common/tiltle'
import Button from '@/components/common/button'

type Props = {
    addressId: string
}

const AddressUpdate = async ({ addressId }: Props) => {
    let addressValue: UserAddress = {
        id: 0,
        receiver_name: '',
        zip_code: 0,
        state: '',
        city: '',
        neighborhood: '',
        street: '',
        house_number: '',
        complement: '',
        phone_number: '',
        reference_point: '',
        active: false
    }

    if (addressId !=='0') {
        addressValue = await userService.getUserAddessById(addressId).then(res => res!)
    }

    const handlerSubmit = async (form: FormData) => {
        'use server'
        const newAddress ={
            id: parseInt(addressId),
            receiver_name: form.get('receiver_name')?.toString()!,
            zip_code: parseInt(form.get('zip_code')?.toString()!),
            state: form.get('state')?.toString()!,
            city: form.get('city')?.toString()!,
            neighborhood: form.get('neighborhood')?.toString()!,
            street: form.get('street')?.toString()!,
            house_number: form.get('house_number')?.toString()!,
            complement: form.get('complement')?.toString(),
            phone_number: form.get('phone_number')?.toString()!,
            reference_point: form.get('reference_point')?.toString(),
            active: false
        }

        await userService.createAddress(newAddress)
        revalidateTag('adresses-user')
        redirect('/user/address')
    }

    return (
        <>  
            <ButtonReturn />
            <Title fontSize="25px" model='model5' titleText="Novo endereço" />
            
            <form action={handlerSubmit} className={styles.formAddress}>
                
                <div className={styles.divInput}>
                    <input type="text"
                        placeholder="Nome"
                        name="receiver_name"
                        required className={`${styles.input} ${styles.inputName}`}
                        defaultValue={addressValue.receiver_name}
                    />
                    <input type="number"
                        placeholder="DDD+Número"
                        name="phone_number"
                        required className={`${styles.input} ${styles.inputPhone}`}
                        defaultValue={parseInt(addressValue.phone_number)}
                    />
                </div>
                <div className={styles.divInput} >
                    <input type="number"
                        placeholder="CEP"
                        name="zip_code"
                        required className={`${styles.input} ${styles.inputZip}`}
                        defaultValue={addressValue.zip_code?addressValue.zip_code:''}
                    />
                    <input type="text"
                        placeholder="Estado"
                        name="state"
                        required className={`${styles.input} ${styles.inputP}`}
                        defaultValue={addressValue.state}
                    />
                    <input type="text"
                        placeholder="Cidade"
                        name="city"
                        required className={`${styles.input} ${styles.inputCity}`}
                        defaultValue={addressValue.city}
                    />
                </div>
                <div className={styles.divInput}>
                    <input type="text"
                        placeholder="Rua"
                        name="street"
                        required className={`${styles.input} ${styles.inputStreet}`}
                        defaultValue={addressValue.street}
                    />
                    <input type="text"
                        placeholder="Nº"
                        name="house_number"
                        required className={`${styles.input} ${styles.inputP}`}
                        defaultValue={addressValue.house_number}
                    />
                    <input type="text"
                        placeholder="Bairro"
                        name="neighborhood"
                        required className={`${styles.input} ${styles.inputNeighborhood}`}
                        defaultValue={addressValue.neighborhood}
                    />
                </div>
                <div className={styles.divInput}>
                    <input type="text"
                        placeholder="Complemento"
                        name="complement"
                        className={`${styles.input} ${styles.inputComplement}`}
                        defaultValue={addressValue.complement}
                    />
                    <input type="text"
                        placeholder="Ponto de Referência"
                        name="reference_point"
                        className={`${styles.input} ${styles.inputReference}`}
                        defaultValue={addressValue.reference_point}
                    />
                </div>

                <Button btnModel='model2' btnName='SALVAR' btnAction='submit' btnWidth='100%'/>
            </form>
        </>
    )
}


export default AddressUpdate