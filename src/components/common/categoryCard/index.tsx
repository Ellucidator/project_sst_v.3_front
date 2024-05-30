import Link from 'next/link'
import styles from './styles.module.scss'

type Props = {
    cardLink: string
    cardName: string
    fontSize: string
    imgUrl: string
    theme:'dark' | 'light'
}

const CategoryCard = ({cardName,cardLink,fontSize,imgUrl,theme}:Props) => {

    return (
        <Link href={`/catalog/${cardLink}`} 
        className={styles.categoryCard1}
        style={{backgroundImage:`url(${imgUrl})`,fontSize}}
        >
            <p className={styles.categoryName + ' ' + styles[theme]}>{cardName}</p>
        </Link>
    )
}



export default CategoryCard