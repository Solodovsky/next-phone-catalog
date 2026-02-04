'use client';

import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './HomeSlider.module.scss';
import { ProductCard } from '../ui/ProductCard';
import { SliderLeftIcon, SliderRightIcon } from '../icons';
import type { Product } from '@/lib/types';

type Props = {
  title: string;
  products: Product[];
};

const HomeSlider: React.FC<Props> = ({ title, products }) => {
  const PrevArrow: React.FC<{ onClick?: () => void }> = ({ onClick }) => (
    <button
      type="button"
      aria-label="Previous slide"
      onClick={onClick}
      className={`${styles.sliderButton} ${styles.prevButton}`}
    >
      <SliderLeftIcon />
    </button>
  );

  const NextArrow: React.FC<{ onClick?: () => void }> = ({ onClick }) => (
    <button
      type="button"
      aria-label="Next slide"
      onClick={onClick}
      className={`${styles.sliderButton} ${styles.nextButton}`}
    >
      <SliderRightIcon />
    </button>
  );

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className={styles.Slider}>
      <div className={styles.sliderHeader}>
        <h2 className={styles.SliderTitle}>{title}</h2>
      </div>
      {products.length > 0 && (
        <Slider {...settings} className={styles.slick}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Slider>
      )}
    </div>
  );
};

export default HomeSlider;
