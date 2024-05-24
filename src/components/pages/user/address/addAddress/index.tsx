import ButtonReturn from '@/components/common/btnReturn'
import styles from './styles.module.scss'

type Props = {
    addressId: string
}

const AddressUpdate = async ({ addressId }: Props) => {
    let addressValue = {
        receiver_name: '',
        zip_code: undefined,
        state: '',
        city: '',
        neighborhood: '',
        street: '',
        house_number: undefined,
        complement: '',
        phone_number: undefined,
        reference_point: '',
    }


    return (
        <>  
            <ButtonReturn />
            <p className={styles.titleAddress}>Novo Endereço</p>
            
            <form className={styles.formAddress}>
                
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
                        defaultValue={addressValue.phone_number}
                    />
                </div>
                <div className={styles.divInput} >
                    <input type="number"
                        placeholder="CEP"
                        name="zip_code"
                        required className={`${styles.input} ${styles.inputZip}`}
                        defaultValue={addressValue.zip_code}
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
                    <input type="number"
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

                <button className={styles.btnSave} type="submit">SALVAR</button>
            </form>
        </>
    )
}


export default AddressUpdate