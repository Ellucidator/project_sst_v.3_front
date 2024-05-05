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
const Register = async () => {

    const verify = await cookieService.verifyRegister()

    const handlerSubimit = async (form: FormData) => {
        'use server'

        const first_name = form.get('firstName')?.valueOf()
        const last_name = form.get('lastName')?.valueOf()
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
                console.log('As senhas precisam ser iguais')
            }
        } else {
            console.log('Preencha todos os campos')
        }
    }

    return (

        <div className={styles.register}>
            <div className={`container ${styles.registerContainer}`}>
                <Image src={registerIcon} alt="registerIcon" className={styles.registerIcon} width={30} height={30} />

                <h2 className={styles.registerTittle}>Formulario de cadastro </h2>

                <form action={handlerSubimit} className={`container ${styles.registerForm}`}>
                    <div className={styles.inputDivDuo}>
                        <div className={styles.inputDiv}>
                            <label className={styles.label} htmlFor="firstName">Primeiro nome:</label>
                            <input
                                required
                                type="text"
                                name="firstName"
                                id="firstName"
                                className={styles.input}
                                placeholder='Seu primeiro nome'
                                maxLength={20}
                                minLength={3}
                            />
                        </div>
                        <div className={styles.inputDiv}>
                            <label className={styles.label} htmlFor="lastName">Sobrenome:</label>
                            <input
                                required
                                type="text"
                                name="lastName"
                                id="lastName"
                                className={styles.input}
                                placeholder='Seu sobrenome'
                                maxLength={20}
                                minLength={3}
                            />
                        </div>
                    </div>
                    <div className={styles.inputDivFull}>
                        <label className={styles.label} htmlFor="email">Email:</label>
                        <input
                            required
                            type="email"
                            name="email"
                            id="email"
                            placeholder='ex: nomeabc@hotmail.com'
                            className={styles.input}
                        />
                        {verify.email ? (<p className={styles.verifyP}>Email ja cadastrado</p>) : null}
                    </div>
                    <div className={styles.inputDivDuo}>
                        <div className={styles.inputDiv}>
                            <label htmlFor="password" className={styles.label}>Senha:</label>
                            <input
                                required
                                type="password"
                                name="password"
                                id="password"
                                placeholder='ex: @Abc123987'
                                className={styles.input}
                            />
                            {verify.password ? (<p className={styles.verifyP}>As senhas precisam ser iguais</p>) : null}

                        </div>
                        <div className={styles.inputDiv}>
                            <label htmlFor="confirmPassword" className={styles.label}>Confirme sua senha:</label>
                            <input
                                required
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                className={styles.input}
                            />
                            {verify.password ? (<p className={styles.verifyP}>As senhas precisam ser iguais</p>) : null}

                        </div>
                    </div>
                    <div className={styles.inputDivDuo}>
                        <div className={styles.inputDiv}>
                            <label htmlFor="phone" className={styles.label}>Telefone:</label>
                            <input
                                required
                                type="number"
                                name="phone"
                                id="phone"
                                placeholder='DDD+Número ex: 11999999999'
                                className={styles.inputPhone}
                            />
                        </div>
                        <div className={styles.inputDiv}>
                            <label htmlFor="birth" className={styles.label}>Data de nascimento:</label>
                            <input
                                required
                                type="date"
                                name="birth"
                                id="birth"
                                className={styles.input}
                            />
                        </div>
                    </div>
                    <button type="submit" className={styles.buttonregister} >REGISTRAR</button>
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