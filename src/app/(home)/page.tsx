import styles from './page.module.scss'
import { catalogService } from "@/services/catalogService";
import imgBanner1 from '../../../public/public/home/categoryBanner1.png'
import imgBanner2 from '../../../public/public/home/categoryBanner2.png'
import CategoryCard from "@/components/common/cards/categoryCard";
import Banners from "@/components/common/banners";
import SetLocalStorage from '@/components/common/clientOnlyComponents/setLocalStorage';
import ProductContainer from '@/components/common/productContainer';
export default async function Home() {

  const [promotions, promotionFeature, catalog, newestsItens, featuredItems] = await Promise.all([
    catalogService.getAllPromotions(),
    catalogService.getFeaturedPromotion(),
    catalogService.getCatalog(),
    catalogService.getNewestsItems(),
    catalogService.getFeaturedItems()
  ])

  return (
    <main className={`${styles.home}`}>

      {promotionFeature ?
        <SetLocalStorage name={'promotionFeature'} value={JSON.stringify({
          id: promotionFeature.id,
          name: promotionFeature.name,
          thumbnail_url: promotionFeature.thumbnail_url
        })} /> : <></>}

      <div className={`${styles.homeContainer}`}>

        <Banners promotions={promotions} />

        {
          promotionFeature ?
            <ProductContainer products={promotionFeature.Items}
              containerAttributes={{
                title: { titleText: promotionFeature.name, model: "model1", fontSize: "25px" },
                model: "model1", modelTw: 'container', justifyContent: 'center'
              }} />
            : <></>
        }

        {catalog && catalog.length > 2 ? <section className={`container ${styles.categoriesCards}`}>
          <CategoryCard cardLink={`${catalog[0].name.toLowerCase()}-${catalog[0].SubCategories[0].id}`}
            cardName={catalog[0].SubCategories[0].name} imgUrl={imgBanner1.src} theme="dark" />

          <CategoryCard cardLink={`${catalog[1].name.toLowerCase()}-${catalog[1].SubCategories[0].id}`} cardName={catalog[1].SubCategories[0].name} imgUrl={imgBanner2.src} theme="light" />
        </section> :
          <></>
        }

        <ProductContainer products={newestsItens}
          containerAttributes={{
            title: { titleText: 'Recentemente adicionados', model: "model1", fontSize: "25px" },
            model: "model1", modelTw: 'container', justifyContent: 'center'
          }} />

        <ProductContainer products={featuredItems}
          containerAttributes={{
            title: { titleText: 'Em destaque', model: "model1", fontSize: "25px" },
            model: "model2", modelTw: 'container', justifyContent: 'center'
          }} />
      </div>

    </main>
  );
}
