import { CepResponse } from "@/types/cepTypes"
import Image from "next/image"
import styles from './styles.module.scss'
import { cookies } from "next/headers"



const ResultCepCalculator = () => {
    const result = cookies().get('cep-result')?.value
    if(!result) return <></>

    const resultsCepCalculator: CepResponse[] = JSON.parse(result)

    return (
        <>
            {resultsCepCalculator.map((result) => {
                return (
                    <div key={result.name} className={styles.cepResultItem}>
                        <Image
                            src={result.company.picture ? result.company.picture : '/public/common/ban.svg'}
                            alt={result.company.name}
                            width={result.company.picture ? 70 : 30} height={result.company.picture ? 70 : 30}
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
    )
}

export default ResultCepCalculator