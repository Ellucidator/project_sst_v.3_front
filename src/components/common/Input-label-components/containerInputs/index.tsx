import Input, { InputAttributes } from '../input&Label'
import styles from './styles.module.scss'


interface InputContainerAttributes {
    containerOptions?: React.HTMLAttributes<HTMLDivElement>
    divArgs: InputAttributes[]

}
type Props = {
    containerType?: 'input' | 'label&input'
    containerArgs: InputContainerAttributes[]
    model?: 'light' | 'dark'
}

const InputsContainer = ({ containerType = 'input', containerArgs, model = 'light' }: Props) => {

    return (
        <>
            {
                containerArgs.map((di) => {
                    return (
                        <>
                            {
                                di.divArgs.length > 1 ?
                                    <div {...di.containerOptions} className={styles.containerDiv}>
                                        {
                                            di.divArgs.map((inp,i) => {
                                                return (
                                                    <Input key={i} mode={containerType} {...inp} inputColor={model} />
                                                )
                                            })
                                        }
                                    </div>
                                    : <Input mode={containerType} {...di.divArgs[0]} inputColor={model} />
                            }
                        </>
                    )
                })
            }
        </>
    )

}

export default InputsContainer