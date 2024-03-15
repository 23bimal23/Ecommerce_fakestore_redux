import { Link } from "react-router-dom";
import ShoppingCartPng from "../assets/shopping-cart.png";
import { FaArrowLeft } from "react-icons/fa";
const NullCart = () => {
  return (
    <div className="flex flex-col items-center shadow-lg p-10 rounded-xl">
      <div style={{ height: "300px" }}>
        <img
          src={ShoppingCartPng}
          alt=""
          style={{ objectFit: "cover", height: "100%", width: "100%" }}
        />
      </div>
      <div className="flex flex-col items-start shadow-lg p-10 gap-1 rounded-xl">
        <p className="font-bold text-lg text-black">Seems Empty Mate ..</p>
        <h3 className="font-bold text-lg text-black">Let's do some Shopping</h3>
        <Link to="/store" className="font-bold text-lg text-black hover:text-black">
          <div className="flex items-center  gap-3 p-2 bg-teal-500 hover:bg-teal-300 transition-all rounded-md">
            <FaArrowLeft size={16} color="white" />
            Back To Store
          </div>
        </Link>
      </div>
    </div>
  );
};

export default NullCart;
