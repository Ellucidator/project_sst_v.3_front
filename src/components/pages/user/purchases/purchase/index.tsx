import { userService } from '@/services/userService'
import styles from './styles.module.scss'
import Image from 'next/image'
import { revalidateTag } from 'next/cache'
import Title from '@/components/common/texts/tiltle';
import ButtonReturn from '@/components/common/clientOnlyComponents/btnReturn';
import PurchaseInfo from '@/components/common/cards/cardPurchase/purchaseInfo';
import ItemsTable from '@/components/common/itemsTable';

type Props = {
    purchaseId: string
}

const PurchasePage = async({purchaseId}: Props)=> {
    revalidateTag('one-purchase-user')

    const purchase = await userService.getUserPurchaseById(purchaseId)

    if (!purchase) return

    const purchaseStatus = purchase.status === 'Recebido' ? 1 :purchase.status === 'Transportadora' ? 2 : purchase.status === 'Enviado' ? 3 : purchase.status === 'Entregue' ? 4 : 0

    const [sendType, price, range] = purchase.frete!.split('-')

    return (
        <div className={styles.pageBody}>
            <div className={styles.titleContainer}>
                <ButtonReturn model='model2'/>
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
                        <p>{`Tipo: ${sendType}`}</p>
                        <p>{`Valor: ${parseFloat(price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`}</p>
                        <p>{`Prazo: ${range}`}</p>
                    </div>
                    <div className={styles.divAddressInfo}>
                        <p className={styles.title}>Metodo de Pagamento:</p>
                        <p>{purchase.payment_type}</p>
                    </div>
                    <div className={styles.divAddressInfo}>
                        <p className={styles.title}>Ultima atualização:</p>
                        <p>{purchase.status}</p>
                        <p>{new Date(purchase.updatedAt).toLocaleString('pt-BR')}</p>
                    </div>

                </div>

                <ItemsTable items={purchase} total={purchase.all_value} type='Purchase' model='model1' 
                    frete={parseFloat(price)} />
            </div>
        </div>
    )
}

export default PurchasePage