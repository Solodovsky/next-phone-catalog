"use client";

import React from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks/redux";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from "@/store/slices/cartSlice";
import styles from "./Cart.module.scss";
import Breadcrumb from "../components/ui/Breadcrumb";
import { CloseIcon, MinuseIcon, PlusIcon } from "../components/icons";

import ButtonCard from "../components/ui/ButtonCard";

const Cart: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, totalCount } = useAppSelector((state) => state.cart);

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

  const handleClearCart = () => {
    dispatch(clearCart());
  };

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
        <div className={styles.items}>
          {items.map((item) => (
            <div key={item.id} className={styles.cartItem}>
              <div className={styles.itemInfo}>
                <button onClick={() => handleRemoveItem(item.id)}>
                  <CloseIcon />
                </button>
                <img
                  src={`/${item.image}`}
                  alt={item.name}
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
        <div className={styles.total}>
          <h3 className={styles.totalPrice}>${totalPrice}</h3>
          <p className={styles.totalText}>Total for {totalCount} items</p>
          <ButtonCard label="Pay" />
        </div>
      </div>
    </section>
  );
};

export default Cart;
