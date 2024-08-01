import { CepResponse } from "@/types/cepTypes"
import Image from "next/image"
import styles from './styles.module.scss'


type Props = {
    resultCepCalc?: CepResponse[]
    type?:'form'|'static'
}
const ResultCepCalculator = ({ resultCepCalc, type='static' }: Props) => {
    if(!resultCepCalc || resultCepCalc.length === 0) return <></>

    return (
        <>
            {resultCepCalc.map((result,i) => {
                return (
                    <div key={result.name} className={styles.cepResultItem}>
                        {type === 'form'?
                            <input required type="radio" defaultChecked={i===0?true:false} name="cep-result" value={result.error?result.error:`${result.name}-${result.price}-De ${result.delivery_range.min} a ${result.delivery_range.max} Dias uteis`}></input>
                            :<></>
                        }
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