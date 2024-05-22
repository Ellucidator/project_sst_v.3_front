import { userService } from '@/services/userService'
import styles from './page.module.scss'
import PurchaseInfo from '@/components/common/cardPurchase/purchaseInfo'
import Image from 'next/image'
import { cookieService } from '@/services/cookieService'
import { redirect } from 'next/navigation'


export default async function UserPage({ params }: { params: { purchaseId: string } }) {
    const user = await cookieService.verifySession()
    if (!user) redirect('/')

    const purchase = await userService.getUserPurchaseById(params.purchaseId)



    if (!purchase) return

    return (
        <div className={styles.pageBody}>
            <p className={styles.userPurchaseTitle}>Pedido Nº {purchase.id}</p>

            <div className={styles.userPurchasesContainer}>
                <PurchaseInfo purchase={purchase} />

                <div className={styles.divStatus}>
                    <div className={purchase.status==='Recebido'?styles.statusActive:styles.status}>
                        <Image src='/public/header/shop.svg' alt="search" className={styles.chatIcon}
                            width={30} height={30} />
                        <p>Recebido</p>
                    </div>

                    <div className={purchase.status==='Transportadora'?styles.lineActive:styles.line}></div>
                    <div className={purchase.status==='Transportadora'?styles.statusActive:styles.status}>
                        <Image src='/public/common/box-seam.svg' alt="search" className={styles.chatIcon}
                            width={30} height={30} />
                        <p>Transportadora</p>
                    </div>

                    <div className={purchase.status==='Enviado'?styles.lineActive:styles.line}></div>
                    <div className={purchase.status==='Enviado'?styles.statusActive:styles.status}>
                        <Image src='/public/common/truck.svg' alt="search" className={styles.chatIcon}
                            width={30} height={30} />
                        <p>Enviado</p>
                    </div>

                    <div className={purchase.status==='Entregue'?styles.lineActive:styles.line}></div>
                    <div className={purchase.status==='Entregue'?styles.statusActive:styles.status}>
                        <Image src='/public/common/house-check.svg' alt="search" className={styles.chatIcon}
                            width={30} height={30} />
                        <p>Entregue</p>
                    </div>
                </div>

                <div className={styles.divAddress}>

                    <div className={styles.divAddressInfo}>

                        <p className={styles.title}>Endereço de entrega:</p>

                        <p>{`Destinatario: ${user.first_name} ${user.last_name}`}</p>
                        <p>{`${purchase.Address.street} - ${purchase.Address.neighborhood} - nº${purchase.Address.house_number}`}</p>
                        <p>{`${purchase.Address.complement} - ${purchase.Address.reference_point}`}</p>
                        <p>{`${purchase.Address.city}, ${purchase.Address.state}, ${purchase.Address.zip_code}`}</p>
                        <p>{`Telefone: ${purchase.Address.phone_number.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2 $3-$4')}`}</p>
                    </div>

                    <div className={styles.divAddressInfo}>

                        <p className={styles.title}>Metodo de Envio:</p>
                        <p>...</p>
                    </div>
                    <div className={styles.divAddressInfo}>
                        <p className={styles.title}>Metodo de Pagamento:</p>
                        <p>...</p>
                    </div>

                </div>

                <div className={styles.divInfo}>
                    <div className={styles.divItems}>
                        <p className={styles.titleItems}>Itens:</p>
                        {purchase.ItemSells.map((elem) => {
                            return (
                                <div key={elem.Item.name} className={styles.item}>
                                    <Image src={`http://localhost:3000/files/${elem.Item.thumbnail_url}`} alt={elem.Item.name} width={50} height={50} />
                                    <p>{`${elem.quantity}x ${elem.Item.name}`}</p>
                                    <p>{elem.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}