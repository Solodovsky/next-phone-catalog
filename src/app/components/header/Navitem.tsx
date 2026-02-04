import React from "react";
import Link from "next/link";
import styles from "./Header.module.scss";

type Props = {
  to: string;
  children: React.ReactNode;
  end?: boolean;
};

const NavItem: React.FC<Props> = ({ to, children, end = false }) => {
  return (
    <Link
      href={to}
      className={({ isActive }) =>
        `${styles.navLink} ${isActive ? styles.navLinkActive : ""}`
      }
      end={end}
    >
      {children}
    </Link>
  );
};

export default NavItem;
