import { catalogService } from "@/services/catalogService";
import styles from './styles.module.scss'
import Link from "next/link";
import Image from "next/image";
import { authService } from "@/services/authService";
import HeaderRightGeneric from "./headerRightGeneric";
import InputSearch from "./inputSearch";
import { Cart } from "@/types/itemsTypes";
import { helpers } from "@/helpers/helpers";
import ClientModal from "../common/clientOnlyComponents/clientModal";
import ElementSticky from "../common/clientOnlyComponents/elementSticky";


const HeaderPrimary = async () => {
    const [validate, catalog] = await Promise.all([
        authService.verifySession(),
        catalogService.getCatalog()
    ])

    let carCount: number = 0
    const cartItems: Cart = helpers.getCookieValue('car')

    if (cartItems) {
        carCount = cartItems.items ? cartItems.items.reduce((acc, item) => {
            return acc += item.ItemCharacteristics.quantity
        }, 0) : 0
    }

    return (
        <>
            {/* <ElementSticky catalog={catalog} /> */}
            <div id="header" className={`${styles.header}`}>
                <div className={`container ${styles.headerContainer}`}>
                    <div className={styles.headerDiv1}>
                        <ClientModal catalog={catalog} cookieName="modal" />
                        <Link href="/" className={styles.logoHeader}>
                            <Image src='/public/header/logoHeader.svg' alt="logo" className={styles.logo} width={250} height={95} />
                        </Link>
                    </div>

                    <div className={styles.headerDiv2}>

                        <InputSearch />

                        <div className={styles.headerAuth}>
                            {validate ? 
                                <ClientModal cookieName="modalUser" user_name={validate.first_name} />
                                : <HeaderRightGeneric />}
                        </div>
                        <Link id="cartCount" href={'/cart'} className={styles.linkCartDisplayLight}>
                            <p className={styles.cartCount}>{carCount}</p>
                            <Image src='/public/header/cart-fill.svg' alt="search" className={styles.cartIcon}
                                width={30} height={30} />
                        </Link>

                    </div>

                    <div className={styles.headerDiv3}>
                        <Link href={'/cart'} className={styles.linkCart}>
                            <p className={styles.cartCount}>{carCount}</p>
                            <Image src='/public/header/cart-fill.svg' alt="search" className={styles.cartIcon}
                                width={40} height={40} />
                        </Link>
                    </div>

                </div>
            </div>
        </>
    )
}


export default HeaderPrimary