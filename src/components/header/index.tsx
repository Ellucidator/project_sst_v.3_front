import { catalogService } from "@/services/catalogService";
import styles from './styles.module.scss'
import Link from "next/link";
import Image from "next/image";
import { authService } from "@/services/authService";
import HeaderRightGeneric from "./headerRightGeneric";
import InputSearch from "./inputSearch";
import { Cart } from "@/types/itemsTypes";
import ServerModal from "../common/serverActionComponent/modal";
import { helpers } from "@/helpers/helpers";
import ButtonReturn from "../common/clientOnlyComponents/btnReturn";


const HeaderPrimary = async () => {

    const validate = await authService.verifySession();
    const catalog = await catalogService.getCatalog();

    let carCount: number = 0
    const cartItems: Cart = helpers.getCookieValue('car')

    if (cartItems) {
        carCount = cartItems.items ? cartItems.items.reduce((acc, item) => {
            return acc += item.ItemCharacteristics.quantity
        }, 0) : 0
    }

    return (
        <>
            <div id="header" className={`${styles.header}`}>
                <ButtonReturn />

                <div className={`container ${styles.headerContainer}`}>
                    <div className={styles.headerDiv1}>
                        <ServerModal cookieName="modal" commonType="categories-sub-list" catalog={catalog} />
                        <Link href="/" className={styles.logoHeader}>
                            <Image src='/public/header/logoHeader.svg' alt="logo" className={styles.logo} width={250} height={95} />
                        </Link>
                    </div>

                    <div className={styles.headerDiv2}>

                        <InputSearch />

                        <div className={styles.headerAuth}>
                            {validate ? <ServerModal cookieName="modalUser" user_name={validate.first_name} />
                                : <HeaderRightGeneric />}
                        </div>

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