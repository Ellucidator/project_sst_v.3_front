import Input from '../input'
import styles from './styles.module.scss'

interface PropsLabel extends React.LabelHTMLAttributes<HTMLLabelElement>{
    labelText: string
}
type Props = {
    inputOptions?: React.InputHTMLAttributes<HTMLInputElement>
    labelOptions?: PropsLabel
}

const InputAndLabel =({inputOptions,labelOptions}:Props)=>{

    return (
        <div className={styles.inputAndLabel}>
            <label {...labelOptions} className={styles.label + ' ' + labelOptions?.className} >{labelOptions?.labelText}</label>
            <Input {...inputOptions}/>
        </div>
    )
}

export default InputAndLabel