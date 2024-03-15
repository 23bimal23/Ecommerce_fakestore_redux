import { Card } from "flowbite-react";
import RatingStars from "./RatingStars";
import { formatCurrency } from "../utilities/FormatCurrency";
import type { RootState } from "../store/Store";
import { useSelector, useDispatch } from "react-redux";
import {
  increaseCartQuantity,
  decreaseCartQuantity,
  removeCartQuantity,
} from "../store/feature/cart/CartSlice";
import { Link } from "react-router-dom";

export type ProductTypes = {
  id: number,
  title: string,
  image: string,
  price: number,
  description: string,
  category: string,
  rating: {
    rate: number,
    count: number,
  };
};


const ProductCard = ({ id, title, image, price, rating }: ProductTypes) => {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const getQuantity = (id: number) => {
    const productInCart = cartItems.find((item) => item.id === id);
    return productInCart ? productInCart.quantity : 0;
  };
  const dispatch = useDispatch();

  const handleIncrease = () => {
    dispatch(increaseCartQuantity({ id, price, title, image }));
  };

  const handleDecrease = () => {
    dispatch(decreaseCartQuantity({ id, price, title, image }));
  };

  const handleRemove = () => {
    dispatch(removeCartQuantity({ id, price, title, image }));
  };

  const renderAddToCartButton = () => (
    <button
      onClick={handleIncrease}
      className="rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
    >
      Add to Cart
    </button>
  );

  const renderQuantityControls = () => (
    <div className="flex flex-col gap-1 items-center">
      <div className="flex gap-2">
        <button
          onClick={handleDecrease}
          className="rounded-lg bg-cyan-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
        >
          -
        </button>
        <span className="quantity-display">
          <span className="text-red-900 text-2xl">{getQuantity(id)}</span> in
          cart
        </span>
        <button
          onClick={handleIncrease}
          className="rounded-lg bg-cyan-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
        >
          +
        </button>
      </div>
      <button
        onClick={handleRemove}
        className="rounded-lg bg-red-700 px-2 py-1.5 text-center text-xs font-medium text-white w-fit"
      >
        Remove
      </button>
    </div>
  );
  

  return (
    <Card className="max-w-sm px-4 " imgAlt={title} imgSrc={image}>
      <Link to={`/store/${id}`}>
        <h5 className="text-sm font-semibold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
      </Link>

      <div className="mb-5 mt-2.5 flex items-center ">
        <RatingStars {...rating} />
        <span className="ml-3 mr-2 rounded bg-cyan-100 px-2.5 py-0.5 text-xs font-semibold text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800">
          ({rating.count})&nbsp;ratings
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xl font-bold text-red-700 dark:text-white">
          {formatCurrency(price)}
        </span>
        {getQuantity(id) > 0
          ? renderQuantityControls()
          : renderAddToCartButton()}
      </div>
    </Card>
  );
};

export default ProductCard;
