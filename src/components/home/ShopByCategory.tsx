'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './ShopByCategory.module.scss';

const ShopByCategory: React.FC = () => {
  const categories = [
    {
      id: 'phones',
      title: 'Mobile Phones',
      link: '/phones',
      image: '/img/category-phones.png',
      imageAlt: 'Phones',
    },
    {
      id: 'tablets',
      title: 'Tablets',
      link: '/tablets',
      image: '/img/category-tablets.png',
      imageAlt: 'Tablets',
    },
    {
      id: 'accessories',
      title: 'Accessories',
      link: '/accessories',
      image: '/img/category-accessories.png',
      imageAlt: 'Accessories',
    },
  ];

  return (
    <section className={styles.shopByCategory}>
      <h2 className={styles.shopByCategoryTitle}>Shop by category</h2>
      <div className={styles.shopByCategoryItems}>
        {categories.map((category) => (
          <Link
            key={category.id}
            href={category.link}
            className={styles.shopByCategoryLink}
          >
            <div className={styles.shopByCategoryImageContainer}>
              <Image
                src={category.image}
                alt={category.imageAlt}
                fill
                className={styles.shopByCategoryImage}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 368px"
              />
            </div>
            <div className={styles.shopByCategoryItemContent}>
              <h3 className={styles.shopByCategoryItemTitle}>
                {category.title}
              </h3>
              <span className={styles.shopByCategoryItemLink}>models</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ShopByCategory;
