import Title, { TitleProps } from '../texts/tiltle'
import styles from './styles.module.scss'

export interface ContainerAttributes {
    children: React.ReactNode
    model?: 'model1'|'model2'
    direction?: 'row'|'column'
    justifyContent?: string
    title?: TitleProps
    modelTw?:'container'
}

const Container = ({children,title,model='model1',direction='row',justifyContent,modelTw}:ContainerAttributes)=>{

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