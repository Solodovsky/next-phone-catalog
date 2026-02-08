'use client';

import React from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './HomeBannerSlider.module.scss';
import { SliderLeftIcon, SliderRightIcon } from '../icons';

export type HomeBannerSlide = {
  id: number;
  imageUrl: string;
  imageAlt?: string;
  mobileImageUrl?: string;
};

type HomeBannerSliderProps = {
  slides: HomeBannerSlide[];
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

const HomeBannerSlider: React.FC<HomeBannerSliderProps> = ({ slides }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    accessibility: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <div className={styles.sliderContainer}>
      <Slider {...settings} className={styles.slider}>
        {slides.map((slide) => (
          <div key={slide.id} className={styles.sliderItem}>
            <div className={styles.sliderPicture}>
              <Image
                src={slide.imageUrl}
                alt={slide.imageAlt || ''}
                fill
                className={styles.sliderImage}
                sizes="100vw"
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HomeBannerSlider;
