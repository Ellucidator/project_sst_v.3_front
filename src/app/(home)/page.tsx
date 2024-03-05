import Image from "next/image";
import styles from './page.module.scss'
import Link from "next/link";
import { catalogService } from "@/services/catalogService";
export default async function Home() {
  const promotionFeature = await catalogService.getFeaturedPromotion();

  
  return (
    <main className={`${styles.home}`}>
        <section>
          <Link href="/catalog">
            <p>{`${promotionFeature.item_id}`}</p>
          </Link>
        </section>
    </main>
  );
}
