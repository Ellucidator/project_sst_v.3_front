import { cookieService } from '@/services/cookieService'
import styles from './page.module.scss'
import { UserAddress, UserPayload } from '@/types/userTypes'
import { redirect } from 'next/navigation'
import UserHome from '@/components/pages/user/home'
import { userService } from '@/services/userService'
import UserAddressPage from '@/components/pages/user/address'
import UserPurchasesPage from '@/components/pages/user/purchases'
import FavoritesPage from '@/components/pages/user/favorites'
import { cookies } from 'next/headers'
import { Purchases } from '@/types/purchaseTypes'


export default async function UserPage({params}:{params:{options:string}}) {
    
    const tooken = cookies().get('token')?.value
    const user = await cookieService.verifySession()
    if(!user)redirect('/')

    const [userAddress,userPurchases,purchases] = await Promise.all([
        userService.getUserAdresses(),
        userService.getUserPurchases(1,1),
        userService.getUserPurchases(1,6)

    ])

    

    return(
        <div className={styles.userInfo}>
            {
                params.options==='home'?<UserHome user={user} userPurchase={(userPurchases as Purchases).rows[0]}/>:
                params.options==='my-info'?<></>:
                params.options==='my-purchases'?<UserPurchasesPage tooken={tooken!} purchases={purchases as Purchases}/>:
                params.options==='address'?<UserAddressPage userAddress={userAddress as UserAddress[]}/>:
                params.options==='favorites'?<FavoritesPage/>:
                <></>
                }
        </div>
    )
}