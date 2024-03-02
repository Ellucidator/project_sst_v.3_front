import { catalogService } from "@/services/catalogService";
import styles from './styles.module.scss'
import Link from "next/link";
import Modal from "../modal/Modal";
import Image from "next/image";
import searchIcon from "../../../public/public/header/search.svg"
import { cookieService } from "@/services/cookieService";


const HeaderPrimary = async () => {

        const validate = await cookieService.verifySession();
        console.log(validate)
        const catalog = await catalogService.getCatalog();
        
    return(
        <>
            <header id="header" className={`${styles.header} container flex justify-between items-center`}>
                    <div className={styles.headerLeft}>
                        <Modal catalog={catalog} />
                        <div className={styles.logoHeader}/>
                    </div>

                    <form className={styles.headerCenter}>
                        <input type="search" className={styles.inputSearch} placeholder="Pesquise por um produto"/>
                        <button type="submit" className={styles.btnSearch}>
                            <Image src={searchIcon} alt="search" className={styles.searchIcon} />
                        </button>
                    </form>

                    <div className={styles.headerRight}>

                    </div>
            </header>
        </>
    )
}


export default HeaderPrimary