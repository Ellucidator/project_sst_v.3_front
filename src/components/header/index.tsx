import { catalogService } from "@/services/catalogService";
import styles from './styles.module.scss'
import Link from "next/link";
import Modal from "../modal";
import Image from "next/image";
import { cookieService } from "@/services/cookieService";
import HeaderRightAuth from "./headerRightAuth";
import HeaderRightGeneric from "./headerRightGeneric";
import InputSearch from "../common/inputSearch";
import { cookies } from "next/headers";
import { ItemToCar } from "@/types/itemsTypes";


const HeaderPrimary = async () => {
    
    const validate = await cookieService.verifySession();
    const catalog = await catalogService.getCatalog();
    let carCount:number
    const cartItems = cookies().get('car')?.value

    if(!cartItems)carCount=0
    else{
        const carItemsA:ItemToCar[]= JSON.parse(cartItems)
        carCount = carItemsA.reduce((acc,item)=>{
            return acc+= item.quantity
        },0)
    }

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

                    <div className={styles.headerDiv3}>
                        <Link href={'/cart'} className={styles.linkCart}>
                            <p className={styles.cartCount}>{carCount}</p>
                            <Image src='/public/header/cart-fill.svg' alt="search" className={styles.cartIcon}
                                    width={40} height={40} />
                        </Link>
                    </div>

                </main>
            </div>
        </>
    )
}


export default HeaderPrimary