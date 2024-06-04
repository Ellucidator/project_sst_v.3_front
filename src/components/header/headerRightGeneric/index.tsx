import Link from "next/link"
import styles from './styles.module.scss'
import variables from '../../../styles/colors/colors.module.scss'
const HeaderRightGeneric = async() => {
    
    return(
        <div className="flex items-center">
            <Link className={styles.linkHeader} href="/form/login">
                <button type="button">ENTRAR</button>
            </Link>
            <p className={styles.division}>|</p>
            <Link className={styles.linkHeader} href="/form/register">
                <button type="button">CADASTRAR</button>
            </Link>
        </div>
    )
}

export default HeaderRightGeneric