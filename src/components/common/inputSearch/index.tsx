import Image from "next/image"
import searchIcon from "../../../../public/public/header/search.svg"
import styles from "./styles.module.scss"
import { useEffect, useState } from "react"
import { catalogService } from "@/services/catalogService"
import { Item } from "@/types/itemsTypes"
import SearchModal from "./searchModal"

const InputSearch = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [inputValue, setInputValue] = useState("");
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setInputValue(event.target.value);
    };

    const getItems = async ()=>{
        if(!inputValue)return setItems([]);

        const response = await catalogService.getSearchItems(inputValue)
        setItems(response)
const InputSearch = async() => {
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