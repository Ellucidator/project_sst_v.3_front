'use client'
import Image from "next/image"
import searchIcon from "../../../../public/public/header/search.svg"
import styles from "./styles.module.scss"
import { useState } from "react"

const InputSearch = () => {
    const [items, setItems] = useState([]);
    const [inputValue, setInputValue] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const getItems = async ()=>{
        
    }

    return (
        <div className={styles.headerCenter}>
            <input 
            type="search" 
            className={styles.inputSearch} 
            placeholder="Pesquise por um produto"
            value={inputValue}
            onChange={handleChange}
            />
            <button type="button" className={styles.btnSearch}>
                <Image src={searchIcon} alt="search" className={styles.searchIcon} />
            </button>
        </div>
    )
}

export default InputSearch