"use client";

import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./HomeSlider.module.scss";
import { ProductCard } from "../ui/ProductCard";
import { SliderLeftIcon, SliderRightIcon } from "../icons";
import type { Product } from "@/lib/types";

const getSlidesForWidth = (width: number) => {
  if (width <= 640) return { slidesToShow: 1, slidesToScroll: 1 };
  if (width <= 800) return { slidesToShow: 2, slidesToScroll: 2 };
  if (width <= 1024) return { slidesToShow: 3, slidesToScroll: 3 };
  return { slidesToShow: 4, slidesToScroll: 4 };
};

type Props = {
  title: string;
  products: Product[];
};

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

const HomeSlider: React.FC<Props> = ({ title, products }) => {
  const [clientWidth, setClientWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => setClientWidth(window.innerWidth);
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const slidesConfig =
    clientWidth > 0
      ? getSlidesForWidth(clientWidth)
      : { slidesToShow: 4, slidesToScroll: 4 };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: slidesConfig.slidesToShow,
    slidesToScroll: slidesConfig.slidesToScroll,
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
      { breakpoint: 800, settings: { slidesToShow: 2, slidesToScroll: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <div className={styles.Slider}>
      <div className={styles.sliderHeader}>
        <h2 className={styles.SliderTitle}>{title}</h2>
      </div>
      {clientWidth > 0 && products.length > 0 && (
        <Slider {...settings} className={styles.slick}>
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              priority={index === 0}
            />
          ))}
        </Slider>
      )}
    </div>
  );
};

export default HomeSlider;
