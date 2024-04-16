import Image from "next/image";
import styles from './page.module.scss'
import Link from "next/link";
import { catalogService } from "@/services/catalogService";
import SlideSection from "@/components/common/slideSection";
import CardItem from "@/components/common/cardItem";
export default async function Home() {

  const [promotionFeature,catalog,newestsItens,featuredItems]= await Promise.all([
    catalogService.getFeaturedPromotion(),
    catalogService.getCatalog(),
    catalogService.getNewestsItems(),
    catalogService.getFeaturedItems()
  ])



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
          <SlideSection allItems={promotionFeature.Items} />
        </section>

        <section className={`container ${styles.categoriesCards}`}>
          <Link href={`/catalog/${catalog[0].name.toLowerCase()}/${catalog[0].SubCategories[0].id}`} className={styles.categoryCard1}>
            <p className={styles.categoryName}>{catalog[0].SubCategories[0].name}</p>
          </Link>
          <Link href={`/catalog/${catalog[1].name.toLowerCase()}/${catalog[0].SubCategories[1].id}`} className={styles.categoryCard2}>
            <p className={styles.categoryName}>{catalog[0].SubCategories[1].name}</p>
          </Link>
        </section>

        <section className={`container ${styles.slide}`}>
          <p className={styles.slideTitle}>Produtos Novos</p>
          <SlideSection allItems={newestsItens} />
        </section>

        <section className={`container ${styles.slide} `}>
          <p className={styles.slideTitle}>Produtos em Destaque</p>
          <div className={styles.cardsContainer}>
          {featuredItems.map((item) => {
            return (
              <CardItem key={item.id} item={item} />
            )
          })}
          </div>
        </section>
      </div>

    </main>
  );
}
