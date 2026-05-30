import React from "react";
import styles from "./Footer.module.scss";
import Link from "next/link";
import { LogoIcon } from "../icons";
import { FooterLinks } from "./FooterLinks";
import { ScrollToTopButton } from "./ScrollToTopButton";

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContent}`}>
        <div className={styles.logo}>
          <Link href="/">
            <LogoIcon className={styles.logoIcon} />
          </Link>
        </div>
        <FooterLinks />
        <ScrollToTopButton />
      </div>
    </footer>
  );
};

export default Footer;
