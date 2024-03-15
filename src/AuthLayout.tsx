import { Outlet } from "react-router-dom"
import BreadCrumb from "./components/BreadCrumb"
import NavBar from "./components/NavBar"

const AuthLayout = () => {
  return (
<>
<NavBar/>
<BreadCrumb/>
<Outlet/>
</>
  )
}

export default AuthLayout