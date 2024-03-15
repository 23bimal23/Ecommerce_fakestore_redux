import { Button } from "flowbite-react";

type PropsType ={
  count: number,
  handleClick: () => void
}
export const ButtonBlue = ({count, handleClick}:PropsType) => {
  return (
    <div>
      <Button onClick={() => handleClick()}>{count}</Button>
    </div>
  );
};
