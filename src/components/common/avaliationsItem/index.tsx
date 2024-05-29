import { userService } from '@/services/userService'
import Stars from './star'
import styles from './styles.module.scss'
import { Avaliation, AvaliationAndCount } from '@/types/avaliationTypes'
import { revalidateTag } from 'next/cache'
import PagCountServer from '../serverTestComponent/pagCount'

type Props = {
    item_id: number | string
    user_id: number | string
    avaliation?: Avaliation | false
    allAvaliation?: AvaliationAndCount
}
const AvaliationsItem = async ({ item_id, user_id, avaliation, allAvaliation }: Props) => {
    const formAvaliationAction = async (form: FormData) => {
        'use server'

        const title = form.get('title')?.toString()
        const comment = form.get('comment')?.toString()
        const rating = form.get('stars')?.toString()

        if (!title || !comment || !rating) return

        await userService.createAvaliation({ title, comment, rating, item_id, user_id })
        revalidateTag('avaliation-user')
        revalidateTag('all-avaliations-item')
    }

    return (
        <section className={styles.avaliation}>
            <p className={styles.avaliationTitleP}>SUA AVALIAÇÃO</p>
            <div className={styles.sectionAvaliationUser}>
                <form className={styles.formAvaliations} action={formAvaliationAction}>

                    <Stars />

                    <input className={styles.inputTitle} type="text" name='title' placeholder='Titulo' />
                    <textarea className={styles.inputComment} name='comment' placeholder='Comentario' />
                    <button type="submit" >ENVIAR</button>
                </form>
                {avaliation ? (
                    <section className={styles.avaliationUser}>
                        <p className={styles.avaliationStars}>{avaliation.rating}</p>
                        <p className={styles.avaliationTitle}>{avaliation.title}</p>
                        <p className={styles.avaliationComment} >{avaliation.comment}</p>
                    </section>
                ) : null}
            </div>
            <p className={styles.avaliationTitleP}>TODAS AS AVALIAÇÕES</p>
            <div className={styles.sectionAllAvaliations}>
                
                {allAvaliation?.rows ? (
                    allAvaliation.rows.map((avaliation,i) => {
                        return (
                            <div key={i + avaliation.title} className={styles.avaliationUser}>
                                <p className={styles.avaliationStars}>{avaliation.rating}</p>
                                <p className={styles.avaliationTitle}>{avaliation.title}</p>
                                <p className={styles.avaliationComment} >{avaliation.comment}</p>
                            </div>
                        )
                    })
                ) : null}
            </div>
            <PagCountServer count={allAvaliation?.count!}perPage={6}/>
        </section>
    )
}

export default AvaliationsItem