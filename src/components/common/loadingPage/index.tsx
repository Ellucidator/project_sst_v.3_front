import styles from './styles.module.scss'
const LoadingPage = async()=> {
    return (
        <div className={`${styles.loadingArea}`}>
            <div className={styles.loading}></div>
        </div>
    )
}

export default LoadingPage