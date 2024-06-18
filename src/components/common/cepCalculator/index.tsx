import { cookies } from 'next/headers'
import styles from './styles.module.scss'
import InputQuantity from './inputQuantity'
import { cepCalculator } from '@/services/cepService'
import { Item, ItemCharacteristics } from '@/types/itemsTypes'
import Input from '../Input-label-components/input&Label'
import Button from '../button'
import ResultCepCalculator from './resultCepCalculator'
import Loading from '../clientOnlyComponents/loading'
import Title from '../texts/tiltle'

type Props = {
    quantityInStock?: number[],
    item?: Item,
    itemsCharacteristics?: ItemCharacteristics[]
    type?: 'unique' | 'multi'
}

const CepCalculator = async ({ quantityInStock, item, itemsCharacteristics, type = 'unique' }: Props) => {


    async function formAction(form: FormData) {
        'use server'

        const cep = form.get('cep')?.toString()!
        const quantity = parseInt(form.get('quantity')?.toString()!)
        let inf: ItemCharacteristics[] = []

        if (type === 'unique') inf = [{ ...(item?.ItemCharacteristic!), quantity }]
        else inf = itemsCharacteristics!

        const result = await cepCalculator(cep, inf)

        cookies().set('cep-result', JSON.stringify(result),
            {
                maxAge: 0
            })
    }

    return (

        <form action={formAction} className={styles.cep} >
            <Title titleText='Fretes e prazos' fontSize='22px' model='simple' width='fit-content' fontWeight='bold' />

            {type === 'unique' ? (
                <div className={styles.divInput}>
                    <p>Produto: {item!.name}</p>
                    <InputQuantity in_stock={item!.in_stock} quantityInStock={quantityInStock!} />
                </div>
            ) : <></>}

            <div className={styles.divInput}>
                <Input labelText='CEP:' mode='label&input' inputOptions={{ type: 'number', name: 'cep', id: 'cep', placeholder: '10000100' }} inputColor='dark' direction='row' />
                <Button btnAction='submit' btnName='Calcular' btnModel='model3' />
            </div>
            <div className={styles.cepResult}>
                <Loading model='modelLocal' />
                <ResultCepCalculator />
            </div>
        </form>
    )
}

export default CepCalculator