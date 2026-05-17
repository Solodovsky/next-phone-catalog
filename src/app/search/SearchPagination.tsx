"use client";

import { useRouter } from "next/navigation";
import Pagination from "../components/ui/Pagination";

type Props = {
  totalItems: number;
  items: number;
  currentPage: number;
  q: string;
};

export default function SearchPagination({
  totalItems,
  items,
  currentPage,
  q,
}: Props) {
  const router = useRouter();

  const onPageChange = (page: number) => {
    const params = new URLSearchParams();
    const trimmed = q.trim();
    if (trimmed) {
      params.set("q", trimmed);
    }
    params.set("page", String(page));
    params.set("items", String(items));
    router.replace(`/search?${params.toString()}`);
  };

  return (
    <Pagination
      totalItems={totalItems}
      items={items}
      currentPage={currentPage}
      onPageChange={onPageChange}
    />
  );
}
