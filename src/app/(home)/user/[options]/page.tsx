import { authService } from '@/services/authService'
import styles from './page.module.scss'
import UserHome from '@/components/pages/user/home'
import { userService } from '@/services/userService'
import UserAddressPage from '@/components/pages/user/address'
import UserPurchasesPage from '@/components/pages/user/purchases'
import FavoritesPage from '@/components/pages/user/favorites'
import UserInformation from '@/components/pages/user/information'
import { redirect } from 'next/navigation'
import { revalidateTag } from 'next/cache'
import { Purchase } from '@/types/purchaseTypes'


export default async function UserPage({params}:{params:{options:string}}) {

    if(params.options === 'pay'){
        revalidateTag('purchases-user')
        revalidateTag('one-item')
        redirect('/user/home')
    }

    const user = await authService.verifySession()

    if(!user)redirect('/')

    const [userAddress,purchases,newestFavorites] = await Promise.all([
        userService.getUserAdresses(),
        userService.getUserPurchases(6),
        userService.getUserFavorites(4)
    ])
    const lastPurchase= purchases? purchases.rows.find((elem) => elem) : false
    return(
        <div className={styles.userInfo}>
            {
                params.options==='home'?<UserHome user={user} userPurchase={lastPurchase as Purchase|false} newestFavorites={newestFavorites}/>:
                params.options==='my-info'?<UserInformation/>:
                params.options==='my-purchases'?<UserPurchasesPage purchases={purchases}/>:
                params.options==='address'?<UserAddressPage userAddress={userAddress}/>:
                params.options==='favorites'?<FavoritesPage/>:
                <></>
                }
        </div>
    )
}