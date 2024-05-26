import { cookies } from 'next/headers'
import styles from './styles.module.scss'

type Props = {
    buttonName: string
    idAction:number,
    actionFunction:Function
}
const ButtonActionById = async({buttonName,idAction,actionFunction}:Props) => {
    let cookiePage = cookies().get('page')?.value
    if(!cookiePage) cookiePage = '1' 

    
    const btnStyle = !isNaN(parseInt(buttonName))?
    cookiePage===buttonName?
    styles.btnCountActive:
    styles.btnCount:
    styles.formButton

    const handlerSubmit= async (form: FormData) => {
        'use server'
        const text = form.get('id')?.toString()
        
        await actionFunction(text!)

    }
    return (
        <form action={handlerSubmit} >
            <input hidden name="id" defaultValue={idAction} />
            <button className={btnStyle} type="submit">{buttonName}</button>
        </form>
    )
}

export default ButtonActionById