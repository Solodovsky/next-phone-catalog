import React from "react";
import HomeBannerSlider, {
  HomeBannerSlide,
} from "./components/home/HomeBannerSlider";
import HomeSlider from "./components/home/HomeSlider";
import ShopByCategory from "./components/home/ShopByCategory";
import type { Product } from "@/lib/types";
import styles from "./Home.module.scss";
import { headers } from "next/headers";

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

async function fetchPhones(baseUrl: string, params: Record<string, string>) {
  const search = new URLSearchParams(params).toString();
  const res = await fetch(`${baseUrl}/api/phones?${search}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) return { data: [] };
  const json = await res.json();

  return json;
}

export default async function Home() {
  const headersList = await headers();
  const host = headersList.get("host") || "localhost:3000";
  const protocol = headersList.get("x-forwarded-proto") || "http";
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL ||
    (host ? `${protocol}://${host}` : "http://localhost:3000");

  const [newModelsRes, hotPricesRes] = await Promise.all([
    fetchPhones(baseUrl, { model: "iphone-14" }),
    fetchPhones(baseUrl, { hotPrices: "price" }),
  ]);

  const newModels: Product[] = newModelsRes.data || [];
  const hotPrices: Product[] = (hotPricesRes.data || []).slice(0, 18);
  return (
    <div className="page container">
      <h2 className={styles.homeTitle}>Welcome to Nice Gadgets store!</h2>
      <HomeBannerSlider slides={slides} />
      <HomeSlider products={newModels} title="Brand new models" />
      <ShopByCategory />
      <HomeSlider products={hotPrices} title="Hot prices" />
    </div>
  );
}
