import { Button, Navbar } from "flowbite-react";
import reactLogo from "../assets/react.svg";
import { IoMdCart } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import type { RootState } from "../store/Store";
import { useSelector } from "react-redux";

const baseUrl = "http://localhost:5173";
const NavBar = () => {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const cartQuantity = cartItems.reduce((quantity, item) =>item?.quantity + quantity, 0)
  const navigate = useNavigate();
  const count = useSelector((state: RootState) => state.counter.value);
  const handleLogout = () => {
    navigate("/login");
    localStorage.clear();
  };
  return (
    <Navbar fluid rounded className=" fixed left-0 top-0 w-full">
      <Navbar.Brand as={Link} to={baseUrl}>
        <img
          src={reactLogo}
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite React Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          React Store
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Button onClick={handleLogout}>Log out </Button>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse className="items-center">
        <Navbar.Link as={Link} to="/" active>
          Home <span className="text-red-500">{count}</span>
        </Navbar.Link>
        <Navbar.Link href="about">About</Navbar.Link>
        <Navbar.Link as={Link} to="/store">
          Store
        </Navbar.Link>
        <Navbar.Link href="#">Contact</Navbar.Link>
        <Navbar.Link as={Link} to="/cart" className="flex items-center">
          <IoMdCart
            fontSize={36}
            color="white"
            className="rounded-full border-2 hover:bg-red-400 
            hover:border-pink-400 border-sky-700 p-2 relative bg-sky-700"
            style={{ position: "relative" }}
          />
          <span
            className="absolute top-2  text-white text-xs bg-red-500 px-1 rounded-lg"
            style={{ position: "absolute", right: "38%" }}
          >
            {cartQuantity}
          </span>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default NavBar;
