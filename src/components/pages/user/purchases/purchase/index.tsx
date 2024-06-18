import { userService } from '@/services/userService'
import styles from './styles.module.scss'
import Image from 'next/image'
import { revalidateTag } from 'next/cache'
import Title from '@/components/common/texts/tiltle';
import ButtonReturn from '@/components/common/clientOnlyComponents/btnReturn';
import PurchaseInfo from '@/components/common/cards/cardPurchase/purchaseInfo';

type Props = {
    purchaseId: string
}

const PurchasePage = async({purchaseId}: Props)=> {
    revalidateTag('one-purchase-user')

    const purchase = await userService.getUserPurchaseById(purchaseId)
    if (!purchase) return

    const purchaseStatus = purchase.status === 'Recebido' ? 1 :purchase.status === 'Transportadora' ? 2 : purchase.status === 'Enviado' ? 3 : purchase.status === 'Entregue' ? 4 : 0


    return (
        <div className={styles.pageBody}>
            <div className={styles.titleContainer}>
                <ButtonReturn />
                <Title fontSize="25px" model='model2' titleText={`Pedido Nº ${purchase.id}`} />
            </div>

            <div className={styles.userPurchasesContainer}>
                <PurchaseInfo purchase={purchase} />

                <div className={styles.divStatus}>
                    <div className={purchaseStatus>0?styles.statusActive:styles.status}>
                        <Image src='/public/header/shop.svg' alt="search" className={styles.chatIcon}
                            width={30} height={30} />
                        <p>Recebido</p>
                    </div>

                    <div className={purchaseStatus>1?styles.lineActive:styles.line}></div>
                    <div className={purchaseStatus>1?styles.statusActive:styles.status}>
                        <Image src='/public/common/box-seam.svg' alt="search" className={styles.chatIcon}
                            width={30} height={30} />
                        <p>Transportadora</p>
                    </div>

                    <div className={purchaseStatus>2?styles.lineActive:styles.line}></div>
                    <div className={purchaseStatus>2?styles.statusActive:styles.status}>
                        <Image src='/public/common/truck.svg' alt="search" className={styles.chatIcon}
                            width={30} height={30} />
                        <p>Enviado</p>
                    </div>

                    <div className={purchaseStatus>3?styles.lineActive:styles.line}></div>
                    <div className={purchaseStatus>3?styles.statusActive:styles.status}>
                        <Image src='/public/common/house-check.svg' alt="search" className={styles.chatIcon}
                            width={30} height={30} />
                        <p>Entregue</p>
                    </div>
                </div>

                <div className={styles.divAddress}>

                    <div className={styles.divAddressInfo}>

                        <p className={styles.title}>Endereço de entrega:</p>

                        <p>{`Destinatario: ${purchase.Address.receiver_name}`}</p>
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

export default PurchasePage