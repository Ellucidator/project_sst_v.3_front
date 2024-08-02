import { UserInfo } from '@/types/userTypes'
import styles from './styles.module.scss'
import { userService } from '@/services/userService'
import Input from '@/components/common/Input-label-components/input&Label'
import Title from '@/components/common/texts/tiltle';
import Button from '@/components/common/button'
import Loading from '@/components/common/clientOnlyComponents/loading'




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

    infoValue = await userService.showUser().then(data => {
        data!.birth = data!.birth.substring(0, 10)
        return data!
    })

    const handlerSubmit = async (form: FormData) => {
        'use server'

        const newInfo: Omit<UserInfo, 'imgUrl' | 'id'> = {
            first_name: form.get('first_name')?.toString()!,
            last_name: form.get('last_name')?.toString()!,
            email: form.get('email')?.toString()!,
            phone: form.get('phone')?.toString()!,
            birth: form.get('birth')?.toString()!,
        }

        if (newInfo.first_name === infoValue.first_name &&
            newInfo.last_name === infoValue.last_name &&
            newInfo.email === infoValue.email &&
            newInfo.phone === infoValue.phone &&
            newInfo.birth === infoValue.birth
        ) return


        await userService.updatedUser(newInfo)

    }

    return (
        <>
            <Title width='100%' titleText='Minhas Informações' model='model5' fontSize='25px' />

            <form action={handlerSubmit} className={styles.formInformation}>
                <Loading model='modelArea' />
                <p>As informações serão atualizadas apos o proximo login.</p>
                <div className={styles.inputsContainer}>
                    <Input mode='label&input' divWidth='40%' labelText='Primeiro Nome:'
                        inputOptions={{ id: 'first_name', type: 'text', name: 'first_name', defaultValue: infoValue.first_name, required: true }} />

                    <Input mode='label&input' labelText='Sobrenome:'
                        inputOptions={{ id: 'last_name', type: 'text', name: 'last_name', defaultValue: infoValue.last_name, required: true }} />
                </div>
                <Input mode='label&input' labelText={'Email:'} divWidth='100%'
                    inputOptions={{ id: 'email', type: 'email', name: 'email', defaultValue: infoValue.email, required: true }} />

                <div className={styles.inputsContainer}>
                    <Input mode='label&input' labelText='Telefone:'
                        inputOptions={{ id: 'phone', type: 'text', name: 'phone', defaultValue: infoValue.phone, required: true }} />

                    <Input mode='label&input' labelText='Data de Nascimento:'
                        inputOptions={{ id: 'birth', type: 'date', name: 'birth', defaultValue: infoValue.birth, required: true }} />
                </div>

                <Button btnModel='model2' btnName='SALVAR' btnAction='submit' btnWidth='100%' />
            </form>
        </>
    )
}


export default UserInformation