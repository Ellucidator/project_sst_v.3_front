import { cookieService } from '@/services/cookieService'
import styles from './page.module.scss'
import { UserPayload } from '@/types/userTypes'
import { redirect } from 'next/navigation'
import UserHome from '@/components/pages/user/home'


export default async function UserPage({params}:{params:{options:string}}) {
    
    const user = await cookieService.verifySession()
    if(!user)redirect('/')
        

    return(
        <div className={styles.userInfo}>
            {
                params.options==='home'?<UserHome user={user}/>:
                params.options==='my-info'?<></>:
                params.options==='my-purchases'?<></>:
                params.options==='address'?<></>:
                params.options==='favorites'?<></>:
                <></>
                }
        </div>
    )
}