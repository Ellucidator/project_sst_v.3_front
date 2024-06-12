import styles from './styles.module.scss'


type Props = {
    mode?:'input' | 'label&input'
    direction?:'row' | 'column'
    divWidth?: string
    inputOptions?: React.InputHTMLAttributes<HTMLInputElement>
    labelOptions?: React.LabelHTMLAttributes<HTMLLabelElement>
    labelText?: string
    inputColor?: 'light' | 'dark'
}

const Input =({divWidth,inputOptions,labelOptions,labelText,mode,inputColor='light',direction='column'}:Props)=>{

    if(mode === 'label&input'){
        return (
            <div className={styles.inputAndLabel} style={divWidth?{width:divWidth,flexDirection:direction}:{flex:1,flexDirection:direction}}>
                <label htmlFor={inputOptions?.id} {...labelOptions} className={styles.label + ' ' + labelOptions?.className} >{labelText}</label>
                <input id={inputOptions?.id} {...inputOptions} className={styles.input + ' ' +styles[inputColor] + ' ' + inputOptions?.className}  />
            </div>
        )
    }else{
        return (
            <input style={divWidth?{width:divWidth}:{flex:1}} {...inputOptions} className={styles.input + ' ' + styles[inputColor] + ' ' + inputOptions?.className}  />
        )
    }
}

export default Input