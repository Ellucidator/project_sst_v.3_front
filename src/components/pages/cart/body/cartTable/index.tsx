'use client'
import { ItemPromotion, ItemToCar } from '@/types/itemsTypes'
import styles from './styles.module.scss'
import Image from 'next/image'
import Cookies from 'js-cookie';
import { MouseEvent } from 'react';


type Props = {
    items?: ItemPromotion[]
}

const CartTable = ({ items }: Props) => {
    
    function updateQuantity(ev: MouseEvent<HTMLButtonElement>, id: number) {
        ev.preventDefault()
        const btnValue = ev.currentTarget.innerText
        
        const cookieValidation = Cookies.get('car')
        if(!cookieValidation)return

        const carCookie:ItemToCar[] = JSON.parse(cookieValidation)

        const item = carCookie.find((item)=> item.id === id)
        

        if(btnValue === '-'){
            item!.quantity = item!.quantity - 1
            Cookies.set('car', JSON.stringify(carCookie))

        }else if(btnValue === '+'){
            item!.quantity = item!.quantity + 1
            Cookies.set('car', JSON.stringify(carCookie))
        }


    }

    

    return (

        <table className={styles.tableItems}>
            <thead>
                <tr>
                    <td className={styles.tableTitle}>Produtos</td>
                    <td className={styles.tableTitle}>Qtd</td>
                    <td className={styles.tableTitle}>Preço</td>
                </tr>
            </thead>
            <tbody>
                {
                    items ? items.map((item) => {
                        return (
                            <>
                                <tr key={item.id}>
                                    <td className='flex gap-5 '>
                                        <Image src={`http://localhost:3000/files/${item.thumbnail_url}`} alt="banner" width={100} height={100} className={styles.cardBanner} />
                                        <p>{item.name}</p>
                                    </td>

                                    <td>
                                        <button onClick={(ev)=>{updateQuantity(ev,item.id)}}>-</button>
                                        {item.in_stock === 0 ? 'Indisponível' : item.quantity}
                                        <button onClick={(ev)=>{updateQuantity(ev,item.id)}}>+</button>
                                    </td>
                                    
                                    <td>
                                        {item.promotion ? (
                                            <>
                                                <p className={styles.pricePromotion}>{item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                                                <p className={styles.price}>{item.ItemPromotion.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                                            </>
                                        ) : (
                                            <p className={styles.price}>{item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                                        )}
                                    </td>
                                </tr>
                            </>
                        )
                    }) : null
                }
            </tbody>
        </table>

    )
}

export default CartTable