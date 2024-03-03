import Link from "next/link"
import styles from './styles.module.scss'

const HeaderRightGeneric = () => {

    return(
        <div className="flex items-center">
            <Link className={styles.linkHeader} href="/login">
                <button type="button">ENTRAR</button>
            </Link>
            <p className={styles.division}>|</p>
            <Link className={styles.linkHeader} href="/register">
                <button type="button">CADASTRO</button>
            </Link>
        </div>
    )
}

export default HeaderRightGeneric