'use client'


type Props = {
    name: string
    value: string
}
const SetLocalStorage = ({name, value}:Props) => {
    localStorage.setItem(name, value)
    return(
        <></>
    )
}

export default SetLocalStorage