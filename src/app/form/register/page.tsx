import Link from 'next/link'
import styles from './page.module.scss'
import Image from 'next/image'
import registerIcon from '../../../../public/public/register/registerIcon.svg'
const Register = () => {

    return (
        <>
            <div className={styles.register}>
                <div className={`container ${styles.registerContainer}`}>
                    <Image src={registerIcon} alt="registerIcon" className={styles.registerIcon} width={30} height={30} />

                    <h2 className={styles.registerTittle}>Formulario de cadastro</h2>

                    <form action={''} method='POST' className={`container ${styles.registerForm}`}>
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
        </>
    )
}

export default Register