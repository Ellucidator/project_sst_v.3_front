import { Tag } from '@/types/tagTypes'
import styles from './styles.module.scss'
import { ChangeEvent } from 'react'

type Props = {
    tags: Tag[]
    setFilter: (value: string[]) => void
}
const TagsFilter=({tags,setFilter}:Props)=>{

    const tagsFilter:string[]=[]
    const onChangeFilter = (ev: ChangeEvent<HTMLInputElement>) => {
        if(ev.target.checked) tagsFilter.push(ev.target.name)
        else tagsFilter.splice(tagsFilter.indexOf(ev.target.name), 1)
    }
    const handleFilter = () => {
        if(tagsFilter.length < 1) return
        setFilter(tagsFilter)
    }
    
    if(tags.length < 1) return (<></>)
    
    return (
        <div className={styles.tagsFilter}>
            <div className={styles.titleContainer}>
                <p className={styles.filterTitle}>Filtros</p>
                <button className={styles.btnFilter} onClick={handleFilter}>APLICAR</button>
            </div>
            {
                tags.map((tag)=>{
                    return(
                        <div key={tag.id} className={styles.divTag}>
                            <p className={styles.tagTitle}>{tag.name +' :'}</p>
                            <div className={styles.tagValues}>
                                {
                                    tag.TagValues?
                                    tag.TagValues.map((value)=>{
                                        return(
                                            <div key={value.id} className={styles.tags}>
                                                <input type="checkbox" name={value.name} id={value.name}  onChange={onChangeFilter}/>
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
        </div>
    )
}


export default TagsFilter