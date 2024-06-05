'use client'
import styles from './styles.module.scss'
import { useFormStatus } from "react-dom"

type Props = {
    model?: 'modelLocal'|'modelArea'
}

const Loading = ({ model = 'modelLocal' }: Props) => {
    const { pending } = useFormStatus()

    if (model === 'modelLocal')
    return (
        <>
            {pending ? (
                    <div className={styles.loadingLocal}></div>
            ) : (<></>)}
        </>
    )
    else if(model === 'modelArea')
    return (
        <>
            {pending ? (
                <div className={`${styles.loadingArea}`}>
                    <div className={styles.loading}></div>
                </div>
            ) : (<></>)}
        </>
    )

}

export default Loading