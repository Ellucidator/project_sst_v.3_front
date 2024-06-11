import Link from "next/link"
import styles from './styles.module.scss'
import ModalUser from "./modalUser"
import { UserPayload } from "@/types/userTypes"
import ServerModal from "@/components/common/serverTestComponent/modal"

type Props = {
    payload: UserPayload
}
const HeaderRightAuth = ({payload}: Props) => {

    return(
        <div id="userModal">
            <Link className={styles.headerAuth} href="/" >
                <ModalUser payload={payload}/>
            </Link>
        </div>
    )
}

export default HeaderRightAuth