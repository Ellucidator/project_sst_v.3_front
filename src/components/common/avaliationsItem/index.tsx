import { userService } from '@/services/userService'
import Stars from './star'
import styles from './styles.module.scss'

type Props = {
    item_id: number|string
    user_id: number|string
}
const AvaliationsItem = async ({item_id, user_id}: Props) => {

    const formAvaliationAction = async (form: FormData)=>{
        'use server'

        const title = form.get('title')?.toString()
        const comment = form.get('comment')?.toString()
        const rating = form.get('stars')?.toString()

        if(!title || !comment || !rating) return

        const avaliation = await userService.createAvaliation({title, comment, rating, item_id, user_id})
        console.log(avaliation)
    }

    return (
        <>
            <form className={styles.formAvaliations} action={formAvaliationAction}>

                <Stars />

                <input className={styles.inputTitle} type="text" name='title' placeholder='Titulo'/>
                <textarea className={styles.inputComment} name='comment' placeholder='Comentario'/>
                <button type="submit" >ENVIAR</button>
            </form>
        </>
    )
}

export default AvaliationsItem