'use client'
import { useRouter } from 'next/navigation'
import styles from './styles.module.scss'


export const ButtonReturn = () => {

    const router = useRouter()

    const handletClick = () => {
        router.back()
    }
    
    return <button className={styles.btnReturn} onClick={handletClick}>{'<-VOLTAR'}</button>
}

export default ButtonReturn