import React from "react";
import ProductPage from "../components/ui/ProductPage";

const Phones: React.FC = () => {
  return (
    <ProductPage
      category="phones"
      title="Mobile phones"
      emptyMessage="There are not phones yet"
    />
  );
};

export default Phones;
