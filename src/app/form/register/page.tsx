import Link from 'next/link'
import styles from './page.module.scss'
import Image from 'next/image'

const Register = () => {

    return (
        <>
            <div className={styles.register}>
                <div className={`container ${styles.registerContainer}`}>
                    <Image src={'/public/public/register/registerIcon.svg'} alt="logo" className={styles.registerIcon} width={20} height={20} />

                    <form action={''} method='POST' className={`container ${styles.registerForm}`}>
                        <div className={styles.inputDiv}>
                            <label className={styles.label} htmlFor="email">Email:</label>
                            <input required type="email" name="email" id="email" className={styles.input} />
                        </div>
                        <div className={styles.inputDiv}>
                            <label htmlFor="password" className={styles.label}>Senha:</label>
                            <input required type="password" name="password" id="password" className={styles.input} />
                        </div>
                        <button type="submit" className={styles.buttonregister} >REGISTRAR</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register