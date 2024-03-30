import { catalogService } from '@/services/catalogService'
import styles from './page.module.scss'
import Image from 'next/image'

export default async function Item({ params }: { params: { id: string } }){
    const item = await catalogService.getOneItem(params.id)

    
    


    return(
        <div className={styles.pageItem}>
            <div className={`container ${styles.itemContainer}`}>
                <p>{item.name}</p>
                <div className={styles.cardItem}>
                    <div className={styles.itemBaners}>
                        <Image 
                        src={`http://localhost:3000/files/${item.images?.key[0]}`}
                        alt=''
                        width={300}
                        height={300}
                        />
                    </div>
                    <div className={styles.itemBuy}>

                    </div>
                </div>
                <div className={styles.cep} ></div>
                <div className={styles.itemDescription}></div>
                <div className={styles.avaliations} ></div>
            </div>
        </div>
    )
}