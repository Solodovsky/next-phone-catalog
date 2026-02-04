import React from "react";
import ProductPage from "../components/ui/ProductPage";

const Tablets: React.FC = () => {
  return (
    <ProductPage
      category="tablets"
      title="Tablets"
      emptyMessage="There are not tablets yet"
    />
  );
};

export default Tablets;
