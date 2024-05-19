import { cookieService } from '@/services/cookieService'
import styles from './page.module.scss'
import { UserPayload } from '@/types/userTypes'
import { redirect } from 'next/navigation'
import UserHome from '@/components/pages/user/home'
import { userService } from '@/services/userService'
import UserAddressPage from '@/components/pages/user/address'
import UserPurchasesPage from '@/components/pages/user/purchases'
import FavoritesPage from '@/components/pages/user/favorites'


export default async function UserPage({params}:{params:{options:string}}) {
    
    const user = await cookieService.verifySession()
    if(!user)redirect('/')

    const [userAddress,userPurchases,purchases] = await Promise.all([
        userService.getUserAdresses(),
        userService.getUserPurchases(1,1),
        userService.getUserPurchases()

    ])

        

    return(
        <div className={styles.userInfo}>
            {
                params.options==='home'?<UserHome user={user} userPurchase={userPurchases.rows[0]}/>:
                params.options==='my-info'?<></>:
                params.options==='my-purchases'?<UserPurchasesPage purchases={purchases}/>:
                params.options==='address'?<UserAddressPage userAddress={userAddress}/>:
                params.options==='favorites'?<FavoritesPage/>:
                <></>
                }
        </div>
    )
}