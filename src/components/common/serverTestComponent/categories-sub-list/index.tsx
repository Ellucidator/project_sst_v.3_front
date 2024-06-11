import { Categories } from '@/types/catalogTypes'
import styles from './styles.module.scss'
import { cookies } from 'next/headers'
import ButtonActionById from '../buttonActionById'
import { cookieService } from '@/services/cookieService'

type Props = {
    categories: Categories[]
}
const CategoriesAndSubList = async ({ categories }: Props) => {

    const btnAction = cookies().get('sub-open')?.value
    const classCondition: { name: string, open: boolean } = JSON.parse(btnAction ? btnAction : '{"name":"","open":false}')

    const handlerSubmit = async (form: FormData) => {
        'use server'

        const category = form.get('category')!.toString()
        if (classCondition.name === category) {
            cookies().set('sub-open', JSON.stringify({ name: category, open: !classCondition.open }),
                {
                    maxAge: 0
                })
        } else {
            cookies().set('sub-open', JSON.stringify({ name: category, open: true }),
                {
                    maxAge: 0
                })
        }
    }
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
                                    <ButtonActionById actionFunction={cookieService.btnSubCategoryAction} idAction={`${category.name.toLowerCase()}/${subCategory.id}`} buttonAttribute={{ btnName: subCategory.name, btnModel:'model6'}} fontSize='medium' />
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