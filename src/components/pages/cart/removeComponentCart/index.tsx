'use client'

import { useEffect } from "react"

const RemoveComponentCart = () => {
    useEffect(() => {
        const component = document.getElementById('cartCount')
        component!.style.display = 'none'
    })

    return <></>
}



export default RemoveComponentCart