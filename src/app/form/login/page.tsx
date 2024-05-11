import Link from 'next/link'
import styles from './page.module.scss'
import { cookieService } from '@/services/cookieService';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { revalidateTag } from 'next/cache';

const Login =async () => {

    const verify = await cookieService.verifyLogin();
    console.log(verify)

    const validate = await cookieService.verifySession();
    if(validate){
        redirect('/')
    }

    const handlerSubmit = async (form: FormData) =>{
        'use server'
        
        const login = form.get('email')?.valueOf();
        const password = form.get('password')?.valueOf();

        if(typeof login === 'string' && typeof password === 'string'){

            const session = await cookieService.setSession(login, password);

            if(!session.error){
                redirect('/')
            }else{
                cookies().set('login', JSON.stringify(session), {
                    maxAge: 0
                })
                revalidateTag('verify-login')
            }
        }
    }

    return (
        <div className={styles.login}>
            <div className={`container ${styles.loginContainer}`}>
                
                <form action={handlerSubmit} method='POST' className={`container ${styles.loginForm}`}>
                    <div className={styles.inputDiv}>
                        <label className={styles.label} htmlFor="email">Email:</label>
                        <input required type="email" name="email" id="email" className={styles.input} />
                        {verify.error === 'email'?<p className={styles.verifyP}>Email inválido</p>:null}
                    </div>
                    <div className={styles.inputDiv}>
                        <label htmlFor="password" className={styles.label}>Senha:</label>
                        <input required type="password" name="password" id="password" className={styles.input} />
                        {verify.error === 'password'?<p className={styles.verifyP}>Senha incorreta</p>:null}
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