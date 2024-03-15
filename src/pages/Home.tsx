import useFetch from "../useFetch";
import reactLogo from "../assets/react.svg";
import { ProductTypes } from "../components/ProductCard";
import Product from "../components/Product";


const Home = () => {
  const { data, isPending, error } = useFetch(
    "https://fakestoreapi.com/products/"
  );
  // console.log(data, isPending, error);
  const products: ProductTypes[] = data;
 
  return (
    <>
    
  <div className="font-bold text-red-700 text-3xl">Home</div>
  <div>
  {error && <div>{error}</div>}
      {isPending && (
        <div className="flex items-center justify-items-center">
          <img src={reactLogo} alt="" className="logo" />
        </div>
      )}
      <div className="flex items-center">
        {products && (
          <div>
            <div className="flex flex-col items-center">
               
                  <Product products={products} />
               
            </div>
          </div>
        )}
      </div>
  </div>
  </>
  );
};

export default Home;
