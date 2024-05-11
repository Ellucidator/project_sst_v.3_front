import { cookieService } from '@/services/cookieService'
import styles from './page.module.scss'
import { UserPayload } from '@/types/userTypes'
import { redirect } from 'next/navigation'


export default async function UserPage() {
    
    const user = await cookieService.verifySession()
    
    if(!user)redirect('/')
        

    return(
        <div className={styles.userInfo}>
            <p className={styles.userName}>Bem vindo {user.first_name}</p>
            <p className={styles.userEmail}>{user.email}</p>
        </div>
    )
}