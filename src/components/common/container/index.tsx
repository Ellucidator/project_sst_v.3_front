import Title from '../tiltle'
import styles from './styles.module.scss'

type Props = {
    children: React.ReactNode
    model?: 'model1'|'model2'
    direction?: 'row'|'column'
    title?: string
    titleModel?: 'model1'|'model2'|'model3'|'model4'|'model5'
}

const Container = ({children,title,titleModel,model='model1',direction='row'}:Props)=>{

    return(
        <div className={styles.container + ' ' + styles[model]}>
            {title?<Title fontSize="22px" model={titleModel!} titleText={title}/>:<></>}
            <div className={styles.containerBody} style={{flexDirection:direction}}>
                {children}
            </div>
        </div>
    )
}

export default Container