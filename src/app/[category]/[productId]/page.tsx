"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import styles from "./Details.module.scss";
import Breadcrumb from "../../components/ui/Breadcrumb";
import ButtonCard from "../../components/ui/ButtonCard";
import HomeSlider from "../../components/home/HomeSlider";
import { FavoriteIcon } from "../../components/icons";
import productsApi from "@/lib/productsApi";
import type { EndpointName } from "@/lib/types";
import type { Product } from "@/lib/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks/redux";
import { addToCart, removeFromCart } from "@/store/slices/cartSlice";
import { toggleFavorite } from "@/store/slices/favoritesSlice";

const AVAILABLE_COLORS = [
  { id: "gold", color: "gold", image: "/img/gold.png" },
  { id: "green", color: "green", image: "/img/green.png" },
  { id: "silver", color: "silver", image: "/img/silver.png" },
  { id: "gray", color: "gray", image: "/img/gray.png" },
];

type ProductCharacteristic = {
  key: string;
  value: string | string[];
};

const Details = () => {
  const params = useParams();
  const category = params?.category as string | undefined;
  const productId = params?.productId as string | undefined;

  const [product, setProduct] = useState<Product | null>(null);
  const [productImg, setProductImg] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const [selectCapacity, setSelectCapacity] = useState<string>("");

  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart?.items || []);
  const favorites = useAppSelector((state: any) => state.favorites || []);

  const handleImageClick = (image: string) => {
    setProductImg(`/${image}`);
  };

  useEffect(() => {
    if (product?.images && product.images.length > 0) {
      setProductImg(`/${product.images[0]}`);
    }
  }, [product]);

  const isInCart = product
    ? cartItems.some((item) => item.id === product.id)
    : false;

  const isInFavorites = product
    ? favorites.some((item: Product) => item.id === product.id)
    : false;

  const handleAddToCart = () => {
    if (!product) return;
    if (isInCart) {
      dispatch(removeFromCart(product.id));
    } else {
      dispatch(
        addToCart({
          id: product.id,
          name: product.name,
          image: product.images[0],
          price: product.priceDiscount || product.priceRegular,
        })
      );
    }
  };

  const handleToggleFavorite = () => {
    if (!product) return;
    dispatch(toggleFavorite(product));
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!category || !productId) return;

      try {
        const productData = await productsApi.fetchDataId<Product>(
          category as EndpointName,
          productId
        );

        if (!productData) return;
        setProduct(productData);
        setSelectCapacity(productData.capacity || "");

        if (category === "phones") {
          const productsData = await productsApi.fetchData<Product>(
            category as EndpointName,
            { model: productData.id.slice(0, 15) }
          );
          if (productsData?.data) {
            setProducts(productsData.data);
          }
        } else {
          const productsData = await productsApi.fetchData<Product>(
            category as EndpointName,
            {}
          );
          if (productsData?.data) {
            setProducts(
              productsData.data.filter((p) => p.id !== productId).slice(0, 8)
            );
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [category, productId]);

  const handleCapacityClick = (capacity: string) => {
    setSelectCapacity(capacity);
  };

  const getCharacteristic = (product: Product): ProductCharacteristic[] => {
    const baseCharacteristic: ProductCharacteristic[] = [
      { key: "Screen", value: product.screen },
      { key: "Resolution", value: product.resolution },
      { key: "Processor", value: product.processor },
      { key: "RAM", value: product.ram },
      { key: "Built in memory", value: product.capacity },
      { key: "Cell", value: product.cell },
    ];

    if (product.category !== "accessories" && "camera" in product) {
      baseCharacteristic.push({ key: "Camera", value: product.camera });
    }

    if (product.category !== "accessories" && "zoom" in product) {
      baseCharacteristic.push({ key: "Zoom", value: product.zoom });
    }
    return baseCharacteristic;
  };

  const characteristics: ProductCharacteristic[] = product
    ? getCharacteristic(product)
    : [];

  const mainImageSrc =
    productImg || (product?.images?.[0] ? `/${product.images[0]}` : null);

  return (
    <div className="page container">
      <Breadcrumb />
      <h2 className={styles.mainTitle}>{product?.name}</h2>

      <div className={styles.imagesContainer}>
        <ul className={styles.imagesList}>
          {product?.images.map((image, i) => (
            <li key={i} className={styles.imageItem}>
              <button
                onClick={() => handleImageClick(image)}
                className={`${styles.imageButton} ${
                  productImg === `/${image}` ? styles.imageButtonActive : ""
                }`}
                type="button"
              >
                <img
                  src={`/${image}`}
                  alt={product?.name || ""}
                  className={styles.image}
                />
              </button>
            </li>
          ))}
        </ul>

        <div className={styles.mainImage}>
          {mainImageSrc && <img src={mainImageSrc} alt={product?.name || ""} />}
        </div>

        <div className={styles.infoContainer}>
          <div className={styles.colorsContainer}>
            <p className={styles.title}>Available colors</p>
            <div className={styles.colorsList}>
              {AVAILABLE_COLORS.map((color) => (
                <button key={color.id} className={styles.colorButton}>
                  <img
                    src={color.image}
                    alt={color.color}
                    className={styles.colorImage}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className={styles.capacityContainer}>
            <p className={styles.title}>Select capacity</p>
            <div className={styles.capacitiesList}>
              {product?.capacityAvailable?.map((capacity, i) => (
                <button
                  key={i}
                  onClick={() => handleCapacityClick(capacity)}
                  className={`${styles.capacityBtn} ${
                    capacity === selectCapacity ? styles.capacityActive : ""
                  }`}
                >
                  {capacity}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.prices}>
            <h3 className={styles.priceDiscount}>${product?.priceDiscount}</h3>
            <h3 className={styles.priceRegular}>${product?.priceRegular}</h3>
          </div>

          <div className={styles.buttons}>
            <ButtonCard
              className={styles.addBtn}
              onClick={handleAddToCart}
              label={isInCart ? "Selected" : "Add to cart"}
              isSelected={isInCart}
            />
            <button
              onClick={handleToggleFavorite}
              className={`${styles.favoriteButton} ${
                isInFavorites ? styles.favoriteButtonActive : ""
              }`}
              aria-label={
                isInFavorites ? "Remove from favorites" : "Add to favorites"
              }
              type="button"
            >
              <FavoriteIcon
                className={styles.favoritesIcon}
                width={48}
                height={48}
                isActive={isInFavorites}
              />
            </button>
          </div>

          <div className={styles.charContainer}>
            {characteristics.slice(0, 4).map((char, i) => (
              <div key={i} className={styles.charList}>
                <span className={styles.charKey}>{char.key}</span>
                <span className={styles.charValue}>{char.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.aboutContainer}>
        <div className={styles.descriptionContainer}>
          <h3 className={styles.aboutTitle}>About</h3>
          {product?.description?.map((el, i) => (
            <div key={i}>
              <h3 className={styles.aboutTittle}>{el.title}</h3>
              <p className={styles.aboutText}>{el.text[0]}</p>
              {el.text[1] && <p className={styles.aboutText}>{el.text[1]}</p>}
            </div>
          ))}
        </div>

        <div className={styles.fullCharContainer}>
          <h3 className={styles.techTitle}>Tech specs</h3>
          {characteristics.map((char, i) => (
            <div key={i} className={styles.charList}>
              <span className={styles.charAllKey}>{char.key}</span>
              <span className={styles.charAllValue}>{char.value}</span>
            </div>
          ))}
        </div>
      </div>

      {products.length > 0 && (
        <div className={styles.alsoLike}>
          <HomeSlider products={products} title="You may also like" />
        </div>
      )}
    </div>
  );
};

export default Details;
