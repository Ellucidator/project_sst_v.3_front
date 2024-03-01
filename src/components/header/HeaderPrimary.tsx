import { catalogService } from "@/services/catalogService";
import styles from './styles.module.scss'
import Link from "next/link";
import Modal from "../modal/Modal";


const HeaderPrimary = async () => {
        const catalog = await catalogService.getCatalog();
        
    return(
        <>
            <header id="header" className={`${styles.header} container flex justify-between items-center`}>
                    <Modal catalog={catalog} />
            </header>
        </>
    )
}


export default HeaderPrimary