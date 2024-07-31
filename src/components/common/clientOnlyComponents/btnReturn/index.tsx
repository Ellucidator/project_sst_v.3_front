'use client'
import { useRouter } from 'next/navigation'
import styles from './styles.module.scss'

type Props = {
    model?:'model1'|'model2'
}

export const ButtonReturn = ({ model = 'model1'}:Props) => {

    const router = useRouter()

    const handletClick = () => {
        router.back()
    }
    
    return <button className={styles[model]} onClick={handletClick}>{'<-VOLTAR'}</button>
}

export default ButtonReturn