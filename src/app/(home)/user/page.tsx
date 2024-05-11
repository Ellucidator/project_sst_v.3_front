import { cookieService } from '@/services/cookieService'
import styles from './page.module.scss'


export default async function UserPage() {
    
    const user = await cookieService.verifySession()
    console.log(user)

    return(
        <div className={styles.pageBody}>
            <div className={styles.divOptions}></div>
            <div className={styles.divInfo}></div>
        </div>
    )
}