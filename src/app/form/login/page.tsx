import Link from 'next/link'
import styles from './page.module.scss'
import { cookieService } from '@/services/cookieService';
import { redirect } from 'next/navigation';

const Login =async () => {

    // const validate = await cookieService.verifySession();
    // if(!validate){
    //     redirect('/user/')
    // }



    return (
        <div className={styles.login}>
            <div className={`container ${styles.loginContainer}`}>
                <form action="" method='POST' className={`container ${styles.loginForm}`}>
                    <div className={styles.inputDiv}>
                        <label className={styles.label} htmlFor="email">Email:</label>
                        <input type="email" name="email" id="email" className={styles.input} />
                    </div>
                    <div className={styles.inputDiv}>
                        <label htmlFor="password" className={styles.label}>Senha:</label>
                        <input type="password" name="password" id="password" className={styles.input} />
                    </div>
                    <button type="submit" className={styles.buttonLogin} >ENTRAR</button>
                </form>
                <div className={styles.divRegister}>
                    <p className={styles.tittle}>Não tem uma conta?</p>
                    <Link className={styles.link} href={'/form/register'}>Registre-se</Link>
                </div>
            </div>
        </div>
    )
}

export default Login