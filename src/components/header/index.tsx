import { catalogService } from "@/services/catalogService";
import styles from './styles.module.scss'
import Link from "next/link";
import Modal from "../modal";
import Image from "next/image";
import searchIcon from "../../../public/public/header/search.svg"
import { cookieService } from "@/services/cookieService";
import HeaderRightAuth from "./headerRightAuth";
import HeaderRightGeneric from "./headerRightGeneric";
import { UserPayload } from "@/types/userTypes";
import InputSearch from "../common/inputSearch";


const HeaderPrimary = async () => {

    const validate = await cookieService.verifySession();

    const catalog = await catalogService.getCatalog();

    return (
        <>
            <div id="header" className={`${styles.header}`}>
                <main className={`container ${styles.headerContainer}`}>
                    <div className={styles.headerDiv1}>
                        <Modal catalog={catalog} validate={validate} />
                        <Link href="/" className={styles.logoHeader}>
                            <Image src='/public/header/logoHeader.svg' alt="logo" className={styles.logo} width={250} height={95} />
                        </Link>
                    </div>

                    <div className={styles.headerDiv2}>

                        <InputSearch/>
                        
                        <div className={styles.headerRight}>
                            <div className={styles.linkHeader}>
                                <Link href="/" >
                                    Contato
                                </Link>
                                <Image src='/public/header/chat-dots.svg' alt="search" className={styles.chatIcon}
                                    width={20} height={20} />
                            </div>
                            {validate ? <HeaderRightAuth payload={validate} /> : <HeaderRightGeneric />}
                        </div>
                    </div>


                </main>
            </div>
        </>
    )
}


export default HeaderPrimary