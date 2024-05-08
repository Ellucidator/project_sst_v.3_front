'use client'
import { ItemPromotion, ItemToCar } from '@/types/itemsTypes'
import styles from './styles.module.scss'
import Image from 'next/image'
import Cookies from 'js-cookie';
import { MouseEvent } from 'react';
import { useRouter } from 'next/navigation';


type Props = {
    items?: ItemPromotion[]
}

const CartTable = ({ items }: Props) => {
    const router = useRouter()
    async function updateQuantity(ev: MouseEvent<HTMLButtonElement>, item: ItemPromotion) {
        ev.preventDefault()
        const btnValue = ev.currentTarget.innerText
        
        const cookieValidation = Cookies.get('car')
        if(!cookieValidation)return

        const carCookie:ItemToCar[] = JSON.parse(cookieValidation)

        const itemVerify = carCookie.find((elem)=> elem.id === item.id)
        

        if(btnValue === '-')itemVerify!.quantity = itemVerify!.quantity - 1
        else if(btnValue === '+')itemVerify!.quantity = itemVerify!.quantity + 1
        else if(btnValue === 'x')itemVerify!.quantity = 0

        if(itemVerify!.quantity > 0){
            if(itemVerify!.quantity > item.in_stock)return

            Cookies.set('car', JSON.stringify(carCookie))

        }else{
            Cookies.set('car', JSON.stringify(carCookie.filter((elem)=> elem.id !== item.id)))
        }
        router.refresh()
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
                                    <td className='flex gap-5'>
                                        <Image src={`http://localhost:3000/files/${item.thumbnail_url}`} alt="banner" width={100} height={100} className={styles.cardBanner} />
                                        <p>{item.name}</p>
                                    </td>

                                    <td className={styles.quantity}>
                                        <button className={styles.btnQuantity} onClick={async(ev)=>{await updateQuantity(ev,item)}}>-</button>
                                        {item.in_stock === 0 ? 'Indisponível' : item.quantity}
                                        <button className={styles.btnQuantity} disabled={item.in_stock === item.quantity} onClick={async(ev)=>{await updateQuantity(ev,item)}}>+</button>
                                    </td>
                                    
                                    <td>
                                        {item.promotion ? (
                                            <>
                                                <p className={styles.pricePromotion}>{(item.price * item.quantity!).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                                                <p className={styles.price}>{(item.ItemPromotion.price * item.quantity!).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                                            </>
                                        ) : (
                                            <p className={styles.price}>{(item.price * item.quantity!).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                                        )}
                                    </td>
                                    <td>
                                        <button className={styles.btnDel} onClick={async(ev)=>{await updateQuantity(ev,item)}}>x</button>
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