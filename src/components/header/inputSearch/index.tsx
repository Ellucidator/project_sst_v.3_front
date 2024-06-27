import searchIcon from "../../../../public/public/header/search.svg"
import styles from "./styles.module.scss"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import Button from "../../common/button"
import Input from "../../common/Input-label-components/input&Label"


const InputSearch = async() => {

    const handleSubmit = async (form: FormData) => {
        'use server'

        const search = form.get('search')?.toString()
        cookies().delete('catalog'+search)

        redirect(`/catalog/pesquisa/${search}`)
    }


    return (
        <form action={handleSubmit} className={styles.search}>
            <Input inputColor="light" 
                inputOptions={{ id: 'search',name: 'search', type: 'search', placeholder: 'Pesquisar',required: true }} />

            <Button btnModel="model8" btnAction="submit" iconElem={{ src: searchIcon.src, position: 'left', width: 20 }} />
        </form>
    )
}

export default InputSearch