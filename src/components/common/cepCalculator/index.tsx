'use client'

import { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { cepService } from '@/services/cepService'


const CepCalculator = () => {
    const [cepResponse, setCepResponse] = useState([])

    const handlerSubmit = async (ev: React.FormEvent ) => {
        ev.preventDefault()
        
        const quantity = document.getElementById('quantity') as HTMLInputElement
        const cep = document.getElementById('cep') as HTMLInputElement
        console.log(cep.value, quantity.value)

        
        const response = await cepService.cepCalculator(cep.value, quantity.value)

        console.log(response)

        setCepResponse(response)
    }
    return (
        <>
            <div className={styles.cep} >
                <form onSubmit={handlerSubmit}>
                    <p className={styles.title}>Fretes e prazos</p>

                    <div className={styles.divInput}>
                        <label htmlFor="cep">CEP:</label>
                        <input className={styles.inputCep} type="number" name="cep" id="cep" />
                        <button  type="submit" className={styles.btnCep}>Calcular</button>
                    </div>
                </form>
                <div className={styles.cepResult}>
                    {cepResponse?(
                        <div>
                            {/* <p>Frete: {cepResponse[0].name}</p> */}
                        </div>
                    ):(
                        <p>Cep Invalido</p>
                    )}
                </div>
            </div>
        </>
    )
}

export default CepCalculator