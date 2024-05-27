import { UserInfo } from '@/types/userTypes'
import styles from './styles.module.scss'
import { userService } from '@/services/userService'
import Input from '@/components/common/Input-label-components/input&Label'




const UserInformation = async () => {
    let infoValue: UserInfo = {
        id: 0,
        first_name: '',
        last_name: '',
        email: '',
        imgUrl: '',
        phone: '',
        birth: '',
    }

    infoValue = await userService.showUser().then(data => data!)
    console.log(infoValue)

    const handlerSubmit = async (form: FormData) => {
        'use server'



    }

    return (
        <>
            <p className={styles.title}>Minhas Informações</p>

            <form action={handlerSubmit} className={styles.formInformation}>
                <div className={styles.inputsContainer}>
                    <Input mode='label&input' divWidth='55%' labelText={'Primeiro Nome:'}
                        labelOptions={{ htmlFor: 'first_name' }}
                        inputOptions={{ id: 'first_name', type: 'text', name: 'first_name', defaultValue: infoValue.first_name }} />

                    <Input mode='label&input' divWidth='40%' labelText={'Sobrenome:'}
                        labelOptions={{ htmlFor: 'last_name' }}
                        inputOptions={{ id: 'last_name', type: 'text', name: 'last_name', defaultValue: infoValue.last_name }} />
                </div>

                <div className={styles.inputsContainer}>
                    <Input mode='label&input' divWidth='60%' labelText={'Email:'}
                        labelOptions={{ htmlFor: 'email' }}
                        inputOptions={{ id: 'email', type: 'email', name: 'email', defaultValue: infoValue.email }} />

                    <Input mode='label&input' divWidth='35%' labelText={'Telefone:'}
                        labelOptions={{ htmlFor: 'phone' }}
                        inputOptions={{ id: 'phone', type: 'text', name: 'phone', defaultValue: infoValue.phone }} />
                </div>

                <Input mode='label&input' labelText={'Data de Nascimento:'} 
                    labelOptions={{ htmlFor: 'birth' }}
                    inputOptions={{ id: 'birth', type: 'date', name: 'birth', defaultValue: infoValue.birth.substring(0, 10) }} />

                <button className={styles.btnSave} type="submit">SALVAR</button>
            </form>
        </>
    )
}


export default UserInformation