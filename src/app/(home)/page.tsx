import Image from "next/image";
import styles from './page.module.scss'
import Link from "next/link";
import { catalogService } from "@/services/catalogService";
import SlideSection from "@/components/common/slideSection";
import CardItem from "@/components/common/cardItem";
import CategoryCard from "@/components/common/categoryCard";
import imgBanner1 from '../../../public/public/home/categoryBanner1.png'
import imgBanner2 from '../../../public/public/home/categoryBanner2.png'
import Title from "@/components/common/tiltle";
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
            <Image src={`http://localhost:3000/files/${promotionFeature.thumbnail_url}`} alt="banner" className={styles.promotionBanner} width={1000} height={600} />
          </Link>
        </section>

        <section className={`container ${styles.slide}`}>
          <Title fontSize="25px" titleText={promotionFeature.name}/>
          <SlideSection allItems={promotionFeature.Items} perPage={6} />
        </section>

        <section className={`container ${styles.categoriesCards}`}>
          <CategoryCard cardLink={`${catalog[0].name.toLowerCase()}/${catalog[0].SubCategories[0].id}`}
            cardName={catalog[0].SubCategories[0].name} imgUrl={imgBanner1.src} theme="dark" />

          <CategoryCard cardLink={`${catalog[1].name.toLowerCase()}/${catalog[1].SubCategories[0].id}`} cardName={catalog[1].SubCategories[0].name} imgUrl={imgBanner2.src} theme="light" />
        </section>

        <section className={`container ${styles.slide}`}>
          <Title fontSize="25px" titleText="Produtos novos"/>
          <SlideSection allItems={newestsItens} perPage={6}  />
        </section>

        <section className={`container ${styles.slide} `}>
          <Title fontSize="25px" titleText="Produtos em destaque"/>
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
