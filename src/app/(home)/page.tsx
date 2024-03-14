import Image from "next/image";
import styles from './page.module.scss'
import Link from "next/link";
import { catalogService } from "@/services/catalogService";
import SlideSection from "@/components/home/slideSection";
export default async function Home() {

  const promotionFeature = await catalogService.getFeaturedPromotion();
  const catalog = await catalogService.getCatalog();
  const featuredItens = await catalogService.getFeaturedItems()


  return (
    <main className={`${styles.home}`}>

      <div className={`container ${styles.homeContainer}`}>

        <section className={styles.promotion}>
          <Link href="/" className={styles.promotionLink}>
            <Image src={`http://localhost:3000/files/${promotionFeature.thumbnail_url}`} alt="banner" className={styles.promotionBanner} width={1000} height={400} />
          </Link>
        </section>

        <section className={`container ${styles.slide}`}>
          <h2 className={styles.slideTitle}>{promotionFeature.name}</h2>
          <SlideSection allItems={promotionFeature.items} />
        </section>

        <section className={`container ${styles.categoriesCards}`}>
          <Link href={'/'} className={styles.categoryCard1}>
            <p className={styles.categoryName}>{catalog[0].name}</p>
          </Link>
          <Link href={'/'} className={styles.categoryCard2}>
            <p className={styles.categoryName}>{catalog[1].name}</p>
          </Link>
        </section>

        <section className={`container ${styles.slide}`}>
          <h2 className={styles.slideTitle}>Produtos Novos</h2>
          <SlideSection allItems={featuredItens} />
        </section>
      </div>

    </main>
  );
}
