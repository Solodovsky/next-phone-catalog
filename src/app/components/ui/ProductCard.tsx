import Image from "next/image";
import { ButtonCard } from "./ButtonCard";
import { FavoriteIcon } from "../../components/icons";
import { useAppDispatch, useAppSelector } from "../../../store/hooks/redux";
import { addToCart, removeFromCart } from "../../../store/slices/cartSlice";

import styles from "./ProductCard.module.scss";
import { Product } from "../../../lib/types";
import { toggleFavorite } from "../../../store/slices/favoritesSlice";
import Link from "next/link";

type Props = {
  product: Product;
  priority?: boolean;
};

export const ProductCard: React.FC<Props> = ({ product, priority }) => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart?.items || []);
  const favorites = useAppSelector((state: any) => state.favorites || []);

  const path = `/${product.images[0]}`;
  const detailsPath = `/${product.category}/${product.id}`;

  const isInCart = cartItems.some((item) => item.id === product.id);
  const isInFavorites = favorites.some((fav: Product) => fav.id === product.id);

  const handleAddToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (isInCart) {
      dispatch(removeFromCart(product.id));
    } else {
      dispatch(
        addToCart({
          id: product.id,
          name: product.name,
          image: product.images[0],
          price: product.priceDiscount || product.priceRegular,
        }),
      );
    }
  };

  const handleToggleFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    dispatch(toggleFavorite(product));
  };

  return (
    <Link href={detailsPath} className={styles.productCard}>
      <div className={styles.imageContainer}>
        <Image
          src={path}
          alt={product.name}
          fill
          className={styles.image}
          sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 272px"
          priority={priority}
        />
      </div>

      <div className={styles.info}>
        <h3 className={styles.name}>{product.name}</h3>
        <div className={styles.price}>
          {product.isNew ? (
            <span className={styles.priceDiscount}>
              ${product.priceDiscount || product.priceRegular}
            </span>
          ) : product.priceDiscount &&
            product.priceDiscount !== product.priceRegular ? (
            <>
              <span className={styles.priceDiscount}>
                ${product.priceDiscount}
              </span>
              <span className={styles.priceRegular}>
                ${product.priceRegular}
              </span>
            </>
          ) : (
            <span className={styles.priceDiscount}>
              ${product.priceRegular}
            </span>
          )}
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
      </div>
    </Link>
  );
};

export default ProductCard;
