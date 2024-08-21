import styles from './styles.module.scss'
import Button from '@/components/common/button';
import TagsFilterServ from '@/components/pages/catalog/servTagsFilter';
import { Tag } from '@/types/tagTypes';


type Props = {
    cookieControl: string
    classModal: string
    btnAction: (name: string) => Promise<void>
    filters:string[]
    tags:Tag[]|false
    subCategoryId:string
}

const ModalFilters = async ({cookieControl, classModal, btnAction,filters,tags,subCategoryId }: Props) => {
    if(!tags) return (<></>)

    const handlerSubmit = async (form: FormData) => {
        'use server'
        await btnAction('modalFilters')
    }

    return (
        <>
            <form action={handlerSubmit}>
                <Button btnModel="model4" btnName="||| Filtros" btnAction="submit" />
            </form>
            <div className={styles[classModal]}>
                {cookieControl === 'open' ?
                    <>
                        <form action={handlerSubmit} className={styles.btnModal}>
                            <button type="submit" className={styles.btnModal} >X</button>
                        </form>

                        <TagsFilterServ filters={filters} tags={tags} subCategoryId={subCategoryId!} />

                    </>
                    : <></>}
            </div>
        </>
    )
}

export default ModalFilters