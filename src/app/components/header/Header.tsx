"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppSelector } from "../../../store/hooks/redux";
import {
  FavoriteIcon,
  CartIcon,
  MenuIcon,
  CloseIcon,
  LogoIcon,
} from "../icons";
import { MobileMenu } from "./MobileMenu";
import { useMobileMenu } from "./useMobileMenu";
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
  const cartItemsCount = useAppSelector((state) => state.cart?.totalCount || 0);
  const favoritesCount = useAppSelector(
    (state: any) => state.favorites?.length || 0
  );

  const renderFavoritesLink = (extraClass = "") => (
    <Link
      href="/favorites"
      className={`${styles.iconLink} ${extraClass} ${
        pathname === "/favorites" ? styles.mobileIconLinkActive : ""
      }`.trim()}
      aria-label="Favorites"
    >
      <FavoriteIcon className={styles.icon} width={40} height={40} />
      {favoritesCount > 0 && (
        <span className={styles.badge}>{favoritesCount}</span>
      )}
    </Link>
  );

  const renderCartLink = (extraClass = "") => (
    <Link
      href="/cart"
      className={`${styles.iconLink} ${extraClass} ${
        pathname === "/cart" ? styles.mobileIconLinkActive : ""
      }`.trim()}
      aria-label="Cart"
    >
      <CartIcon className={styles.icon} />
      {cartItemsCount > 0 && (
        <span className={styles.badge}>{cartItemsCount}</span>
      )}
    </Link>
  );

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

        <div className={styles.actions}>
          <div className={styles.desktopIcons}>
            {renderFavoritesLink()}
            {renderCartLink()}
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
        />
      </div>
    </header>
  );
};

export default Header;
