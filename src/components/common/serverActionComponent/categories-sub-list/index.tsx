import { Categories } from '@/types/catalogTypes'
import styles from './styles.module.scss'
import { cookies } from 'next/headers'
import ButtonActionById from '../buttonActionById'
import { btnActionService } from '@/services/btnActionService'
import Button from '../../button'

type Props = {
    categories: Categories[]
}
const CategoriesAndSubList = async ({ categories }: Props) => {

    const btnAction = cookies().get('sub-open')?.value
    const classCondition: { name: string, open: boolean } = JSON.parse(btnAction ? btnAction : '{"name":"","open":false}')

    const handlerSubmit = async (category: string) => {
        'use server'

        
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
                        <ButtonActionById actionFunction={handlerSubmit} idAction={category.name} 
                            buttonAttribute={{ btnName: category.name, arrow:classCondition.name === category.name && classCondition.open === true?'arrowUp':'arrowDown',subTitle:'⇱' ,btnModel:'model6', btnOption:{style:{fontSize:'large'}}}}  loading={false} />
                        
                        <ul key={`${category.id}`} id={`${category.name}-${category.id}`} 
                        className={classCondition.name === category.name && classCondition.open === true? styles.subCategoryOpen : styles.subCategoryList}>
                            {classCondition.name === category.name && classCondition.open === true?category.SubCategories.map((subCategory) => (
                                <li key={subCategory.id} className={styles.subCategory} >
                                    {/* <ButtonActionById actionFunction={btnActionService.btnSubCategoryAction} 
                                        idAction={`${category.name.toLowerCase()}/${subCategory.id}`} 
                                        buttonAttribute={{ btnName: subCategory.name, btnModel:'model6',btnOption:{style:{fontSize:'medium'}}}} /> */}
                                        <Button btnAction='link' href={`http://localhost:3001/api/catalog/${category.name.toLowerCase()}-${subCategory.id}`} btnName={subCategory.name} btnModel='model6' btnOption={{style:{fontSize:'medium'}}} />
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