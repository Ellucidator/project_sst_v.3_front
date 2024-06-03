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
                <label htmlFor={inputOptions?.id} {...labelOptions} className={styles.label + ' ' + labelOptions?.className} >{labelText}</label>
                <input id={inputOptions?.id} {...inputOptions} className={styles.input + ' ' + inputOptions?.className}  />
            </div>
        )
    }else{
        return (
            <input style={divWidth?{width:divWidth}:{flex:1}} {...inputOptions} className={styles.input + ' ' + inputOptions?.className}  />
        )
    }
}

export default Input