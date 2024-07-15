import styles from './styles.module.scss'


export interface InputAttributes {
    mode?:'input' | 'label&input'
    direction?:'row' | 'column'
    divWidth?: string
    inputOptions?: React.InputHTMLAttributes<HTMLInputElement>
    labelOptions?: React.LabelHTMLAttributes<HTMLLabelElement>
    labelText?: string
    inputColor?: 'light' | 'dark' | 'model1'
}

const Input =({divWidth,inputOptions,labelOptions,labelText,mode,inputColor='light',direction='column'}:InputAttributes)=>{

    if(mode === 'label&input'){
        return (
            <div className={styles.inputAndLabel} style={divWidth?{width:divWidth,flexDirection:direction}:{flex:1,flexDirection:direction}}>
                <label htmlFor={inputOptions?.id} {...labelOptions} 
                    className={styles.label + ' ' + labelOptions?.className} >{labelText}</label>
                <input id={inputOptions?.id} {...inputOptions} 
                    className={styles.input + ' ' +styles[inputColor] + ' ' + inputOptions?.className}
                    style={{flex:1}}
                    />
            </div>
        )
    }else{
        return (
            <input style={divWidth?{width:divWidth}:{flex:1}} {...inputOptions} className={styles.input + ' ' + styles[inputColor] + ' ' + inputOptions?.className}  />
        )
    }
}

export default Input