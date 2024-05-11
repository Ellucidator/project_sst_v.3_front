import Link from 'next/link'
import styles from './layout.module.scss'

type Props = {
    children: React.ReactNode
}

export default function PageUserLayout({ children }: Props) {
    const options = [
        ['Minhas Informações','my-info'],
        ['Meus Pedidos','my-purchases'],
        ['Endereços','adres'],
        ['Favoritos','favorites']
    ]

    return (
        <div className={styles.pageBody}>
            <div className={styles.pageContainer}>
                <div className={styles.divOptions}>
                    {
                        options.map((elem)=>{
                            return(
                                <Link href={`/user/${elem[1]}`}>
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