import { Card } from "flowbite-react";
import { useParams } from "react-router-dom";
import reactLogo from "../assets/react.svg";
import useFetch from "../useFetch";
import { formatCurrency } from "../utilities/FormatCurrency";
import RatingStars from "./RatingStars";
import { useSelector, useDispatch } from "react-redux";
import {
  increaseCartQuantity,
  decreaseCartQuantity,
  removeCartQuantity,
} from "../store/feature/cart/CartSlice";
import type { RootState } from "../store/Store";

const ProductPage = () => {
  const { id } = useParams();
  const {
    data: product,
    error,
    isPending,
  } = useFetch("https://fakestoreapi.com/products/" + id);
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
          className="rounded-lg bg-cyan-700 px-2 py-1.5 text-center text-xs font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
        >
          -
        </button>
        <span className="text-sm">
          <span className="text-black text-xl">{getQuantity(id)}</span> in cart
        </span>
        <button
          onClick={handleIncrease}
          className="rounded-lg bg-cyan-700 px-2 py-1.5 text-center text-xs font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
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
    <div
      className=" flex items-center justify-around my-auto"
      style={{ width: "1200px" }}
    >
      {error && <div>{error}</div>}
      {isPending && (
        <div className="flex items-center justify-items-center">
          <img src={reactLogo} alt="" className="logo" />
        </div>
      )}
      {product && (
        <div className="fles flex-col p-6 m-10 shadow-md ">
          <Card className="p-6" imgSrc={product.image} horizontal>
            <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              {product.title}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {product.description}
            </p>
            <p className="text-sm text-red-700">
              {formatCurrency(product.price)}
            </p>
          </Card>
          <div className="py-2 my-2 shadow-md px-4">
            <div className="flex  items-center justify-between ">
              <RatingStars {...product.rating} />
              <h3 className="bg-blue-100 px-4 py-2 text-xs rounded-lg text-red-700">
                ({product.rating.count})ratings
              </h3>
              {getQuantity(id) > 0
                ? renderQuantityControls()
                : renderAddToCartButton()}
            </div>
            <div className="my-4">
              <span className="bg-green-500 px-4 py-2 text-sm rounded-2xl text-white uppercase font-bold">
                {product.category}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ProductPage;
