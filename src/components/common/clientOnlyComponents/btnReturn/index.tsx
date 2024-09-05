'use client'
import { useRouter } from 'next/navigation'
import styles from './styles.module.scss'

type Props = {
    model?:'model1'|'model2'
    position?:"static" | "relative" | "absolute" | "sticky" | "fixed"
}

export const ButtonReturn = ({ model = 'model1', position = 'static'}:Props) => {

    const router = useRouter()

    const handletClick = () => {
        router.back()
    }
    
    return <button
        style={{position}}
        className={styles[model]} 
        onClick={handletClick}
        >{'<-VOLTAR'}</button>
}

export default ButtonReturn