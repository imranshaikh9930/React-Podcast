import React, { useState } from "react";
import Header from "../components/Header/Header";
import SignedUp from "../SignUpCompnents/SignedUp";
import Login from "../LoginComponents/Login";
const SignUp = () => {
  const [flag, setFlag] = useState(false);

  return (
    <>
      <Header />
      <div className="wrapper-container">
        <div className="wrapper">
          {!flag ?<h1>SignUp</h1> : <h1>Login</h1> }
          {!flag ? <SignedUp /> : <Login/>}
          {!flag ? (
            <p onClick={()=>setFlag(!flag)}>Already Have An Account? Login.</p>
          ) : (
            <p onClick={()=>setFlag(!flag)}>Don't have an account Click here to .Signup</p>
          )}
        </div>
      </div>
    </>
  );
};

export default SignUp;
