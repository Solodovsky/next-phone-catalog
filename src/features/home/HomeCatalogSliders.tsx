"use client";

import HomeSlider from "@/components/home/HomeSlider";
import ShopByCategory from "@/components/home/ShopByCategory";
import PageLoader from "@/components/ui/PageLoader";
import { useCategoryProductsQuery } from "@/hooks/use-catalog-queries";
import styles from "./Home.module.scss";

export default function HomeCatalogSliders() {
  const {
    data: newModelsData,
    isLoading: isNewLoading,
    isError: isNewError,
  } = useCategoryProductsQuery({
    category: "phones",
    model: "iphone-14",
  });

  const {
    data: hotPricesData,
    isLoading: isHotLoading,
    isError: isHotError,
  } = useCategoryProductsQuery({
    category: "phones",
    hotPrices: "price",
  });

  if (isNewLoading || isHotLoading) {
    return <PageLoader />;
  }

  if (isNewError || isHotError) {
    return (
      <p className={styles.homeError}>Failed to load featured products</p>
    );
  }

  const newModels = newModelsData?.data ?? [];
  const hotPrices = (hotPricesData?.data ?? []).slice(0, 18);

  return (
    <>
      <HomeSlider products={newModels} title="Brand new models" />
      <ShopByCategory />
      <HomeSlider products={hotPrices} title="Hot prices" />
    </>
  );
}
