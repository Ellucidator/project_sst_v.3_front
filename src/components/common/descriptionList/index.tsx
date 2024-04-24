import { TagValue } from '@/types/tagTypes'
import styles from './styles.module.scss'

type Props = {
    tagList: TagValue[] | undefined
}
const DescriptionList = ({tagList}:Props)=>{
    if(!tagList)return null

    return(
        <>
            <div className={styles.descriptionList}>
                <p className={styles.descriptionTitle}>INFORMAÇÕES</p>

                {
                    tagList.map((tag)=>{
                        return(
                            <section key={tag.name} className={styles.divTag}>
                                <p className={styles.tagTitle}>{tag.Tag?.name + ' : '}</p>
                                <p className={styles.tagValue}>{tag.name}</p>
                            </section>
                        )
                    })
                }
            </div>
        </>
    )
}


export default DescriptionList