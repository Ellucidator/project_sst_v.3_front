import { cookieService } from '@/services/cookieService'
import styles from './page.module.scss'
import { UserPayload } from '@/types/userTypes'
import { redirect } from 'next/navigation'
import UserHome from '@/components/pages/user/home'
import { userService } from '@/services/userService'
import UserAddressPage from '@/components/pages/user/address'


export default async function UserPage({params}:{params:{options:string}}) {
    
    const user = await cookieService.verifySession()
    const userAddress = await userService.getUserAdresses()
    const userPurchases = await userService.getUserPurchases()
    console.log(userPurchases[0])

    if(!user)redirect('/')
        

    return(
        <div className={styles.userInfo}>
            {
                params.options==='home'?<UserHome user={user} userPurchase={userPurchases[0]}/>:
                params.options==='my-info'?<></>:
                params.options==='my-purchases'?<></>:
                params.options==='address'?<UserAddressPage userAddress={userAddress}/>:
                params.options==='favorites'?<></>:
                <></>
                }
        </div>
    )
}