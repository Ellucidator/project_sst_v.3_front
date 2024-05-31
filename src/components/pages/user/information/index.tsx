import { UserInfo } from '@/types/userTypes'
import styles from './styles.module.scss'
import { userService } from '@/services/userService'
import Input from '@/components/common/Input-label-components/input&Label'
import Title from '@/components/common/tiltle'
import Button from '@/components/common/button'




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

        const newInfo: Omit<UserInfo,'imgUrl'|'id'> = {
            first_name: form.get('first_name')?.toString()!,
            last_name: form.get('last_name')?.toString()!,
            email: form.get('email')?.toString()!,
            phone: form.get('phone')?.toString()!,
            birth: form.get('birth')?.toString()!,
        }

        await userService.updatedUser(newInfo)

    }

    return (
        <>
            <Title titleText='Minhas Informações' model='model5' fontSize='25px' />

            <form action={handlerSubmit} className={styles.formInformation}>
                <div className={styles.inputsContainer}>
                    <Input mode='label&input' divWidth='40%' labelText={'Primeiro Nome:'}
                        labelOptions={{ htmlFor: 'first_name' }}
                        inputOptions={{ id: 'first_name', type: 'text', name: 'first_name', defaultValue: infoValue.first_name, required: true }} />

                    <Input mode='label&input' labelText={'Sobrenome:'}
                        labelOptions={{ htmlFor: 'last_name' }}
                        inputOptions={{ id: 'last_name', type: 'text', name: 'last_name', defaultValue: infoValue.last_name, required: true }} />
                </div>
                <Input mode='label&input' labelText={'Email:'} divWidth='100%'
                    labelOptions={{ htmlFor: 'email' }}
                    inputOptions={{ id: 'email', type: 'email', name: 'email', defaultValue: infoValue.email, required: true }} />

                <div className={styles.inputsContainer}>
                    <Input mode='label&input' labelText={'Telefone:'}
                        labelOptions={{ htmlFor: 'phone' }}
                        inputOptions={{ id: 'phone', type: 'text', name: 'phone', defaultValue: infoValue.phone, required: true }} />

                    <Input mode='label&input' labelText={'Data de Nascimento:'} 
                        labelOptions={{ htmlFor: 'birth' }}
                        inputOptions={{ id: 'birth', type: 'date', name: 'birth', defaultValue: infoValue.birth.substring(0, 10), required: true }} />
                </div>

                <Button btnModel='model2' btnName='SALVAR' btnAction='submit' btnWidth='100%'/>
            </form>
        </>
    )
}


export default UserInformation