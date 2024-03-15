import type { RootState } from "../../Store";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment, incrementByAmount } from "./CounterSlice";
import { useRef, useState } from "react";

export function Counter() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(0);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const inputValue = parseInt(inputRef?.current?.value || '0');
    if (!isNaN(inputValue)) {
      dispatch(incrementByAmount(inputValue));
      setValue(inputValue);
    }
  };
  
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex gap-2">
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
          className="bg-sky-700 text-white px-4 py-2 w-fit"
        >
          +
        </button>
        <span >{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
          className="bg-sky-700 text-white px-4 py-2 w-fit"
        >
         -
        </button>
      </div>
      <div >
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-2">
          <input type="text" ref={inputRef} onChange={(e) => setValue(parseInt(e.target.value))} />{" "}
          <button
          className="bg-sky-700 text-white px-4 py-2 w-fit">+{value}</button>
        </form>
      </div>
    </div>
  );
}
