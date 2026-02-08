"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.scss";

type Props = {
  to: string;
  children: React.ReactNode;
  end?: boolean;
};

const NavItem: React.FC<Props> = ({ to, children, end = false }) => {
  const pathname = usePathname();
  const isActive = end ? pathname === to : pathname.startsWith(to);
  const className = `${styles.navLink} ${isActive ? styles.navLinkActive : ""}`;

  return (
    <Link href={to} className={className}>
      {children}
    </Link>
  );
};

export default NavItem;
