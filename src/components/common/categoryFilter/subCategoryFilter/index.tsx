import { SubCategories } from "@/types/catalogTypes"
import styles from './styles.module.scss'
type Props = {
    subCategories: SubCategories[]
}
const SubCategoryFilter= ({subCategories}:Props)=>{
    
    return(
        <>
            {
                subCategories.map((subCategory)=>{
                    return(
                        <div key={subCategory.id} className={styles.subCategory}>
                            <input 
                            type="checkbox" 
                            name={subCategory.name} 
                            id={subCategory.name} 
                            className={styles.checkbox} 
                            />
                            <label htmlFor={subCategory.name} className={styles.label}>{subCategory.name}</label>
                        </div>
                    )
                })
            }
        </>
    )
}

export default SubCategoryFilter