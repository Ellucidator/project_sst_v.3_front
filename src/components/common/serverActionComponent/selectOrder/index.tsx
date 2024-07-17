import { SubCategories } from '@/types/catalogTypes'
import Button from '../../button'
import Loading from '../../clientOnlyComponents/loading'
import styles from './styles.module.scss'
import Title from '../../texts/tiltle'

type Props = {
    type:'order'|'order&subCategoryId'
    formFunction: ((formData: FormData) => void)
    subCategories?: SubCategories[]
    subAc?:string
}
const SelectOrder = ({formFunction,type,subCategories,subAc}: Props) => {

    return (
        <form action={formFunction} className={styles.catalogOrderContainer}>
            <Loading model='modelArea' />
            {type === 'order&subCategoryId' 
                ?<div className={styles.catalogOrder}>
                    <Title fontSize="18px" model='model1' titleText="Categoria:" />
                    <select defaultValue={subAc} className={styles.selectOrder} name='subCategoryId' >
                        <option value={'all'}>Todas</option>
                        {subCategories?.map((subCategory) => {
                            return (
                                <option key={subCategory.id} value={subCategory.id}>{subCategory.name}</option>
                            )
                        })}
                    </select>
                    <Button btnModel="model4" btnName="Aplicar" btnAction="submit" />
                </div> 
                : <></>}
            <div className={styles.catalogOrder}>
            <Title fontSize="18px" model='model1' titleText="Ordenar por:" />

                <select className={styles.selectOrder} name='order' >
                    <option value={'created_at-DESC'}>Novidades</option>
                    <option value={'price-DESC'}>Maior Preço</option>
                    <option value={'price-ASC'}>Menor Preço</option>
                </select>
                <Button btnModel="model4" btnName="Aplicar" btnAction="submit" />
            </div>
        </form>
    )
}

export default SelectOrder