import Image from "next/image";
import styles from './page.module.scss'
import Link from "next/link";
import { catalogService } from "@/services/catalogService";
export default async function Home() {
  const promotionFeature = await catalogService.getFeaturedPromotion();


  return (
    <main className={`${styles.home}`}>
      <div className={`container`}>
        <section className={styles.promotion}>
          <Link href="/" className={styles.promotionLink}>
            <Image src={`http://localhost:3000/files/${promotionFeature.thumbnail_url}`} alt="banner" className={styles.promotionBanner} width={1000} height={500} />
          </Link>
        </section>
      </div>
    </main>
  );
}
