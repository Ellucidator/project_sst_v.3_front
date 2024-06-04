import Link from 'next/link'
import styles from './styles.module.scss'
import React from 'react'

type Props = {
    btnOption?: React.ButtonHTMLAttributes<HTMLButtonElement>
    href?: string
    btnModel: 'model1' | 'model2' | 'model3' | 'model4' 
    btnWidth?: string
    btnName: string
    btnAction?:'link'|'submit'|'button'
}

const Button = ({btnOption,btnModel,btnName,btnAction='button',href,btnWidth='fit-content'}:Props)=>{

    if(btnAction === 'link'){
        return(
            <Link style={{width:btnWidth}} href={href!} className={styles.btn + ' ' + styles[btnModel]} >
                {btnName}
            </Link>
        )
    }else{
        return(
            <button type={btnAction}
                style={{width:btnWidth}} 
                className={styles.btn + ' ' + styles[btnModel]} 
                {...btnOption}
                >
                    {btnName}
                </button>
        )
    }
    
}


export default Button