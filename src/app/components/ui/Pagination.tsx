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
};

const Pagination: React.FC<Props> = ({
  totalItems,
  items,
  currentPage,
  onPageChange,
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
      containerClassName={styles.pagination}
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
