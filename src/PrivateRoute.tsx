import Login from "./pages/Login"
import React, { useEffect, useState } from "react"
import AuthLayout from "./AuthLayout"

const PrivateRoute = () => {
    const [isUser, setIsUser] = useState(false)
    const checkUser = () =>{
        const storedCredentials = localStorage.getItem("userCredentials");
        if(!storedCredentials){
            console.log("User Not Found")
            return
        }
        else{
            setIsUser(true)
            
        }

    }
    useEffect(()=>{
        checkUser();
    },[])

  return (
    <React.Fragment>
        {isUser?  <AuthLayout/>:  <Login/>}
  
  
    </React.Fragment>
  )
}

export default PrivateRoute