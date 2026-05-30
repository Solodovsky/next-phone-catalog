"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.scss";

type NavItem = {
  to: string;
  label: string;
  end?: boolean;
};

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
  renderFavoritesLink: (extraClass?: string, onNavigate?: () => void) => React.ReactElement;
  renderCartLink: (extraClass?: string, onNavigate?: () => void) => React.ReactElement;
  renderAuthLink: (extraClass?: string, onNavigate?: () => void) => React.ReactElement;
};

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  navItems,
  renderFavoritesLink,
  renderCartLink,
  renderAuthLink,
}) => {
  const pathname = usePathname();

  if (!isOpen) {
    return null;
  }

  const getLinkClassName = (item: NavItem) => {
    const isActive = item.end
      ? pathname === item.to
      : pathname.startsWith(item.to);
    return `${styles.mobileNavLink} ${
      isActive ? styles.mobileNavLinkActive : ""
    }`.trim();
  };

  return (
    <nav className={styles.mobileNav} aria-label="Mobile navigation">
      <div className={styles.mobileNavLinks}>
        {navItems.map((item) => (
          <Link
            key={`${item.to}-mobile`}
            href={item.to}
            className={getLinkClassName(item)}
            onClick={onClose}
          >
            {item.label}
          </Link>
        ))}
      </div>
      <div className={styles.mobileActions}>
        {renderFavoritesLink(styles.mobileIconLink, onClose)}
        {renderCartLink(styles.mobileIconLink, onClose)}
        {renderAuthLink(styles.mobileIconLink, onClose)}
      </div>
    </nav>
  );
};

export default MobileMenu;
