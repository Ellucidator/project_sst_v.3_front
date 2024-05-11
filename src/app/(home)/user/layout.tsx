import styles from './layout.module.scss'

type Props = {
    children: React.ReactNode
}

export default function FormLayout({ children }: Props) {
    return (
        <div className={styles.pageBody}>
            <div className={styles.pageContainer}>
                <div className={styles.divOptions}>
                    
                </div>

                <div className={styles.divInfo}>
                    {children}
                </div>
            </div>
        </div>
    )
}