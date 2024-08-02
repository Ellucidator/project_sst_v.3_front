import { Tag } from '@/types/tagTypes'
import styles from './styles.module.scss'
import { cookies } from 'next/headers'
import Loading from '@/components/common/clientOnlyComponents/loading'
import Title from '@/components/common/texts/tiltle'
import Button from '@/components/common/button'

type Props = {
    tags: Tag[],
    subCategoryId: string,
    filters?:string[]
}
const TagsFilterServ = async ({ tags, subCategoryId,filters=[] }: Props) => {
    if (tags.length < 1 ) return (<></>)

    const actionFilter = async (form: FormData) => {
        'use server'

        const filter = form.getAll('filter')
        const catalogCookie = cookies().get(`catalog${subCategoryId}`)?.value
        if (catalogCookie) {
            const catalogCookieOn: { itemsOrder?: string, tags?: any[] } = JSON.parse(catalogCookie)
            catalogCookieOn.tags = filter
            cookies().set(`catalog${subCategoryId}`, JSON.stringify(catalogCookieOn),
                {
                    maxAge: 60 * 60
                })
        } else {
            cookies().set(`catalog${subCategoryId}`, JSON.stringify({ itemsOrder: 'created_at-DESC', tags: filter }),
                {
                    maxAge: 60 * 60
                })
        }
        cookies().delete('modalFilters')
    }


    return (
        <form className={styles.tagsFilter} action={actionFilter}>
            <Loading model='modelArea' />

            <div className={styles.titleContainer}>
                <Title fontSize="20px" titleText="Filtros" model="model4" />
                <Button btnModel="model4" btnName="Aplicar" btnAction="submit" />
            </div>
            {
                tags.map((tag) => {
                    return (
                        <div key={tag.id} className={styles.divTag}>
                            <p className={styles.tagTitle}>{tag.name + ' :'}</p>
                            <div className={styles.tagValues} >
                                {
                                    tag.TagValues ?
                                        tag.TagValues.map((value) => {
                                            return (
                                                <div key={value.id} className={styles.tags}>
                                                    <input defaultChecked={filters.some(fil=>fil===value.name)} type="checkbox" name='filter' id={value.name} value={value.name} />
                                                    <label htmlFor={value.name}>{value.name}</label>
                                                </div>
                                            )
                                        })
                                        : <></>
                                }
                            </div>
                        </div>
                    )
                })
            }
        </form>
    )
}


export default TagsFilterServ