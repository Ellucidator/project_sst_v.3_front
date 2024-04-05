'use client'
import styles from './styles.module.scss'
import { useFormStatus } from "react-dom"

const Loading =()=>{
    const {pending} = useFormStatus()
    return(
        <>
            {pending?(
                <div className={styles.loading}></div>
            ):(<></>)}
        </>
    )

}

export default Loading