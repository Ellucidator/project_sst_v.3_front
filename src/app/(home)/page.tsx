import styles from './page.module.scss'
import { catalogService } from "@/services/catalogService";
import CardItem from "@/components/common/cards/cardItem";
import imgBanner1 from '../../../public/public/home/categoryBanner1.png'
import imgBanner2 from '../../../public/public/home/categoryBanner2.png'
import Container from "@/components/common/container";
import CategoryCard from "@/components/common/cards/categoryCard";
import Banners from "@/components/common/banners";
import SetLocalStorage from '@/components/common/clientOnlyComponents/setLocalStorage';
export default async function Home() {

  const [promotions,promotionFeature, catalog, newestsItens, featuredItems] = await Promise.all([
    catalogService.getAllPromotions(),
    catalogService.getFeaturedPromotion(),
    catalogService.getCatalog(),
    catalogService.getNewestsItems(),
    catalogService.getFeaturedItems()
  ])
  
  return (
    <main className={`${styles.home}`}>
      
      <SetLocalStorage name={'promotionFeature'} value={JSON.stringify({
        id: promotionFeature.id,
        name: promotionFeature.name,
        thumbnail_url: promotionFeature.thumbnail_url
      })} />

      <div className={`${styles.homeContainer}`}>

        <Banners promotions={promotions} />

        <Container title={{ titleText: promotionFeature.name, model: "model1", fontSize: "25px" }}
          model="model1" modelTw='container' justifyContent='center' >
          {promotionFeature.Items.map((item) => {
            return (
              <CardItem key={item.id} item={item} />
            )
          })}
        </Container>

        <section className={`container ${styles.categoriesCards}`}>
          <CategoryCard cardLink={`${catalog[0].name.toLowerCase()}-${catalog[0].SubCategories[0].id}`}
            cardName={catalog[0].SubCategories[0].name} imgUrl={imgBanner1.src} theme="dark" />

          <CategoryCard cardLink={`${catalog[1].name.toLowerCase()}-${catalog[1].SubCategories[0].id}`} cardName={catalog[1].SubCategories[0].name} imgUrl={imgBanner2.src} theme="light" />
        </section>

        <Container title={{ titleText:'Recentemente adicionados', model: "model1", fontSize: "25px" }}
          model="model1" modelTw='container' justifyContent='center' >
          {newestsItens.map((item) => {
            return (
              <CardItem key={item.id} item={item} />
            )
          })}
        </Container>

        <Container title={{ titleText: "Produtos em destaque", model: "model5", width: "100%", fontSize: "25px" }}
          model="model2" modelTw='container'>
          {featuredItems.map((item) => {
            return (
              <CardItem key={item.id} item={item} />
            )
          })}
        </Container>

      </div>

    </main>
  );
}
