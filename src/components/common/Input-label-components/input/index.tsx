import styles from './styles.module.scss'



const Input =(props:React.InputHTMLAttributes<HTMLInputElement>)=>{

    return (
        <input {...props} className={styles.input + ' ' + props.className}  />
    )
}

export default Input