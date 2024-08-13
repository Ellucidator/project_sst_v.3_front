import ButtonActionById from '@/components/common/serverActionComponent/buttonActionById'
import styles from './styles.module.scss'
import { cookies } from 'next/headers'
import { btnActionService } from '@/services/btnActionService'

type Props = {
    count: number
    perPage: number
}
const PagCountServer = ({count,perPage}: Props)=>{
    let page:number = 1
    let pageCookie = cookies().get('page')?.value
    if(pageCookie)page = parseInt(pageCookie)

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
                                <ButtonActionById key={i} buttonAttribute={{btnName:value.toString()}} idAction={i+1} 
                                    actionFunction={btnActionService.setCookiePage}/>
                            )
                        }
                    }
                    else if(i +1 > page -5 && i < limit){
                        return(
                            <ButtonActionById key={i} buttonAttribute={{btnName:value.toString()}} idAction={i+1}   
                                actionFunction={btnActionService.setCookiePage}/>
                        )
                    }
                }else if(i < limit){
                    return(
                        <ButtonActionById key={i} buttonAttribute={{btnName:value.toString()}} idAction={i+1} 
                            actionFunction={btnActionService.setCookiePage}/>
                    )
                }
            })}
            {pagArray.length> 9 + page?<button>...</button>:<></>}
        </div>
    )
}

export default PagCountServer