import Input from '../input&Label'
import styles from './styles.module.scss'


export interface InputsContainerArgs{
    divWidth?: string
    inputOptions?: React.InputHTMLAttributes<HTMLInputElement>
    labelOptions?: React.LabelHTMLAttributes<HTMLLabelElement>
    labelText?: string
}
type Props = {
    containerType?: 'Input' | 'InputAndLabel'
    containerArgs: InputsContainerArgs[]
    containerOptions?: React.HTMLAttributes<HTMLDivElement>
}

const InputsContainer =({containerArgs,containerOptions,containerType}:Props)=>{

    if(containerType === 'InputAndLabel'){
        return (
            <div {...containerOptions} className={styles.inputsContainer + ' ' + containerOptions?.className}>
                {
                    containerArgs.map((item,index)=>{
                        return (
                            <Input
                                key={index}
                                divWidth={item?.divWidth}
                                inputOptions={item?.inputOptions}
                                labelOptions={item?.labelOptions}
                                labelText={item?.labelText}
                            />
                        )
                    })
                }
            </div>
        )
    }else{
        return (
            <div {...containerOptions} className={styles.inputsContainer + ' ' + containerOptions?.className}>
                {
                    containerArgs.map((item,index)=>{
                        return (
                            <Input mode='input' key={index} inputOptions={item?.inputOptions}/>
                        )
                    })
                }
            </div>
        )
    }
}

export default InputsContainer