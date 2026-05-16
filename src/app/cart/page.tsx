"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/store/hooks/redux";
import { removeFromCart, updateQuantity } from "@/store/slices/cartSlice";
import styles from "./Cart.module.scss";
import Breadcrumb from "../components/ui/Breadcrumb";
import { CloseIcon, MinuseIcon, PlusIcon } from "../components/icons";
import ButtonCard from "../components/ui/ButtonCard";
import Pagination from "../components/ui/Pagination";

const ITEMS_PER_PAGE = 4;

const Cart: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, totalCount } = useAppSelector((state) => state.cart);
  const router = useRouter();
  const [page, setPage] = useState(1);
  const isAuth = useAppSelector(
    (state) => state.auth?.isAuthenticated ?? false
  );

  const handlePayClick = () => {
    if (!isAuth) {
      router.push("/login");
      return;
    }
  };

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity }));
    } else {
      dispatch(removeFromCart(id));
    }
  };

  const totalPages = Math.max(1, Math.ceil(items.length / ITEMS_PER_PAGE));
  const effectivePage = Math.min(page, totalPages);
  const sliceStart = (effectivePage - 1) * ITEMS_PER_PAGE;
  const visibleItems = items.slice(sliceStart, sliceStart + ITEMS_PER_PAGE);

  if (totalCount === 0) {
    return (
      <section className={`page container ${styles.cartPage}`}>
        <Breadcrumb />
        <h2 className={styles.title}>Cart</h2>
        <div className={styles.emptyCart}>
          <p className={styles.emptyCartText}>There are not products</p>
        </div>
      </section>
    );
  }

  return (
    <section className={`page container ${styles.cartPage}`}>
      <Breadcrumb />
      <h2 className={styles.title}>Cart</h2>
      <div className={styles.cart}>
        <div className={styles.itemsColumn}>
          <div className={styles.items}>
            {visibleItems.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <div className={styles.itemInfo}>
                  <button onClick={() => handleRemoveItem(item.id)}>
                    <CloseIcon />
                  </button>
                  <Image
                    src={`/${item.image}`}
                    alt={item.name}
                    width={80}
                    height={80}
                    className={styles.itemImage}
                  />
                  <p className={styles.itemName}>{item.name}</p>
                  <div className={styles.quantityAndPrice}>
                    <div className={styles.quantity}>
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity - 1)
                        }
                        className={styles.quantityButton}
                      >
                        <MinuseIcon />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
                        }
                        className={styles.quantityButton}
                      >
                        <PlusIcon />
                      </button>
                    </div>
                    <p className={styles.itemPrice}>${item.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.total}>
          <h3 className={styles.totalPrice}>${totalPrice}</h3>
          <p className={styles.totalText}>Total for {totalCount} items</p>
          <ButtonCard onClick={handlePayClick} label="Pay" />
        </div>
        <div className={styles.cartPagination}>
          <Pagination
            totalItems={items.length}
            items={ITEMS_PER_PAGE}
            currentPage={effectivePage}
            onPageChange={setPage}
            embedded
            embeddedAlign="center"
          />
        </div>
      </div>
    </section>
  );
};

export default Cart;
