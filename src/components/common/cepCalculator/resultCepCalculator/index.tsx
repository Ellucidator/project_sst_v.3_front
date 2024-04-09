'use client'
import { CepResponse } from "@/types/cepTypes"
import Image from "next/image"
import styles from './styles.module.scss'
import { useFormStatus } from "react-dom"
import Loading from "../../loading"
type Props = {
    resultsCepCalculator: CepResponse[]
}

const ResultCepCalculator = ({ resultsCepCalculator }: Props) => {
    const { pending } = useFormStatus()
    return (
        <>
            {pending ? (
                <Loading />
            ) : (
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
                                {
                                    result.error ?
                                        <p>{`${result.name} - ${result.error}`}</p> :

                                        <p>{`${result.name} - ${parseFloat(result.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} - De ${result.delivery_range.min} a ${result.delivery_range.max} Dias uteis`}</p>
                                }
                            </div>
                        )
                    })}
                </>
            )}
        </>
    )
}

export default ResultCepCalculator