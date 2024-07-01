
import { authService } from '@/services/authService'
import styles from './page.module.scss'
import { Favorites, UserAddress} from '@/types/userTypes'
import UserHome from '@/components/pages/user/home'
import { userService } from '@/services/userService'
import UserAddressPage from '@/components/pages/user/address'
import UserPurchasesPage from '@/components/pages/user/purchases'
import FavoritesPage from '@/components/pages/user/favorites'
import { Purchases } from '@/types/purchaseTypes'
import UserInformation from '@/components/pages/user/information'
import { redirect } from 'next/navigation'


export default async function UserPage({params}:{params:{options:string}}) {
    const user = await authService.verifySession()

    if(!user)redirect('/')

    const [userAddress,userPurchases,purchases,newestFavorites] = await Promise.all([
        userService.getUserAdresses(),
        userService.getUserPurchases(1,1),
        userService.getUserPurchases(1,6),
        userService.getUserFavorites(1,4)
    ])

    

    return(
        <div className={styles.userInfo}>
            {
                params.options==='home'?<UserHome user={user} userPurchase={(userPurchases as Purchases).rows[0]} newestFavorites={newestFavorites as Favorites}/>:
                params.options==='my-info'?<UserInformation/>:
                params.options==='my-purchases'?<UserPurchasesPage purchases={purchases as Purchases}/>:
                params.options==='address'?<UserAddressPage userAddress={userAddress as UserAddress[]}/>:
                params.options==='favorites'?<FavoritesPage/>:
                <></>
                }
        </div>
    )
}