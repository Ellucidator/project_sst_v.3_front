import styles from './styles.module.scss'


type Props = {
    mode?:'input' | 'label&input'
    divWidth?: string
    inputOptions?: React.InputHTMLAttributes<HTMLInputElement>
    labelOptions?: React.LabelHTMLAttributes<HTMLLabelElement>
    labelText?: string
}

const Input =({divWidth,inputOptions,labelOptions,labelText,mode}:Props)=>{

    if(mode === 'label&input'){
        return (
            <div className={styles.inputAndLabel} style={divWidth?{width:divWidth}:{flex:1}}>
                <label {...labelOptions} className={styles.label + ' ' + labelOptions?.className} >{labelText}</label>
                <input {...inputOptions} className={styles.input + ' ' + inputOptions?.className}  />
            </div>
        )
    }else{
        return (
            <input {...inputOptions} className={styles.input + ' ' + inputOptions?.className}  />
        )
    }
}

export default Input