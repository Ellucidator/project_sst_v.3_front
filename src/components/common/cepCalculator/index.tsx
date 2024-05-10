
import { cookies } from 'next/headers'
import styles from './styles.module.scss'
import { revalidateTag } from 'next/cache'
import InputQuantity from '../inputQuantity'
import { CepResponse } from '@/types/cepTypes'
import Image from 'next/image'
import Loading from '../loading'
import Link from 'next/link'
import { cepCalculator } from '@/services/cepService'
import ResultCepCalculator from './resultCepCalculator'
import { Item, ItemCharacteristics } from '@/types/itemsTypes'

type Props = {
    quantityInStock?: number[],
    item?: Item ,
    itemsCharacteristics?: ItemCharacteristics[]
}

const CepCalculator = async ({ quantityInStock, item, itemsCharacteristics}: Props) => {
    
    let resultsCepCalculator: CepResponse[]=[]

    if(item){

        const cepCookie = cookies().get('cep-calculator')?.value

        if(cepCookie){
            const {cep,quantity}:{cep:number,quantity:number} = JSON.parse(cepCookie)
            if(cep && quantity){
                resultsCepCalculator = await cepCalculator(cep,[{...item.ItemCharacteristic!,quantity}])
            }
            
        }
    }
    else{
        const cepCookie = cookies().get('cep-calculator-multi')?.value
        if(cepCookie){
            const cep:number = JSON.parse(cepCookie)
            resultsCepCalculator = await cepCalculator(cep, itemsCharacteristics!)
        }
    }

    


    async function formAction(form: FormData) {
        'use server'

        const cep = form.get('cep')?.toString()
        const quantity = form.get('quantity')?.toString()

        
        if(item){
            cookies().set('cep-calculator', JSON.stringify({ cep, quantity }),
            {
                maxAge: 0
            })
        }else{
            cookies().set('cep-calculator-multi', JSON.stringify(cep),
            {
                maxAge: 0
            })
        }


        revalidateTag('cep-calculator-fetch')

    }
    return (
        <>
            <div className={styles.cep} >
                <form action={formAction} >
                    <p className={styles.title}>Fretes e prazos</p>

                    {item ? (
                        <div className={styles.divInput}>
                            <p>Produto: {item.name}</p>
                            <InputQuantity in_stock={item.in_stock} quantityInStock={quantityInStock!} />
                        </div>
                    ) : <></>}

                    <div className={styles.divInput}>
                        <label htmlFor="cep">CEP:</label>
                        <input
                            className={styles.inputCep}
                            required
                            type="number"
                            name="cep"
                            id="cep"
                            placeholder='10000100'
                        />
                        <button type="submit" className={styles.btnCep}>Calcular</button>
                    </div>
                    <div className={styles.cepResult}>
                        {resultsCepCalculator ? (
                            <ResultCepCalculator resultsCepCalculator={resultsCepCalculator} />
                        ) : (
                            <>
                                <Loading />
                            </>
                        )}
                    </div>
                </form>

            </div>
        </>
    )
}

export default CepCalculator