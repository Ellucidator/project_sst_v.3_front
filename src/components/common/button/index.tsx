import Link from 'next/link'
import styles from './styles.module.scss'
import React from 'react'
import Image from 'next/image'

type Props = {
    btnOption?: React.ButtonHTMLAttributes<HTMLButtonElement>
    href?: string
    btnModel: 'model1' | 'model2' | 'model3' | 'model4' | 'model5'
    btnWidth?: string
    btnName: string
    btnAction?: 'link' | 'submit' | 'button'
    subTitle?: string
    iconUrl?: string
}

const Button = ({ btnOption, btnModel, btnName, btnAction = 'button', href, btnWidth = 'fit-content', subTitle, iconUrl }: Props) => {

    if (btnAction === 'link') {
        return (
            <Link style={{ width: btnWidth }} href={href!} className={styles.btn + ' ' + styles[btnModel]} >
                {btnName}
            </Link>
        )
    } else {
        return (
            <button type={btnAction}
                style={{ width: btnWidth }}
                className={styles.btn + ' ' + styles[btnModel]}
                {...btnOption}
            >
                {subTitle ?
                    <div className={styles.btnTexts}>
                        <p className={styles.title}>{btnName}</p>

                        <p className={styles.subTitle}>{subTitle}</p>
                    </div>
                    : btnName}
                {iconUrl?<Image src={iconUrl} alt="icon" className={styles.icon} width={35} height={35} />:<></>}
            </button>
        )
    }

}


export default Button