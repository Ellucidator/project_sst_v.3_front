import { cookies } from 'next/headers'
import Button, { NewButton } from '../../button'
import Loading from '../../clientOnlyComponents/loading'

type Props = {
    buttonAttribute:NewButton
    idAction: number | string
    actionFunction: Function
    loading?: boolean
    formOption?: React.FormHTMLAttributes<HTMLFormElement>
}
const ButtonActionById = async ({buttonAttribute, idAction, actionFunction, loading=true, formOption}: Props) => {
    let cookiePage = cookies().get('page')?.value
    if (!cookiePage) cookiePage = '1'


    const btnStyle = !isNaN(parseInt(buttonAttribute.btnName!)) ?
        cookiePage === buttonAttribute.btnName ?
            'model1' :
            'model3' :
            buttonAttribute.btnModel

    const handlerSubmit = async (form: FormData) => {
        'use server'
        const text = form.get('id')?.toString()

        await actionFunction(text!)

    }
    return (
        <form {...formOption} action={handlerSubmit} >
            {loading?<Loading model='modelArea' />:<></>}
            <input hidden name="id" defaultValue={idAction} />
            <Button {...buttonAttribute} btnModel={btnStyle} btnAction='submit' />
        </form>
    )
}

export default ButtonActionById