import Loading from '../../clientOnlyComponents/loading'
import styles from './styles.module.scss'
import { cookieService } from '@/services/authService'

type Props = {
    cardLink: string
    cardName: string
    imgUrl: string
    theme: 'dark' | 'light'
}

const CategoryCard = async({ cardName, cardLink, imgUrl, theme }: Props) => {
    const handlerSubmit = async (form: FormData) => {
        'use server'
        await cookieService.btnSubCategoryAction(form.get('cardLink')!.toString())
    }

    return (
        <form className={styles.container} action={handlerSubmit}>
            <Loading model='modelArea'/>
            <input type="hidden" name="cardLink" defaultValue={cardLink} />
            <button
                type='submit'
                className={styles.categoryCard1}
                style={{ backgroundImage: `url(${imgUrl})` }}
            >
                <p className={styles.categoryName + ' ' + styles[theme]}>{cardName}</p>
            </button>
        </form>
    )
}



export default CategoryCard