"use client";

import React, { Suspense, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStoreHydrated } from "@/store/context/StoreHydrationContext";
import { useAuthStore } from "@/store/client/auth-store";
import { useCartStore } from "@/store/client/cart-store";
import { useFavoritesStore } from "@/store/client/favorites-store";
import {
  FavoriteIcon,
  CartIcon,
  MenuIcon,
  CloseIcon,
  LogoIcon,
  UserIcon,
} from "../icons";
import { MobileMenu } from "./MobileMenu";
import { useMobileMenu } from "./useMobileMenu";
import HeaderSearch from "./HeaderSearch";
import styles from "./Header.module.scss";

const navItems = [
  { to: "/", label: "HOME", end: true },
  { to: "/phones", label: "PHONES" },
  { to: "/tablets", label: "TABLETS" },
  { to: "/accessories", label: "ACCESSORIES" },
];

const Header: React.FC = () => {
  const pathname = usePathname();
  const { isMenuOpen, toggleMenu, closeMenu } = useMobileMenu();

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const hydrated = useStoreHydrated();
  const cartItemsCount = useCartStore((state) => state.totalCount);
  const favoritesCount = useFavoritesStore((state) => state.favorites.length);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);

  const displayCartCount = hydrated ? cartItemsCount : 0;
  const displayFavoritesCount = hydrated ? favoritesCount : 0;
  const displayAuthenticated = hydrated && isAuthenticated;

  const renderFavoritesLink = (extraClass = "", onNavigate?: () => void) => (
    <Link
      href="/favorites"
      className={`${styles.iconLink} ${extraClass} ${
        pathname === "/favorites" ? styles.mobileIconLinkActive : ""
      }`.trim()}
      aria-label="Favorites"
      onClick={onNavigate}
    >
      <FavoriteIcon className={styles.icon} width={40} height={40} />
      {displayFavoritesCount > 0 && (
        <span className={styles.badge}>{displayFavoritesCount}</span>
      )}
    </Link>
  );

  const renderCartLink = (extraClass = "", onNavigate?: () => void) => (
    <Link
      href="/cart"
      className={`${styles.iconLink} ${extraClass} ${
        pathname === "/cart" ? styles.mobileIconLinkActive : ""
      }`.trim()}
      aria-label="Cart"
      onClick={onNavigate}
    >
      <CartIcon className={styles.icon} />
      {displayCartCount > 0 && (
        <span className={styles.badge}>{displayCartCount}</span>
      )}
    </Link>
  );

  const renderAuthLink = (extraClass = "", onNavigate?: () => void) => {
    if (displayAuthenticated) {
      return (
        <Link
          href="/account"
          className={`${styles.iconLink} ${extraClass} ${
            pathname === "/account" ? styles.mobileIconLinkActive : ""
          }`.trim()}
          aria-label="Account"
          title={user?.email ?? "Account"}
          onClick={onNavigate}
        >
          <UserIcon className={styles.icon} width={16} height={16} />
        </Link>
      );
    }

    return (
      <Link
        href="/login"
        className={`${styles.iconLink} ${extraClass} ${
          pathname === "/login" ? styles.mobileIconLinkActive : ""
        }`.trim()}
        aria-label="Login"
        onClick={onNavigate}
      >
        <UserIcon className={styles.icon} width={16} height={16} />
      </Link>
    );
  };

  return (
    <header className={styles.header}>
      <div className={`${styles.headerContainer} ${styles.headerContent}`}>
        <div className={styles.logo}>
          <Link href="/" className={styles.logoLink} aria-label="Home">
            <LogoIcon />
          </Link>
        </div>

        <nav className={styles.nav} aria-label="Main navigation">
          {navItems.map((item) => {
            const isActive = item.end
              ? pathname === item.to
              : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                href={item.to}
                className={`${styles.navLink} ${
                  isActive ? styles.navLinkActive : ""
                }`.trim()}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Suspense fallback={<div className={styles.searchFallback} aria-hidden />}>
          <HeaderSearch />
        </Suspense>

        <div className={styles.actions}>
          <div className={styles.desktopIcons}>
            {renderFavoritesLink()}
            {renderCartLink()}
            {renderAuthLink()}
          </div>
          <button
            className={styles.menuButton}
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Menu"}
          >
            {isMenuOpen ? (
              <CloseIcon className={styles.closeIcon} />
            ) : (
              <MenuIcon className={styles.menuIcon} />
            )}
          </button>
        </div>

        <MobileMenu
          isOpen={isMenuOpen}
          onClose={closeMenu}
          navItems={navItems}
          renderFavoritesLink={renderFavoritesLink}
          renderCartLink={renderCartLink}
          renderAuthLink={renderAuthLink}
        />
      </div>
    </header>
  );
};

export default Header;
