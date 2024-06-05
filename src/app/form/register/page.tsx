import Link from 'next/link'
import styles from './page.module.scss'
import Image from 'next/image'
import registerIcon from '../../../../public/public/register/registerIcon.svg'
import { redirect } from 'next/navigation'
import { userService } from '@/services/userService'
import { CreateUser } from '@/types/userTypes'
import { cookieService } from '@/services/cookieService'
import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'
import Input from '@/components/common/Input-label-components/input&Label'
import Button from '@/components/common/button'
import Loading from '@/components/common/loading'
const Register = async () => {

    const verify = await cookieService.verifyRegister()

    const handlerSubimit = async (form: FormData) => {
        'use server'

        const first_name = form.get('first_name')?.valueOf()
        const last_name = form.get('last_name')?.valueOf()
        const email = form.get('email')?.valueOf()
        const password = form.get('password')?.valueOf()
        const phone = form.get('phone')?.valueOf()
        const birth = form.get('birth')?.valueOf()
        const confirmPassword = form.get('confirmPassword')?.valueOf()

        if (
            typeof first_name === 'string' &&
            typeof last_name === 'string' &&
            typeof email === 'string' &&
            typeof password === 'string' &&
            typeof phone === 'string' &&
            typeof birth === 'string' &&
            typeof confirmPassword === 'string'
        ) {
            const newUser: CreateUser = {
                first_name,
                last_name,
                email,
                password,
                phone,
                birth
            }
            if (password === confirmPassword) {
                const res = await userService.createUser(newUser)


                if (!res) {
                    cookies().set('register', JSON.stringify({
                        email: true,
                        password: false
                    }), {
                        maxAge: 0
                    })
                    revalidateTag('verify-register')
                } else {
                    redirect('/')
                }
            } else {
                cookies().set('register', JSON.stringify({
                    email: false,
                    password: true
                }), {
                    maxAge: 0
                })
                revalidateTag('verify-register')
            }
        }
    }

    return (

        <div className={styles.register}>
            <div className={`container ${styles.registerContainer}`}>
                <Image src={registerIcon} alt="registerIcon" className={styles.registerIcon} width={30} height={30} />

                <h2 className={styles.registerTittle}>Formulario de cadastro </h2>

                <form action={handlerSubimit} className={`container ${styles.registerForm}`}>
                    <Loading model='modelArea' />

                    <div className={styles.inputDiv}>
                        <Input divWidth='35%' mode='label&input' labelText='Nome:' inputOptions={{ required: true, maxLength: 12, type: 'text', name: 'first_name', id: 'first_name', placeholder: 'Seu nome' }} />

                        <Input mode='label&input' labelText='Sobrenome:' inputOptions={{ required: true, maxLength: 50, type: 'text', name: 'last_name', id: 'last_name', placeholder: 'Seu sobrenome' }} />
                    </div>

                    <Input divWidth='100%' mode='label&input' labelText='Email:' inputOptions={{ required: true, maxLength: 80, type: 'email', name: 'email', id: 'email', placeholder: 'ex: 5t8jz@example.com' }} />

                    {verify.email ? (<p className={styles.verifyP}>E-mail ja cadastrado</p>) : null}

                    <div className={styles.inputDiv}>
                        <Input mode='label&input' labelText='Senha:' inputOptions={{ required: true, minLength: 8, type: 'password', name: 'password', id: 'password', placeholder: 'Sua senha' }} />

                        <Input mode='label&input' labelText='Confirme sua senha:' inputOptions={{ required: true, type: 'password', name: 'confirmPassword', id: 'confirmPassword', placeholder: 'Confirme sua senha' }} />
                    </div>

                    {verify.password ? (<p className={styles.verifyP}>As senhas precisam ser iguais</p>) : null}

                    <div className={styles.inputDiv}>
                        <Input mode='label&input' labelText='Telefone:' inputOptions={{ required: true, maxLength: 11, type: 'tel', name: 'phone', id: 'phone', placeholder: 'ex: 11988999999' }} />

                        <Input mode='label&input' labelText='Data de nascimento:' inputOptions={{ required: true, type: 'date', name: 'birth', id: 'birth', placeholder: 'Data de nascimento' }} />
                    </div>
                    <Button btnModel='model1' btnWidth='40%' btnAction='submit' btnName='REGISTRAR' />
                </form>
                <div className={styles.divLogin}>
                    <p className={styles.tittle}>Já tem uma conta?</p>
                    <Link className={styles.link} href={'/form/login'}>Entrar</Link>
                </div>
            </div>
        </div>

    )
}

export default Register