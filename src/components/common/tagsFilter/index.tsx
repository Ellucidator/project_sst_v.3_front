import { Tag } from '@/types/tagTypes'
import styles from './styles.module.scss'

type Props = {
    tags: Tag[]
}
const TagsFilter=({tags}:Props)=>{
    
    if(tags.length < 1) return (<></>)
    
    return (
        <div className={styles.tagsFilter}>
            {
                tags.map((tag)=>{
                    return(
                        <div key={tag.id} className={styles.divTag}>
                            <p className={styles.tagTitle}>{tag.name}</p>
                            <div className={styles.tagValues}>
                                {
                                    tag.TagValues?
                                    tag.TagValues.map((value)=>{
                                        return(
                                            <div key={value.id} className={styles.tags}>
                                                <input type="checkbox" name={value.name} id={value.name} />
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