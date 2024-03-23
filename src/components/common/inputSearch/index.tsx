'use client'
import Image from "next/image"
import searchIcon from "../../../../public/public/header/search.svg"
import styles from "./styles.module.scss"

const inputSearch = () => {


    return (
        <div>
            <input type="search" className={styles.inputSearch} placeholder="Pesquise por um produto" />
            <button type="submit" className={styles.btnSearch}>
                <Image src={searchIcon} alt="search" className={styles.searchIcon} />
            </button>
        </div>
    )
}

export default inputSearch