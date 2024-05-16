import { UserAddress } from '@/types/userTypes'
import styles from './styles.module.scss'

type Props = {
    userAddress:UserAddress[]
}
const UserAddressPage = ({userAddress}:Props) => {
    const activeAddress = userAddress.find(address => address.active === true)


    return (
        <>
            <div>
                <p>Endereço atual</p>
                {userAddress.map((address) => (
                    <form action=''>
                        <input type="radio" name={`active-${address.id}`} id={`active-${address.id}`} checked={address.active} />
                        <p>{address.street}</p>
                        <button>Selecionar</button>
                    </form>
                ))}
            </div>
        </>
    )
}


export default UserAddressPage