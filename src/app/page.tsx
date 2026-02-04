'use client';

import { useEffect, useMemo, useState } from 'react';
import HomeBannerSlider, { HomeBannerSlide } from './components/home/HomeBannerSlider';
import HomeSlider from './components/home/HomeSlider';
import ShopByCategory from './components/home/ShopByCategory';
import productsApi from '@/lib/productsApi';
import type { Product } from '@/lib/types';
import styles from './Home.module.scss';

export default function Home() {
  const [newModels, setNewModels] = useState<Product[]>([]);
  const [hotPrices, setHotPrices] = useState<Product[]>([]);

  useEffect(() => {
    const fetchSlidersData = async () => {
      const [newModelsData, hotPricesData] = await Promise.all([
        productsApi.fetchData<Product>('phones', { model: 'iphone-14' }),
        productsApi.fetchData<Product>('phones', { hotPrices: 'price' }),
      ]);

      if (newModelsData?.data) setNewModels(newModelsData.data);
      if (hotPricesData?.data) setHotPrices(hotPricesData.data);
    };

    fetchSlidersData();
  }, []);

  const slides = useMemo<HomeBannerSlide[]>(
    () => [
      {
        id: 1,
        imageUrl: '/img/banner.png',
        imageAlt: 'iPhone banner',
        mobileImageUrl: '/img/mobile-slider-image.png',
      },
      {
        id: 2,
        imageUrl: '/img/banner1.jpg',
        imageAlt: 'iPhone banner',
      },
      {
        id: 3,
        imageUrl: '/img/banner2.jpg',
        imageAlt: 'iPhone banner',
      },
    ],
    []
  );

  return (
    <div className="page container">
      <h2 className={styles.homeTitle}>Welcome to Nice Gadgets store!</h2>
      <HomeBannerSlider slides={slides} />
      <HomeSlider products={newModels} title="Brand new models" />
      <ShopByCategory />
      <HomeSlider products={hotPrices.slice(0, 18)} title="Hot prices" />
    </div>
  );
}
