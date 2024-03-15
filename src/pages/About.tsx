import useFetch from "../useFetch";
import reactLogo from "../assets/react.svg";
import { ProductTypes } from "../components/ProductCard";
import RatingStars from "../components/RatingStars";
import { Link } from "react-router-dom";
import { formatCurrency } from "../utilities/FormatCurrency";
import SearchBar from "../components/SearchBar";
import { useState } from "react";

const About = () => {
  const { data, isPending, error } = useFetch(
    "https://fakestoreapi.com/products/"
  );
  const products: ProductTypes[] = data;
  const [searchInput, setSearchInput] = useState("");
  const searchedItem = (searchparam: string) => {
    setSearchInput(searchparam);
  };
  const searchProductList = products?.filter((product) => {
   if(searchInput){

      return product.title.toLowerCase().includes(searchInput.toLowerCase())
   } else return true
   
  });
  return (
    <>
      <div className="font-bold text-red-700 text-3xl">Product Search</div>
      <div>
        {error && <div>{error}</div>}
        {isPending && (
          <div className="flex items-center justify-items-center">
            <img src={reactLogo} alt="" className="logo" />
          </div>
        )}
        <div className="flex items-center">
          {searchProductList && (
            <div className="flex flex-col items-center">
              <SearchBar searchedItem={searchedItem} />

              <div className="grid grid-cols-3 gap-10 items-center mx-auto">
                {searchProductList.map((item) => {
                  return (
                    <div
                      key={item.id}
                      className="shadow-lg py-3 flex flex-col items-center"
                    >
                      <div className="image">
                        <img src={item.image} alt={item.title} />
                      </div>
                      <Link to={`/store/${item.id}`}>
                        <h5 className="text-sm  font-semibold text-gray-900 dark:text-white">
                          {item.title}
                        </h5>
                      </Link>
                      <div className="mb-5 mt-2.5 flex items-center ">
                        <RatingStars {...item.rating} />
                        <span className="ml-3 mr-2 rounded bg-cyan-100 px-2.5 py-0.5 text-xs font-semibold text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800">
                          ({item.rating.count})&nbsp;ratings
                        </span>
                      </div>
                      <span className="text-xl font-bold text-red-700 dark:text-white">
                        {formatCurrency(item.price)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default About;
