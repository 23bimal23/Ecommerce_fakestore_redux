import { Link } from "react-router-dom";
import RatingStars from "./RatingStars";
import { formatCurrency } from "../utilities/FormatCurrency";
import { useState } from "react";
import { Pagination, Stack } from "@mui/material";
type productProps = {
  products: {
    id: number;
    title: string;
    image: string;
    price: number;
    description: string;
    category: string;
    rating: {
      rate: number;
      count: number;
    };
  };
};
const Product = ({ products }: productProps) => {
  const [items, setItems] = useState(products?.slice(0, 20));
  const [pageNumber, setPageNumber] = useState(0);
  const productsPerPage = 4;
  const pagesVisited = pageNumber * productsPerPage;
  const displayProducts = items
    .slice(pagesVisited, pagesVisited + productsPerPage)
    .map((item) => {
      return (
        <div key={item.id} className="shadow-lg py-3">
          <div className="image">
            <img src={item.image} alt={item.title} />
          </div>
          <Link to={`/store/${item.id}`}>
            <h5 className="text-sm font-semibold text-gray-900 dark:text-white">
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
    }); 
    const pageCount = Math.ceil(items.length / productsPerPage);
    const handleChange = (event,value:number) => {
      setPageNumber(value);
    };
  return (
    <div className="flex gap-5 flex-col items-center">
        <div className="grid grid-cols-3 gap-10" style={{ width: "1200px" }}>
            {displayProducts}
        </div>
        <Stack spacing={10}>
        <Pagination
          count={pageCount}
          onChange={handleChange}
          variant="outlined"
          shape="rounded"
        />
          </Stack>
    </div>
  );
};

export default Product;
