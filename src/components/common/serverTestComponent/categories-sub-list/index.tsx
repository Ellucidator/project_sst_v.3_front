import { Categories } from '@/types/catalogTypes'
import styles from './styles.module.scss'
import Link from 'next/link'
import { cookies } from 'next/headers'

type Props = {
    categories: Categories[]
}
const CategoriesAndSubList = async ({ categories }: Props) => {
    return (
        <>
            {categories.map((category) => {
                return (
                    <div key={category.id} className={styles.category}>
                        <form action={handlerSubmit} >
                            <button className={styles.categoryBtn} type='submit' >
                                <input type='hidden' name='category' value={category.name} />
                                <p className={styles.categoryTittle}>
                                    {category.name}
                                </p>
                                <p className={classCondition.name === category.name && classCondition.open === true ? styles.btnSubActive : styles.btnSub}>⇱</p>
                            </button>
                        </form>
                        <ul key={`${category.id}`} id={`${category.name}-${category.id}`} 
                        className={classCondition.name === category.name && classCondition.open === true? styles.subCategoryOpen : styles.subCategoryList}>
                            {classCondition.name === category.name && classCondition.open === true?category.SubCategories.map((subCategory) => (
                                <li key={subCategory.id} className={styles.subCategory} >
                                    <Link href={`/catalog/${category.name.toLowerCase()}/${subCategory.id}`}>
                                        {subCategory.name}
                                    </Link>
                                </li>
                            )):<></>}
                        </ul>
                    </div>
                )
            })}
        </>
    )
}



export default CategoriesAndSubList