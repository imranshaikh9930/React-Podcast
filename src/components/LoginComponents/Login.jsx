import React, { useState } from "react";
import Input from "../../common/Input/Input";
import Button from "../../common/Button/Button";
import { signInWithEmailAndPassword } from "firebase/auth";
import{auth,db} from '../../firebase';
import { doc, getDoc } from "firebase/firestore";
import {useDispatch} from "react-redux";
import { setUser } from '../../slices/userSlice';
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Login = ({}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async()=>{


    setLoading(true);

    if(email && password){
      try{
        
        const userCredentials =  await signInWithEmailAndPassword(auth,email,password);
        
      const  user = userCredentials.user;
        const userDoc = await getDoc(doc(db,"users",user.uid));
      const userData = userDoc.data();


      // console.log("user",user)


      dispatch(setUser({
        name:userData.name,
        email:user.email,
        uid:user.uid,
        // profilePic:fileURL,
      }))

      navigate("/profile")

      toast.success("Sucessfully Login");
      setLoading(false);


    
    }
    catch(e){

      console.log("error" , e);
      toast.eror(e.message);
      setLoading(false);
    }
  }else{

    toast.error("Email and Password Required")
    setLoading(false);
  }
      
     
      
}
  return (
    <div>
      <Input
        state={email}
        setState={setEmail}
        placeholder="Email"
        type="text"
        required={true}
      />
      <Input
        state={password}
        setState={setPassword}
        placeholder="Password"
        type="password"
        required={true}
      />
        <Button text={loading?"Loading":"Login"} disabled={loading} onClick={handleLogin}/>
     
    </div>
  );
};

export default Login;
