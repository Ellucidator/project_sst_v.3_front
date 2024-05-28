import Link from 'next/link'
import styles from './layout.module.scss'


type Props = {
    children: React.ReactNode
}

export default async function PageUserLayout({ children }: Props) {
    const options = [
        ['Inicio','home'],
        ['Minhas Informações','my-info'],
        ['Meus Pedidos','my-purchases'],
        ['Endereços','address'],
        ['Favoritos','favorites']
    ]


    
    return (
        <div className={styles.pageBody}>
            <div className={styles.pageContainer}>
                <div className={styles.divOptions}>
                    {
                        options.map((elem)=>{
                            return(
                                <Link key={elem[1]} href={`/user/${elem[1]}`} className={styles.option}>
                                    <p>{elem[0]}</p>
                                </Link>
                            )
                        })
                    }
                </div>

                <div className={styles.divInfo}>
                    {children}
                </div>
            </div>
        </div>
    )
}