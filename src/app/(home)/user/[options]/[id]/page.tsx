
import AddressUpdate from '@/components/pages/user/address/addAddress'

import PurchasePage from '@/components/pages/user/purchases/purchase'



export default async function UserPagePurchase({ params }: { params: { id: string, options: string } }) {


    return (
        <>
            {params.options === 'purchase' ?
                <PurchasePage purchaseId={params.id} /> :
            params.options === 'edit-address' ? <AddressUpdate addressId={params.id} /> :
                <></>
            }
        </>
    )
}