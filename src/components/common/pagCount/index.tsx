import { MouseEvent } from 'react'
import styles from './styles.module.scss'

type Props = {
    count: number
    perPage: number
    page: number
    setPage: (number: number) => void
}
const PagCount = ({count,perPage,page,setPage}: Props)=>{

    if(count <perPage) return (<></>)

    const pagCount = (count / perPage) > 1 ? Math.ceil(count / perPage) : 1

    const pagArray = Array.from({length: pagCount}, (_, index) => index + 1)



    return(
        <div className={styles.pagCount}>
            {pagArray.map((value,i)=>{
                let limit = 10
                if(page>5){
                    limit = limit + page - 5
                    if(limit >= pagArray.length){
                        if(i+1>pagArray.length-10){
                            return(
                                <button 
                                    type='button' 
                                    key={i} className={page===i+1 ? styles.btnActive : styles.btnCount}
                                    onClick={() => setPage(i+1)}
                                >{value}</button>
                            )
                        }
                    }
                    else if(i +1 > page -5 && i < limit){
                        return(
                            <button 
                                type='button' 
                                key={i} className={page===i+1 ? styles.btnActive : styles.btnCount}
                                onClick={() => setPage(i+1)}
                            
                            >{value}</button>
                        )
                    }
                }else if(i < limit){
                    return(
                        <button 
                            key={i} 
                            className={page===i+1 ? styles.btnActive : styles.btnCount}
                            onClick={() => setPage(i+1)}
                        >{value}</button>
                    )
                }
            })}
            {pagArray.length> 5 + page?<button>...</button>:<></>}
        </div>
    )
}

export default PagCount