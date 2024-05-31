import { cookies } from 'next/headers'
import Button from '../../button'

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
    'model1':
    'model3':
    'model1'

    const handlerSubmit= async (form: FormData) => {
        'use server'
        const text = form.get('id')?.toString()
        
        await actionFunction(text!)

    }
    return (
        <form action={handlerSubmit} >
            <input hidden name="id" defaultValue={idAction} />
            <Button btnModel={btnStyle} btnAction='submit' btnName={buttonName} />
        </form>
    )
}

export default ButtonActionById