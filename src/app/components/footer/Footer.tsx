"use client";

import React from "react";
import styles from "./Footer.module.scss";
import Link from "next/link";
import { ArrowIcon, LogoIcon } from "../icons";
import { FooterLinks } from "./FooterLinks";

export const Footer: React.FC = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContent}`}>
        <div className={styles.logo}>
          <Link href="/">
            <LogoIcon className={styles.logoIcon} />
          </Link>
        </div>
        <FooterLinks />
        <button
          className={styles.arrowButton}
          onClick={handleScrollToTop}
          aria-label="Back to top"
          type="button"
        >
          <span className={styles.arrowButtonText}>Back to top</span>
          <ArrowIcon
            className={styles.arrowIcon}
            width={32}
            height={32}
            fill="#313237"
            stroke="#B4BDC4"
          />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
