import { Suspense } from "react";
import type { CategorySlug } from "@/lib/catalog-api";
import PageLoader from "@/components/ui/PageLoader";
import ProductPage from "@/features/catalog/ProductPage";
import { CATEGORY_PAGES } from "@/features/catalog/category-config";

type Props = {
  category: CategorySlug;
};

export default function CategoryRoutePage({ category }: Props) {
  const { title, emptyMessage } = CATEGORY_PAGES[category];

  return (
    <Suspense fallback={<PageLoader />}>
      <ProductPage
        category={category}
        title={title}
        emptyMessage={emptyMessage}
      />
    </Suspense>
  );
}
