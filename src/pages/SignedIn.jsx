import React, { useState } from "react";
import Header from "../components/Header/Header";
import SignedUp from "../SignUpCompnents/SignedUp";
import Login from "../components/LoginComponents/Login";
// import Forgot from "../components/ForgotComponent/Forgot";
import { NavLink } from "react-router-dom";
const SignUp = () => {
  const [flag, setFlag] = useState(false);

  return (
    <>
      <Header />
      <div className="wrapper-container">
        <div className="wrapper">
          {!flag ?<h1>SignUp</h1> : <h1>Login</h1> }
          {!flag ? <SignedUp /> : <> <Login/> </>}
          {!flag ? (
            <p onClick={()=>setFlag(!flag)}>Already Have An Account? Login.</p>
          ) : (
            <div className="signup-forgot-btn">
              <NavLink to={"/forgot"} style={{textDecoration:"none",color:"white",textAlign:'center'}}>Forgot Password</NavLink>
              <p onClick={()=>setFlag(!flag)}>Don't have an account Click here to .Signup</p>
            </div>
            
          )}
        </div>
      </div>
    </>
  );
};

export default SignUp;
