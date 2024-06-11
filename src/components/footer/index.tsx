import { companyService } from '@/services/companyService'
import styles from './styles.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import Button from '../common/button'
import geoIcon from '../../../public/public/common/geo-alt.svg'
import envelopeIcon from '../../../public/public/common/envelope.svg'
import telephoneIcon from '../../../public/public/common/telephone.svg'
import instagramIcon from '../../../public/public/common/instagram.svg'

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
                <Button btnModel='model7' btnAction='static' btnName={companyInfo.address} iconElem={{src:geoIcon, position:'left', width:15}} />
                <Button btnModel='model7' btnAction='static' btnName={companyInfo.email} iconElem={{src:envelopeIcon, position:'left', width:15}} />
                <Button btnModel='model7' btnAction='static' btnName={companyInfo.phone.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2 $3-$4')} iconElem={{src:telephoneIcon, position:'left', width:15}} />
            </div>

            <div className={styles.footerInfo}>
                {companyInfo.address_url ?
                    <Button btnModel='model8' btnAction='link_blank' href={companyInfo.address_url} btnName='Localização' iconElem={{src:geoIcon, position:'left', width:22}} />
                    : <></>}
                {companyInfo.instagram_url ?
                    <Button btnModel='model8' btnAction='link_blank' href={companyInfo.instagram_url} btnName={regex.exec(companyInfo.instagram_url)![1]} iconElem={{src:instagramIcon, position:'left', width:22}} />
                    : <></>}
            </div>

        </div>
    )
}

export default Footer