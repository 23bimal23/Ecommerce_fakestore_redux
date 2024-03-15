import useFetch from "../useFetch";
import { useState } from "react";

type PropsType = {
  filterValueSelected: (selectedValue: string) => void;
};

const Filter = ({ filterValueSelected }: PropsType) => {
  const { data } = useFetch("https://fakestoreapi.com/products/");

  const extractCategories = () => {
    if (!data) return [];
    const categoriesSet = new Set(data?.map((product) => product.category));
    return ["all", ...Array.from(categoriesSet)];
  };

  const [selectedFilter, setSelectedFilter] = useState("all");

  const handleFilterChange = (e) => {
    const selectedValue = e.target.getAttribute("value");
    setSelectedFilter(selectedValue);
    filterValueSelected(selectedValue);
  };

  return (
    <div className="flex items-center my-5 ">
      {data && (
        <ul className="flex items-center gap-4 justify-between">
          {extractCategories().map((category) => (
            <li
              key={category}
              value={category}
              className={`bg-${
                selectedFilter === category ? "green" : "yellow"
              }-400 text-xs px-4 py-2 uppercase rounded-2xl shadow-2xl hover:bg-${
                selectedFilter === category ? "green" : "blue"
              }-200 transition-all hover:text-black text-white`}
              onClick={handleFilterChange}
            >
              {category}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Filter;
