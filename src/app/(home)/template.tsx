import HeaderPrimary from '@/components/header'
import styles from './template.module.scss'
export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <div className={styles.template}>
            <HeaderPrimary/>
            {children}
        </div>
    )
}