import { UserPayload } from '@/types/userTypes'
import styles from './styles.module.scss'

type Props = {
    user:UserPayload
}
const UserHome = ({user}:Props) => {

    return (
        <>
            <p className={styles.userName}>Bem vindo {user.first_name}</p>
            <p className={styles.userEmail}>{user.email}</p>
        </>
    )
}


export default UserHome