import Stars from './star'
import styles from './styles.module.scss'


const AvaliationsItem = () => {

    return (
        <>
            <form>
                
                <Stars />

                <input type="text" name='title' placeholder='Titulo'/>
                <input type="text" name='comment' placeholder='Comentario'/>
            </form>
        </>
    )
}

export default AvaliationsItem