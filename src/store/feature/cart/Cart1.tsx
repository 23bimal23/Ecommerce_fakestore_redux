import type { RootState } from "../../Store";
import { useSelector, useDispatch } from "react-redux";
import storeItems from "../../../data/items.json";
import {
  increaseCartQuantity,
  decreaseCartQuantity,
  removeCartQuantity,
} from "./CartSlice";

const Cart1 = () => {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const getQuantity = (id: number) => {
    const productInCart = cartItems.find((item) => item.id === id);
    return productInCart ? productInCart.quantity : 0;
  };
  const dispatch = useDispatch();
  const handleIncrease = (id: number) => {
    dispatch(increaseCartQuantity({ id }));
  };
  const handleDecrease = (id: number) => {
    dispatch(decreaseCartQuantity({ id }));
  };
  return (
    <div className="grid grid-cols-4 bg-black text-white gap-5 gap-y-8 p-20 rounded-lg">
      {storeItems.map((product) => (
        <div key={product.id} className="d-flex flex-col w-96 ">
          <h2>{product.name}</h2>
          <div className="d-flex gap-2 items-center">
            <button onClick={() => handleIncrease(product.id)}>+</button>
            <span>{getQuantity(product.id)}</span>
            <button onClick={() => handleDecrease(product.id)}>-</button>
          </div>
          <button
            onClick={() => dispatch(removeCartQuantity(product))}
            className="text-xs text-white"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default Cart1;
