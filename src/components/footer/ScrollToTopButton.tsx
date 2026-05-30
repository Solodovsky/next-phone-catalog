"use client";

import React from "react";
import { ArrowIcon } from "../icons";
import styles from "./Footer.module.scss";

export const ScrollToTopButton: React.FC = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
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
  );
};
