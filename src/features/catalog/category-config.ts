import type { CategorySlug } from "@/lib/catalog-api";

export const CATEGORY_PAGES: Record<
  CategorySlug,
  { title: string; emptyMessage: string }
> = {
  phones: {
    title: "Mobile phones",
    emptyMessage: "There are not phones yet",
  },
  tablets: {
    title: "Tablets",
    emptyMessage: "There are not tablets yet",
  },
  accessories: {
    title: "Accessories",
    emptyMessage: "There are not accessories yet",
  },
};
