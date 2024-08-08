'use client'
import { useEffect } from "react"

type Props = {
    name: string
    value: string
}
const SetLocalStorage = ({name, value}:Props) => {
    useEffect(() => {
        localStorage.setItem(name, value)
    },[])
    return(
        <></>
    )
}

export default SetLocalStorage