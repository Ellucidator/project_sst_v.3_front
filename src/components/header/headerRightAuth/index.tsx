import Link from "next/link"
import styles from './styles.module.scss'
import ModalUser from "./modalUser"

const HeaderRightAuth = () => {

    return(
        <div>
            <Link className={styles.headerAuth} href="/" >
                <ModalUser/>
            </Link>
        </div>
    )
}

export default HeaderRightAuth