import ProductCard from "../components/ProductCard";
import useFetch from "../useFetch";
import { ProductTypes } from "../components/ProductCard";
import Filter from "../components/Filter";
import { useEffect, useState } from "react";
import reactLogo from "../assets/react.svg";

const Store = () => {
  const { data, isPending, error } = useFetch(
    "https://fakestoreapi.com/products/"
  );
  // console.log(data, isPending, error);
  const products: ProductTypes[] = data;
  const [filteredTextValue, setFilteredTextValue] = useState("all");
  useEffect(() => {
    setFilteredTextValue("all");
  }, [data]);
  const onFilterValueSelected = (filterValue: string) => {
    setFilteredTextValue(filterValue);
  };
  const filterProductList = products?.filter((product) => {
    switch (filteredTextValue) {
      case "all":
        return true;
      default:
        return product.category === filteredTextValue;
    }
  });

  return (
    <div className="flex items-center">
      {error && <div>{error}</div>}
      {isPending && (
        <div className="flex items-center justify-items-center">
          <img src={reactLogo} alt="" className="logo" />
        </div>
      )}
      <div className="flex items-center">
        {filterProductList && (
          <div>
            <div className="flex flex-col items-center">
              <Filter filterValueSelected={onFilterValueSelected} />
              <div className="grid grid-cols-3 gap-5" style={{ width: "1200px" }}>
                {filterProductList.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Store;
