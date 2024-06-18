import styles from './styles.module.scss'

export interface TitleProps{
    titleText:string
    fontSize?:string
    fontWeight?:string
    width?:string
    model?:'model1'|'model2'|'model3'|'model4'|'model5'|'simple'
}
const Title = ({titleText, fontSize='20px', model='model1',width='fit-content',fontWeight='normal'}:TitleProps)=>{

    return(
        <p style={{fontSize,width,fontWeight}} className={styles.title + ' ' + styles[model]}>{titleText}</p>
    )

}


export default Title