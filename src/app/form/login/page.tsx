import Link from 'next/link'
import styles from './page.module.scss'
import { cookieService } from '@/services/cookieService';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import Input from '@/components/common/Input-label-components/input&Label';

const Login = async () => {

    const verify = await cookieService.verifyLogin();


    const handlerSubmit = async (form: FormData) => {
        'use server'

        const login = form.get('email')?.valueOf();
        const password = form.get('password')?.valueOf();

        if (typeof login === 'string' && typeof password === 'string') {

            const session = await cookieService.setSession(login, password);

            if (!session.error) {
                redirect('/user/home')
            } else {
                cookies().set('login', JSON.stringify(session), {
                    maxAge: 0
                })
            }
        }
    }

    return (
        <div className={styles.login}>
            <div className={`container ${styles.loginContainer}`}>

                <form action={handlerSubmit} className={`container ${styles.loginForm}`}>
                    <Input divWidth='100%' mode='label&input' labelText='Email:' inputOptions={{ required: true, maxLength: 80, type: 'email', name: 'email', id: 'email', placeholder: 'ex: 5t8jz@example.com' }} />
                    {verify.error === 'email' ? <p className={styles.verifyP}>Email inválido</p> : null}

                    <Input divWidth='100%' mode='label&input' labelText='Senha:' inputOptions={{ required: true, type: 'password', name: 'password', id: 'password', placeholder: 'Sua senha' }} />
                    {verify.error === 'password' ? <p className={styles.verifyP}>Senha incorreta</p> : null}

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