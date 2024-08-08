import { btnActionService } from '@/services/btnActionService'
import Loading from '../../clientOnlyComponents/loading'
import styles from './styles.module.scss'
import Link from 'next/link'


type Props = {
    cardLink: string
    cardName: string
    imgUrl: string
    theme: 'dark' | 'light'
}

const CategoryCard = async({ cardName, cardLink, imgUrl, theme }: Props) => {


    return (
        <Link href={`http://localhost:3001/api/catalog/${cardLink}`} 
            className={styles.container}
            style={{ backgroundImage: `url(${imgUrl})` }}
            >
                <p className={styles.categoryName + ' ' + styles[theme]}>{cardName}</p>
        </Link>
    )
}



export default CategoryCard