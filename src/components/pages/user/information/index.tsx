import { UserInfo } from '@/types/userTypes'
import styles from './styles.module.scss'
import { userService } from '@/services/userService'




const UserInformation = async () => {
    let infoValue:UserInfo = {
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
            <p className={styles.titleAddress}>Minhas Informações</p>
            
            <form action={handlerSubmit} className={styles.formAddress}>
                


                <button className={styles.btnSave} type="submit">SALVAR</button>
            </form>
        </>
    )
}


export default UserInformation