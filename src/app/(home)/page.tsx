import Image from "next/image";
import styles from './page.module.scss'
import Link from "next/link";
export default function Home() {
  const promotionFeature = ''
  return (
    <main className={`${styles.home}`}>
        <section>
          <Link href="/catalog">
            
          </Link>
        </section>
    </main>
  );
}
