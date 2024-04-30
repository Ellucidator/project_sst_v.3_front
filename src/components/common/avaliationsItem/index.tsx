import Stars from './star'
import styles from './styles.module.scss'


const AvaliationsItem = () => {

    return (
        <>
            <form className={styles.formAvaliations}>

                <Stars />

                <input className={styles.inputTitle} type="text" name='title' placeholder='Titulo'/>
                <textarea className={styles.inputComment} name='comment' placeholder='Comentario'/>
            </form>
        </>
    )
}

export default AvaliationsItem