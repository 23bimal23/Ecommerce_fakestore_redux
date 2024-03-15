import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";
const BreadCrumb = () => {
  return (
    <Breadcrumb
      aria-label="Default breadcrumb example"
      className="text-white items-start py-6 px-6 my-4"
    >
      <Breadcrumb.Item href="#" icon={HiHome} className="text-white">
        Home
      </Breadcrumb.Item>
      <Breadcrumb.Item href="#" className="text-white">
        Projects
      </Breadcrumb.Item>
      <Breadcrumb.Item className="text-white">Flowbite React</Breadcrumb.Item>
    </Breadcrumb>
  );
};
export default BreadCrumb;
