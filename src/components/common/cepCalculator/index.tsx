
import { cookies } from 'next/headers'
import styles from './styles.module.scss'
import { revalidateTag } from 'next/cache'
import InputQuantity from '../inputQuantity'
import { CepResponse } from '@/types/cepTypes'
import Image from 'next/image'
import Loading from '../loading'
import Link from 'next/link'
import { cepCalculator } from '@/services/cepService'

type Props = {
    in_stock: number
    quantity: number[]
    itemName: string
}
const CepCalculator = async ({ in_stock, quantity, itemName }: Props) => {
    const resultsCepCalculator: CepResponse[] = await cepCalculator()

    async function formAction(form: FormData) {
        'use server'
        const cep = form.get('cep')?.toString()
        const quantity = form.get('quantity')?.toString()

        if (!cep || !quantity) return

        await new Promise(resolve => setTimeout(resolve, 3000))

        cookies().set('cep-calculator', JSON.stringify({ cep, quantity }),
            {
                maxAge: 60
            })

        revalidateTag('cep-calculator-fetch')

    }
    return (
        <>
            <div className={styles.cep} >
                <form action={formAction} >
                    <p className={styles.title}>Fretes e prazos</p>

                    <div className={styles.divInput}>
                        <p>Produto: {itemName}</p>
                        <InputQuantity in_stock={in_stock} quantity={quantity} />
                    </div>
                    <div className={styles.divInput}>
                        <label htmlFor="cep">CEP:</label>
                        <input className={styles.inputCep} type="number" name="cep" id="cep" />
                        <button type="submit" className={styles.btnCep}>Calcular</button>
                    </div>
                    <div className={styles.cepResult}>
                    {resultsCepCalculator ? (
                        <>
                            {resultsCepCalculator.map((result) => {
                                return (
                                    <div key={result.name} className={styles.cepResultItem}>
                                        <Image 
                                            src={result.company.picture} 
                                            alt={result.company.name} 
                                            width={70} height={70} 
                                            className={styles.cepResultImg}
                                            />
                                            
                                        <p>{`${result.name} - ${parseFloat(result.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} - De ${result.delivery_range.min} a ${result.delivery_range.max} Dias uteis`}</p>
                                    </div>
                                )
                            })}
                        </>
                    ) : (
                        <>
                            <Loading/>
                        </>
                    )}
                </div>
                </form>

            </div>
        </>
    )
}

export default CepCalculator