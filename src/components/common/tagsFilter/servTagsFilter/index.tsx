import { Tag } from '@/types/tagTypes'
import styles from './styles.module.scss'
import Title from '../../tiltle'
import { cookies } from 'next/headers'

type Props = {
    tags: Tag[],
    subCategoryId:string
}
const TagsFilterServ=async({tags,subCategoryId}:Props)=>{

    const actionFilter=async(form:FormData)=>{
        'use server'

        const filter = form.getAll('filter')
        const catalogCookie = cookies().get(`catalog${subCategoryId}`)?.value

        if(catalogCookie){
            const catalogCookieOn: {itemsOrder?: string ,tags?: any[] } = JSON.parse(catalogCookie)
            catalogCookieOn.tags = filter
            cookies().set(`catalog${subCategoryId}`, JSON.stringify(catalogCookieOn),
            {
                maxAge: 60 * 60 * 24
            })
        }else{
            cookies().set(`catalog${subCategoryId}`, JSON.stringify({itemsOrder:'created_at-DESC',tags:filter}),
            {
                maxAge: 60 * 60 * 24
            })
        }
    }
    
    if(tags.length < 1) return (<></>)
    
    return (
        <form className={styles.tagsFilter} action={actionFilter}>
            <div className={styles.titleContainer}>
                <Title fontSize="20px" titleText="Filtros" model="model4"/>
                <button  className={styles.btnFilter}>APLICAR</button>
            </div>
            {
                tags.map((tag)=>{
                    return(
                        <div key={tag.id} className={styles.divTag}>
                            <p className={styles.tagTitle}>{tag.name +' :'}</p>
                            <div className={styles.tagValues} >
                                {
                                    tag.TagValues?
                                    tag.TagValues.map((value)=>{
                                        return(
                                            <div key={value.id} className={styles.tags}>
                                                <input type="checkbox" name='filter' id={value.name} value={value.name}/>
                                                <label htmlFor={value.name}>{value.name}</label>
                                            </div>
                                        )
                                    })
                                    :<></>
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