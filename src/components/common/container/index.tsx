import Title, { TitleProps } from '../texts/tiltle'
import styles from './styles.module.scss'

type Props = {
    children: React.ReactNode
    model?: 'model1'|'model2'
    direction?: 'row'|'column'
    justifyContent?: string
    title?: TitleProps
    modelTw?:'container'
}

const Container = ({children,title,model='model1',direction='row',justifyContent,modelTw}:Props)=>{

    return(
        <div className={ `${modelTw} ${styles.container} ${styles[model]}`}>
            {title?<Title {...title}/>:<></>}
            <div className={styles.containerBody} style={{flexDirection:direction,justifyContent:justifyContent}}>
                {children}
            </div>
        </div>
    )
}

export default Container