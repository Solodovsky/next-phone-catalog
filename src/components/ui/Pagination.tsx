"use client";

import React from "react";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";
import SliderLeftIcon from "./../icons/SliderLefticon";
import SliderRightIcon from "./../icons/SliderRightIcon";

type Props = {
  totalItems: number;
  items: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  embedded?: boolean;
  embeddedAlign?: "start" | "center";
};

const Pagination: React.FC<Props> = ({
  totalItems,
  items,
  currentPage,
  onPageChange,
  embedded = false,
  embeddedAlign = "center",
}) => {
  const totalPages = Math.ceil(totalItems / items);

  if (totalPages <= 1) {
    return null;
  }

  const handlePageClick = (e: { selected: number }) => {
    onPageChange(e.selected + 1);
  };

  const prevArrow = () => {
    return <SliderLeftIcon />;
  };

  const nextArrow = () => {
    return <SliderRightIcon />;
  };

  const containerClassName = [
    styles.pagination,
    embedded && styles.paginationEmbedded,
    embedded &&
      embeddedAlign === "start" &&
      styles.paginationEmbeddedAlignStart,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <ReactPaginate
      nextLabel={nextArrow()}
      onPageChange={handlePageClick}
      pageRangeDisplayed={4}
      marginPagesDisplayed={0}
      pageCount={totalPages}
      previousLabel={prevArrow()}
      forcePage={currentPage - 1}
      renderOnZeroPageCount={null}
      containerClassName={containerClassName}
      pageClassName={styles.pageItem}
      pageLinkClassName={styles.pageLink}
      previousClassName={styles.pageItem}
      previousLinkClassName={styles.pageLink}
      nextClassName={styles.pageItem}
      nextLinkClassName={styles.pageLink}
      breakClassName={styles.pageItem}
      breakLinkClassName={styles.pageLink}
      activeClassName={styles.active}
      disabledClassName={styles.disabled}
    />
  );
};

export default Pagination;
