import { UserAddress } from '@/types/userTypes'
import styles from './styles.module.scss'
import Title from '@/components/common/texts/tiltle';
import Button from '@/components/common/button'
import { CardAddress } from '@/components/common/cards/cardAddress';

type Props = {
    userAddress: UserAddress[]
}
const UserAddressPage = async ({ userAddress }: Props) => {
    const activeAddress = userAddress.find(address => address.active === true)


    return (
        <>
            <div className={styles.divAddress}>
                <Title width='100%' fontSize="25px" model='model5' titleText="Endereços" />

                {userAddress.length < 6 ?
                    <Button href="/user/edit-address/0" btnModel='model2' btnAction='link' btnName='Adicionar Endereço' /> :
                    <></>
                }
                <div className={styles.divAddressList}>
                    {
                        activeAddress ?
                            <CardAddress address={activeAddress} buttons />

                            : <></>
                    }
                    {
                        userAddress.map((address) => {
                            if (address.id === activeAddress?.id) return
                            return (
                                <CardAddress address={address} buttons />
                            )
                        })
                    }
                </div>

            </div>
        </>
    )
}


export default UserAddressPage