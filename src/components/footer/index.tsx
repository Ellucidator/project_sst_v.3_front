import { companyService } from '@/services/companyService'
import styles from './styles.module.scss'
import Link from 'next/link'
import Image from 'next/image'

const Footer = async () => {
    const companyInfo = await companyService.getCompanyInfo()
    const regex = /\/([^\/]+?)(?:\?|$)/;

    return (
        <div className={styles.footer}>
            <Link href="/" className={styles.logoFooter}>
                <Image src='/public/header/logoHeader.svg' alt="logo" className={styles.logo} width={200} height={75} />
            </Link>
            <div className={styles.footerInfo}>
                <p>{`© ${companyInfo.name} | CNPJ:${companyInfo.cnpj}`}</p>
                <div className={styles.divIcon} >
                    <Image src='/public/common/geo-alt.svg' alt="logo" className={styles.icon} width={15} height={15} />
                    <p>{companyInfo.address}</p>
                </div>
                <div className={styles.divIcon}>
                    <Image src='/public/common/envelope.svg' alt="logo" className={styles.icon} width={15} height={15} />
                    <p>{companyInfo.email}</p>
                </div>
                <div className={styles.divIcon}>
                    <Image src='/public/common/telephone.svg' alt="logo" className={styles.icon} width={15} height={15} />
                    <p>{companyInfo.phone.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2 $3-$4')}</p>
                </div>
            </div>
            <div className={styles.footerInfo}>
                {companyInfo.address_url ?
                    <Link href={companyInfo.address_url} className={styles.divIcon + ' ' + styles.link} target='_blank'>
                            <Image src='/public/common/geo-alt.svg' alt="logo" className={styles.icon} width={22} height={22} />
                            <p className={styles.text}>Localização</p>
                    </Link>
                    : <></>}
                {companyInfo.instagram_url ?
                    <Link href={companyInfo.instagram_url} className={styles.divIcon + ' ' + styles.link} target='_blank' >
                            <Image src='/public/common/instagram.svg' alt="logo" className={styles.icon} width={22} height={22} />
                            <p className={styles.text}>{regex.exec(companyInfo.instagram_url)![1]}</p>

                    </Link>
                    : <></>}
            </div>

        </div>
    )
}

export default Footer