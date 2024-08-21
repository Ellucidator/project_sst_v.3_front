import { Categories } from "@/types/catalogTypes";
import styles from './styles.module.scss'
import Image from "next/image";
import { cookies } from "next/headers";
import CategoriesAndSubList from "../categories-sub-list";
import { UserAddress } from "@/types/userTypes";
import ModalUser from "./modalUser";
import ModalAddress from "./modalAddress";
import { Tag } from "@/types/tagTypes";
import ModalFilters from "./modalFilters";

type Props = {
    catalog?: Categories[] | false
    cookieName?: 'modal' | 'modalUser' | 'modalAddress' | 'modalFilters'
    user_name?: string
    adresses?: UserAddress[]
    commonType?: 'categories-sub-list' | 'filters'
    tags?: Tag[]|false,
    filters?: string[]
    subCategoryId?: string
}

const ServerModal = async ({ catalog, cookieName = 'modal', commonType = 'categories-sub-list', user_name, adresses = [], tags, filters, subCategoryId }: Props) => {

    let classModal = cookieName
    const cookieControl = cookies().get(cookieName)?.value
    if (cookieControl === 'open') classModal += 'Open'

    const btnAction = async (name: string) => {
        'use server'
        if (cookieControl === 'open') {
            cookies().set(name, 'close', {
                maxAge: 60 * 5
            })
        } else {
            cookies().set(name, 'open', {
                maxAge: 60 * 5
            })
        }
    }
    const handlerSubmit = async (form: FormData) => {
        'use server'
        await btnAction(cookieName)
    }

    return (
        <div>
            {cookieName === 'modal' ?
                <>
                    <form action={handlerSubmit}>
                        <button type="submit" className={styles.btnHeader}>
                            <p className="flex gap-2 border-b-2">
                                Catalogo
                                <Image src="/public/header/shop.svg" alt="catalog" className={styles.icon} width={20} height={20} />
                            </p>
                            <p className="flex gap-2">
                                Serviços
                                <Image src="/public/header/pc-display.svg" alt="services" className={styles.icon} width={20} height={20} />
                            </p>
                        </button>
                    </form>
                    <div className={styles[classModal]}>
                        {cookieControl === 'open' ?
                            <>
                                <form action={handlerSubmit} className={styles.btnModal}>
                                    <button type="submit" className={styles.btnModal} >X</button>
                                </form>
                                <CategoriesAndSubList categories={catalog!} />
                            </>
                            : <></>}
                    </div>
                </>
                : cookieName === 'modalUser' ?
                    <ModalUser cookieControl={cookieControl!} user_name={user_name!} classModal={classModal} btnAction={btnAction} /> 
                : cookieName === 'modalAddress' ?
                    <ModalAddress cookieControl={cookieControl!} adresses={adresses} classModal={classModal} btnAction={btnAction} />
                : <ModalFilters btnAction={btnAction} cookieControl={cookieControl!} classModal={classModal} filters={filters!} tags={tags!} subCategoryId={subCategoryId!} />
            }
            {cookieControl === 'open' ?
                <form action={handlerSubmit}>
                    <button type="submit" className={styles.overlayModal}></button>
                </form> :
                <></>
            }
        </div>
    )
}

export default ServerModal