import { Categories } from "@/types/catalogTypes";
import styles from './styles.module.scss'
import Image from "next/image";
import { cookies } from "next/headers";
import CategoriesAndSubList from "../categories-sub-list";
import Button from "../../button";
import { UserAddress } from "@/types/userTypes";
import ModalUser from "./modalUser";
import ModalAddress from "./modalAddress";
import TagsFilterServ from "@/components/pages/catalog/servTagsFilter";
import { Tag } from "@/types/tagTypes";

type Props = {
    catalog?: Categories[]
    cookieName?: 'modal' | 'modalUser' | 'modalAddress'
    user_name?: string
    adresses?: UserAddress[]
    commonType?: 'categories-sub-list' | 'filters'
    tags?: Tag[],
    filters?:string[]
    subCategoryId?: string
}

const ServerModal = async ({ catalog, cookieName = 'modal', commonType = 'categories-sub-list', user_name, adresses = [], tags,filters, subCategoryId }: Props) => {

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
                        {commonType === 'categories-sub-list' ? <button type="submit" className={styles.btnHeader}>
                            <p className="flex gap-2 border-b-2">
                                Catalogo
                                <Image src="/public/header/shop.svg" alt="catalog" className={styles.icon} width={20} height={20} />
                            </p>
                            <p className="flex gap-2">
                                Serviços
                                <Image src="/public/header/pc-display.svg" alt="services" className={styles.icon} width={20} height={20} />
                            </p>
                        </button> : <Button btnModel="model4" btnName="||| Filtros" btnAction="submit" />}
                    </form>
                    <div className={styles[classModal]}>
                        {cookieControl === 'open' ?
                            <>
                                <form action={handlerSubmit} className={styles.btnModal}>
                                    <button type="submit" className={styles.btnModal} >X</button>
                                </form>

                                {commonType === 'categories-sub-list' ? 
                                    <CategoriesAndSubList categories={catalog!} />:
                                    <TagsFilterServ filters={filters} tags={tags!} subCategoryId={subCategoryId!} />
                                }
                            </>
                            : <></>}
                    </div>
                </>
                : cookieName === 'modalUser' ?
                    <ModalUser cookieControl={cookieControl!} user_name={user_name!} classModal={classModal} btnAction={btnAction} /> :
                    <ModalAddress cookieControl={cookieControl!} adresses={adresses} classModal={classModal} btnAction={btnAction} />
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