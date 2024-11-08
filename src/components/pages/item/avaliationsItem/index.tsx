import { userService } from '@/services/userService'
import Stars from './star'
import styles from './styles.module.scss'
import { Avaliation, AvaliationAndCount } from '@/types/avaliationTypes'
import PagCountServer from '../../../common/serverActionComponent/pagCount'
import Button from '../../../common/button'
import Input from '../../../common/Input-label-components/input&Label'
import Loading from '../../../common/clientOnlyComponents/loading'
import Image from 'next/image'

type Props = {
    item_id: number | string
    userAvaliation?: Avaliation | false
    allAvaliation?: AvaliationAndCount
}
const AvaliationsItem = async ({ item_id, userAvaliation, allAvaliation }: Props) => {
    const formAvaliationAction = async (form: FormData) => {
        'use server'

        const title = form.get('title')?.toString()
        const comment = form.get('comment')?.toString()
        const rating = form.get('stars')?.toString()


        if (!title || !comment || !rating) return
        
        await userService.createAvaliation({ title, comment, rating, item_id })
    }

    return (
        <section className={styles.avaliation}>
            <p className={styles.avaliationTitleP}>SUA AVALIAÇÃO</p>
            <div className={styles.sectionAvaliationUser}>
                <form className={styles.formAvaliations} action={formAvaliationAction}>

                    <Stars />

                    <Input inputOptions={{ type: 'text', name: 'title', placeholder: 'Título' }} inputColor='dark' />
                    <textarea className={styles.inputComment} name='comment' placeholder='Comentario' />
                    <Button btnWidth='100%' btnModel='model1' btnName='ENVIAR' btnAction='submit' />
                    <Loading model='modelLocal'/>
                </form>
                {userAvaliation ? (
                    <section className={styles.avaliationUser}>
                        <p className={styles.avaliationStars}>
                            {userAvaliation.rating}
                            <Image className={styles.star} src='/public/common/star.svg' alt="star" width={20} height={20} />
                        </p>
                        <p className={styles.avaliationTitle}>{userAvaliation.title}</p>
                        <p className={styles.avaliationComment} >{userAvaliation.comment}</p>
                    </section>
                ) : null}
            </div>
            <p className={styles.avaliationTitleP}>TODAS AS AVALIAÇÕES</p>
            <div className={styles.sectionAllAvaliations}>
                
                {allAvaliation?.rows ? (
                    allAvaliation.rows.map((avaliation,i) => {
                        if(userAvaliation && userAvaliation.user_id === avaliation.user_id) return <></>
                        return (
                            <div key={i + avaliation.title} className={styles.avaliationUser}>
                                <p className={styles.avaliationStars}>
                                    {avaliation.rating}
                                    <Image className={styles.star} src='/public/common/star.svg' alt="star" width={20} height={20} />
                                </p>
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