import Link from 'next/link'
import styles from './styles.module.scss'
import Image from 'next/image'


const HeaderGeneric = () => {

    return(
        <>
            <header className={styles.header}>
                <div className={styles.headerContainer}>
                    <Link href="/" className={styles.logoHeader}>
                        <Image src='/public/header/logoHeader.svg' alt="logo" className={styles.logo} width={250} height={95} />
                    </Link>
                </div>
            </header>
        </>
    )
}

export default HeaderGeneric