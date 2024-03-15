import type { RootState } from "../store/Store";
import { useSelector, useDispatch } from "react-redux";
import { removeCartQuantity } from "../store/feature/cart/CartSlice";
import useFetch from "../useFetch";
import { formatCurrency } from "../utilities/FormatCurrency";
import NullCart from "../components/NullCart";


export const Cart = () => {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const { data } = useFetch("https://fakestoreapi.com/products/");
  return (
    <div>
      <h2 className="text-4xl text-green-900">Cart </h2>
      <div className="flex flex-col items-center gap-3">
        {cartItems.length > 0 ? (
          cartItems.map((item) => <CartItems key={item.id} {...item} />)
        ) : (
          <NullCart />
        )}
        {cartItems.length > 0 && (
          <div className="flex  justify-items-end text-2xl text-green-700 italic">
            Total&nbsp;&nbsp;
            {formatCurrency(
              cartItems.reduce((total, cartItem) => {
                const item = data?.find((i) => i.id === cartItem.id);
                return total + (item?.price || 0) * cartItem.quantity;
              }, 0)
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export const CartItems = ({ id, quantity }) => {
  const dispatch = useDispatch();
  const { data, isPending, error } = useFetch(
    "https://fakestoreapi.com/products/"
  );

  const item = data?.find((i) => i.id === id);
  if (item == null) return null;

  return (
    <div>
      {error && <div>{error}</div>}
      {isPending && <div> Loading ......</div>}
      {data && (
        <div key={item.id} className="flex items-center gap-4 justify-between ">
          <img src={item.image} alt="product image" className="h-20 w-24" />
          <div
            className="flex items-center justify-between"
            style={{ width: "700px" }}
          >
            <h3 className="text-xs text-green-800">{item.title}</h3>
            <h4 className="text-xs text-green-800">X{quantity}</h4>
            <span className="text-red-600 text-xs">
              {" "}
              {formatCurrency(item.price)}
            </span>
            <div className="text-red-600 text-xs">
              {" "}
              {formatCurrency(item.price * quantity)}
            </div>
            <button
              onClick={() => dispatch(removeCartQuantity(item))}
              className="bg-red-500 text-white text-xs py-2 px-2 mx-4 h-fit "
            >
              Remove
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
