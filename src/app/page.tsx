import { Suspense } from "react";
import HomeBannerSlider, {
  HomeBannerSlide,
} from "@/components/home/HomeBannerSlider";
import HomeCatalogSliders from "@/features/home/HomeCatalogSliders";
import PageLoader from "@/components/ui/PageLoader";
import styles from "@/features/home/Home.module.scss";

const slides: HomeBannerSlide[] = [
  {
    id: 1,
    imageUrl: "/img/banner.png",
    imageAlt: "iPhone banner",
    mobileImageUrl: "/img/mobile-slider-image.png",
  },
  {
    id: 2,
    imageUrl: "/img/banner2.png",
    imageAlt: "iPhone banner",
  },
  {
    id: 3,
    imageUrl: "/img/banner3.png",
    imageAlt: "iPhone banner",
  },
];

export default function Home() {
  return (
    <div className="page container">
      <h2 className={styles.homeTitle}>Welcome to Nice Gadgets store!</h2>
      <HomeBannerSlider slides={slides} />
      <Suspense fallback={<PageLoader />}>
        <HomeCatalogSliders />
      </Suspense>
    </div>
  );
}
