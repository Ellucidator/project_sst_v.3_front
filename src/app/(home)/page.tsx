import Image from "next/image";
import styles from './page.module.scss'
import Link from "next/link";
import { catalogService } from "@/services/catalogService";
import SlideSection from "@/components/home/slideSection";
export default async function Home() {

  const promotionFeature = await catalogService.getFeaturedPromotion();
  console.log(promotionFeature)

  return (
    <main className={`${styles.home}`}>
      <div className={`container ${styles.homeContainer}`}>
        <section className={styles.promotion}>
          <Link href="/" className={styles.promotionLink}>
            <Image src={`http://localhost:3000/files/${promotionFeature.thumbnail_url}`} alt="banner" className={styles.promotionBanner} width={1000} height={500} />
          </Link>
        </section>
        <section className={`container ${styles.slide}`}>
          <SlideSection allItems={promotionFeature.items}/>
        </section>
      </div>
    </main>
  );
}
