import { catalogService } from "@/services/catalogService";
import styles from './styles.module.scss'
import Link from "next/link";


const HeaderPrimary = async () => {
        const catalog = await catalogService.getCatalog();
        
    return(
        <>
            <header className={`${styles.header} container flex justify-between items-center`}>
                    <button type="button" className={styles.btnHeader}>≡</button>
            </header>
        </>
    )
}


export default HeaderPrimary