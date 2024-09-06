'use client'
import { Categories } from '@/types/catalogTypes'
import styles from './styles.module.scss'
import Button from '@/components/common/button'
import { useState } from 'react'

type Props = {
    categories: Categories[]|false
}
const CategoriesAndSubListClient =  ({ categories }: Props) => {
    const [classCondition, setClassCondition] = useState<{ name: string, open: boolean}>({ name: 'All', open: false }) 

    if(!categories) return <></>


    const btnAction = async (name: string) => {
        const ul= document.getElementById(name)!

        if (classCondition.name === name) {
            if(classCondition.open){ 
                setClassCondition({ name: name, open: false})
                ul.className = styles.subCategoryList
            }else {
                setClassCondition({ name: name, open: true})
                ul.className = 'styles_subCategoryOpen__TUXn8'
            }
        }
        else{
            const lastUl = document.getElementById(classCondition.name)
            if(lastUl) lastUl.className = styles.subCategoryList

            setClassCondition({ name: name, open: true})
            ul.className = 'styles_subCategoryOpen__TUXn8'
        }
    }

    return (
        <>
            {categories.map((category) => {
                return (
                    <div key={category.id} className={styles.category}>
                        <Button  btnName={category.name} 
                            arrow={classCondition.name === category.name && classCondition.open === true?'arrowUp':'arrowDown'}
                            iconElem={{ src: '/public/common/arrow.svg', position: 'right', width: 20 }}    btnModel='model6' 
                            btnOption={{style:{fontSize:'x-large'}, onClick: () => btnAction(category.name)}}
                        />
                        
                        <ul key={`${category.id}`} id={category.name} 
                            className={styles.subCategoryList}>
                            {classCondition.name === category.name && classCondition.open === true?category.SubCategories.map((subCategory) => (
                                <li key={subCategory.id} className={styles.subCategory} >
                                        <Button btnAction='link' href={`/api/catalog/${category.name.toLowerCase()}-${subCategory.id}`} btnName={subCategory.name} btnModel='model6' />
                                </li>
                            )):<></>}
                        </ul>
                    </div>
                )
            })}
        </>
    )
}



export default CategoriesAndSubListClient