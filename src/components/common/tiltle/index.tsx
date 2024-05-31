import styles from './styles.module.scss'

type Props = {
    titleText:string
    fontSize:string
    model?:'model1'|'model2'|'model3'|'model4'|'model5'
}
const Title = ({titleText, fontSize, model}:Props)=>{
    let classModel:string

    switch(model){
        case 'model1':
            classModel = styles.model1
            break
        case 'model2':
            classModel = styles.model2
            break
        case 'model3':
            classModel = styles.model3
            break
        case 'model4':
            classModel = styles.model4
            break
        case 'model5':
            classModel = styles.model5
            break
        default:
            classModel = styles.model1
    }

    return(
        <p style={{fontSize}} className={styles.title + ' ' + classModel}>{titleText}</p>
    )

}


export default Title