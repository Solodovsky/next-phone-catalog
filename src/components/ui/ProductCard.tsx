"use client";

import Image from "next/image";
import { ButtonCard } from "./ButtonCard";
import { FavoriteIcon } from "@/components/icons";
import { useStoreHydrated } from "@/store/context/StoreHydrationContext";
import { useCartStore } from "@/store/client/cart-store";
import { useFavoritesStore } from "@/store/client/favorites-store";

import styles from "./ProductCard.module.scss";
import { Product } from "@/lib/types";
import Link from "next/link";

type Props = {
  product: Product;
  priority?: boolean;
};

export const ProductCard: React.FC<Props> = ({ product, priority }) => {
  const hydrated = useStoreHydrated();
  const cartItems = useCartStore((state) => state.items);
  const favorites = useFavoritesStore((state) => state.favorites);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  const path = `/${product.images[0]}`;
  const detailsPath = `/${product.category}/${product.id}`;

  const isInCart =
    hydrated && cartItems.some((item) => item.id === product.id);
  const isInFavorites =
    hydrated && favorites.some((fav) => fav.id === product.id);

  const handleAddToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (isInCart) {
      removeFromCart(product.id);
    } else {
      addToCart({
        id: product.id,
        name: product.name,
        image: product.images[0],
        price: product.priceDiscount || product.priceRegular,
      });
    }
  };

  const handleToggleFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    toggleFavorite(product);
  };

  return (
    <article className={styles.productCard}>
      <Link href={detailsPath} className={styles.cardLink}>
        <figure className={styles.imageContainer}>
          <Image
            src={path}
            alt={product.name}
            fill
            className={styles.image}
            sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 272px"
            priority={priority}
          />
        </figure>

        <div className={styles.header}>
          <h3 className={styles.name}>{product.name}</h3>
          <p className={styles.price}>
            {product.isNew ? (
              <strong className={styles.priceDiscount}>
                ${product.priceDiscount || product.priceRegular}
              </strong>
            ) : product.priceDiscount &&
              product.priceDiscount !== product.priceRegular ? (
              <>
                <strong className={styles.priceDiscount}>
                  ${product.priceDiscount}
                </strong>{" "}
                <del className={styles.priceRegular}>
                  ${product.priceRegular}
                </del>
              </>
            ) : (
              <strong className={styles.priceDiscount}>
                ${product.priceRegular}
              </strong>
            )}
          </p>
        </div>

        <div className={styles.specs}>
          <div className={styles.spec}>
            <span className={styles.specLabel}>Screen:</span>
            <span className={styles.specValue}>
              {product.screen.slice(0, 9)}
            </span>
          </div>
          <div className={styles.spec}>
            <span className={styles.specLabel}>Capacity:</span>
            <span className={styles.specValue}>{product.capacity}</span>
          </div>
          <div className={styles.spec}>
            <span className={styles.specLabel}>RAM:</span>
            <span className={styles.specValue}>{product.ram}</span>
          </div>
        </div>
      </Link>

      <div className={styles.actions}>
        <ButtonCard
          onClick={handleAddToCart}
          label={isInCart ? "Selected" : "Add to cart"}
          isSelected={isInCart}
        />
        <button
          className={`${styles.favoriteButton} ${
            isInFavorites ? styles.favoriteButtonActive : ""
          }`}
          onClick={handleToggleFavorite}
          aria-label={
            isInFavorites ? "Remove from favorites" : "Add to favorites"
          }
          type="button"
        >
          <FavoriteIcon
            width={46}
            height={46}
            className={`${styles.favoriteIcon} ${
              isInFavorites ? styles.favoriteIconActive : ""
            }`}
            isActive={isInFavorites}
          />
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
