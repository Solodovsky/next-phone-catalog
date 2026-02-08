import React, { Suspense } from "react";
import ProductPage from "../components/ui/ProductPage";

const Tablets: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductPage
        category="tablets"
        title="Tablets"
        emptyMessage="There are not tablets yet"
      />
    </Suspense>
  );
};

export default Tablets;
