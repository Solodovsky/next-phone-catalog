import React, { Suspense } from "react";
import ProductPage from "../components/ui/ProductPage";

const Phones: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductPage
        category="phones"
        title="Mobile phones"
        emptyMessage="There are not phones yet"
      />
    </Suspense>
  );
};

export default Phones;
