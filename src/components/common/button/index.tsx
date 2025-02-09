import Link from 'next/link'
import styles from './styles.module.scss'
import React from 'react'
import Image from 'next/image'

export interface NewButton {
    btnOption?: React.ButtonHTMLAttributes<HTMLButtonElement>
    href?: string
    btnModel?: 'model1' | 'model2' | 'model3' | 'model4' | 'model5' | 'model6' | 'model7' | 'model8'| 'model9'| 'model10'
    btnWidth?: string
    btnName?: string
    btnAction?: 'link'| 'link_blank' | 'submit' | 'button' | 'static'
    subTitle?: string
    iconElem?: {
        src: string
        srcR?: string
        position: 'left' | 'right' | 'left&right'
        width: number
        widthR?: number
    }
    arrow?:'arrowUp'|'arrowDown'
}

const Button = ({ btnOption, btnModel='model1', btnName, btnAction = 'button', href, btnWidth = 'fit-content', subTitle, iconElem, arrow }: NewButton) => {
    if (btnAction === 'link' || btnAction === 'link_blank') {
        return (
            <Link target={btnAction === 'link_blank' ? '_blank' : ''} style={{ width: btnWidth }} href={href!} className={styles.btn + ' ' + styles[btnModel]} >
                {iconElem && iconElem.position === 'left' ? <Image src={iconElem.src} alt="icon" className={styles.icon} width={iconElem.width} height={iconElem.width} /> : <></>}
                {btnName}
                {iconElem && iconElem.position === 'right' ? <Image src={iconElem.src} alt="icon" className={styles.icon} width={iconElem.width} height={iconElem.width} /> : <></>}
            </Link>
        )
    } else if (btnAction === 'static') {
        return (
            <div style={{ width: btnWidth }} className={styles.btn + ' ' + styles[btnModel]} >
                {iconElem && iconElem.position === 'left' ? <Image src={iconElem.src} alt="icon" className={styles.icon} width={iconElem.width} height={iconElem.width} /> : <></>}
                {btnName}
                {iconElem && iconElem.position === 'right' ? <Image src={iconElem.src} alt="icon" className={styles.icon} width={iconElem.width} height={iconElem.width} /> : <></>}
            </div>
        )
    } else {
        return (
            <button type={btnAction}
                style={{ width: btnWidth }}
                className={styles.btn + ' ' + styles[btnModel]}
                {...btnOption}
            >
                {iconElem && (iconElem.position === 'left' || iconElem.position === 'left&right') ?
                    <Image src={iconElem.src} alt="icon" className={styles.icon} width={iconElem.width} height={iconElem.width} /> : <></>}
                {subTitle ?
                    <div className={styles.btnTexts}>
                        <p className={styles.title}>{btnName}</p>

                        <p className={`${styles.subTitle}`}>{subTitle}</p>
                    </div>
                    : btnName}
                {iconElem && (iconElem.position === 'right'|| iconElem.position === 'left&right') ? 
                    <Image 
                        src={iconElem.srcR?iconElem.srcR:iconElem.src} alt="icon" 
                        className={arrow?styles[arrow]:styles.icon} 
                        width={iconElem.widthR?iconElem.widthR:iconElem.width} height={iconElem.width} /> : <></>}
            </button>
        )
    }

}


export default Button