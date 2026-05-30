"use client";

import React, { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { ReadonlyURLSearchParams } from "next/navigation";
import { SearchIcon } from "../icons";
import styles from "./Header.module.scss";

type InnerProps = {
  initialQ: string;
  pathname: string;
  searchParams: ReadonlyURLSearchParams;
};

const HeaderSearchInner: React.FC<InnerProps> = ({
  initialQ,
  pathname,
  searchParams,
}) => {
  const router = useRouter();
  const onSearchPage = pathname === "/search";
  const [value, setValue] = useState(initialQ);

  const applySearch = () => {
    const trimmed = value.trim();
    const params = onSearchPage
      ? new URLSearchParams(searchParams.toString())
      : new URLSearchParams();
    if (trimmed) {
      params.set("q", trimmed);
    } else {
      params.delete("q");
    }
    params.set("page", "1");
    if (!params.has("items")) {
      params.set("items", "16");
    }
    router.push(`/search?${params.toString()}`);
    setValue("");
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    applySearch();
  };

  return (
    <form className={styles.searchForm} onSubmit={onSubmit} role="search">
      <label htmlFor="header-search" className={styles.searchLabel}>
        Search products
      </label>
      <SearchIcon className={styles.searchIcon} width={16} height={16} />
      <input
        id="header-search"
        name="q"
        type="search"
        className={styles.searchInput}
        placeholder="Search..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        autoComplete="off"
        enterKeyHint="search"
      />
    </form>
  );
};

const HeaderSearch: React.FC = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const qFromUrl =
    pathname === "/search" ? (searchParams.get("q") ?? "") : "";

  return (
    <HeaderSearchInner
      key={pathname}
      initialQ={qFromUrl}
      pathname={pathname}
      searchParams={searchParams}
    />
  );
};

export default HeaderSearch;
