import React, { useState } from "react";
import Header from "../Header/Header";
import "./Forgot.css";
import { useNavigate } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import Input from "../../common/Input/Input";
import Button from "../../common/Button/Button";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        navigate("/");
        toast.success("Check Your Gmail");
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false);
      });
  };

  return (
    <>
   <Header/>
    <div className="forgot-container">
      <h2 style={{color:"var(--white)"}}>Forgot Password</h2>
      <form onSubmit={handleResetPassword}>
        <Input
          state={email}
          setState={setEmail}
          placeholder={"Enter your email"}
          type="text"
          required={true}
        />
        <Button
          text={loading ? "Loading" : "Reset"}
          disabled={loading}
          onClick={handleResetPassword}
        />
      </form>
    </div>
    </>
  );
};

export default ForgotPassword;
