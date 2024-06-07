import { cookies } from 'next/headers'
import Button from '../../button'
import Loading from '../../loading'

type Props = {
    btnModel?: 'model1' | 'model2' | 'model3' | 'model4' | 'model5'| 'model6'
    buttonName: string
    idAction: number | string
    actionFunction: Function
    fontSize?: string
}
const ButtonActionById = async ({ buttonName, idAction, actionFunction, fontSize='larger',btnModel='model1' }: Props) => {
    let cookiePage = cookies().get('page')?.value
    if (!cookiePage) cookiePage = '1'


    const btnStyle = !isNaN(parseInt(buttonName)) ?
        cookiePage === buttonName ?
            'model1' :
            'model3' :
            btnModel

    const handlerSubmit = async (form: FormData) => {
        'use server'
        const text = form.get('id')?.toString()

        await actionFunction(text!)

    }
    return (
        <form action={handlerSubmit} >
            <Loading model='modelArea' />
            <input hidden name="id" defaultValue={idAction} />
            <Button btnOption={{style: {fontSize}}} btnModel={btnStyle} btnAction='submit' btnName={buttonName} />
        </form>
    )
}

export default ButtonActionById