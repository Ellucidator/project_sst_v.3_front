import Image from "next/image"
import searchIcon from "../../../../public/public/header/search.svg"
import styles from "./styles.module.scss"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"


const InputSearch = async() => {

    const handleSubmit = async (form: FormData) => {
        'use server'

        const search = form.get('search')?.toString()
        cookies().delete('catalog'+search)

        redirect(`/catalog/pesquisa/${search}`)
    }


    return (
        <form action={handleSubmit} className={styles.headerCenter}>
            <input
            name="search"
            type="search" 
            required
            className={styles.inputSearch} 
            placeholder="Pesquise por um produto"
            />
            <button type="submit" className={styles.btnSearch}>
                <Image src={searchIcon} alt="search" className={styles.searchIcon} />
            </button>
        </form>
    )
}

export default InputSearch