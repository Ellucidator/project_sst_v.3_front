import Title from '../tiltle'
import styles from './styles.module.scss'

type Props = {
    children: React.ReactNode
    title?: string
    titleModel?: 'model1'|'model2'|'model3'|'model4'|'model5'
}

const Container = ({children,title,titleModel}:Props)=>{

    return(
        <div className={styles.container}>
            {title?<Title fontSize="20px" model={titleModel!} titleText={title}/>:<></>}
            <div className={styles.containerBody}>
                {children}
            </div>
        </div>
    )
}

export default Container