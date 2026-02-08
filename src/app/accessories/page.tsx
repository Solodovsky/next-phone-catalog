import React, { Suspense } from "react";
import ProductPage from "../components/ui/ProductPage";

const Accessories: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductPage
        category="accessories"
        title="Accessories"
        emptyMessage="There are not accessories yet"
      />
    </Suspense>
  );
};

export default Accessories;
