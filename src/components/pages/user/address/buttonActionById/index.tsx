type Props = {
    buttonName: string
    idAction:number,
    actionFunction:Function
}
const ButtonActionById = async({buttonName,idAction,actionFunction}:Props) => {

    const handlerSubmit= async (form: FormData) => {
        'use server'
        const text = form.get('id')?.toString()
        await actionFunction(text!)

    }
    return (
        <form action={handlerSubmit} >
            <input hidden name="id" defaultValue={idAction} />
            <button type="submit">{buttonName}</button>
        </form>
    )
}

export default ButtonActionById