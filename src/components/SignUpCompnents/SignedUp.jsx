import React,{useState} from 'react'
import Input from '../common/Input/Input';
import Button from '../common/Button/Button';
import {auth,db } from "../firebase";
import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import { doc, setDoc } from "firebase/firestore";
import {useDispatch} from "react-redux";
import { setUser } from '../slices/userSlice';
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

const SignedUp = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading,setLoading]  = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSignOut = async()=>{

      setLoading(true)

      if(password === confirmPassword && password.length >= 6){
      try{
        
        const userCredentials =  await createUserWithEmailAndPassword(auth,email,password);
        
      const user  = userCredentials.user;

      console.log("user",user)

      await setDoc(doc(db,"users",user.uid),{
        name:fullName,
        email:user.email,
        uid:user.uid,
        // profilePic:fileURL,
      });

      dispatch(setUser({
        name:fullName,
        email:user.email,
        uid:user.uid,
        // profilePic:fileURL,
      }))

      toast.success("User has been created !");
      setLoading(false);


    
    }
    catch(e){

      console.log("error" , e);
      toast.error(e.message)
    }
      }
      else{

        if(password !== confirmPassword){
          toast.error('Password and Confirm Password Not Matched');
        }
        else if(password.length <6){
          toast.error("Password must be greater than 6 character")
        }
      }
      setLoading(false);
       
      
    }
    return (
    <div classname="signedUp-page">
          <Input
          state={fullName}
          setState={setFullName}
          placeholder="Full Name"
          type="text"
          required={true}
        />
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
        <Input
          state={confirmPassword}
          setState={setConfirmPassword}
          placeholder="confirm password"
          type="password"
          required={true}
        />
        <Button text={loading?"Loading":"Signup Now"} disabled={loading} onClick={handleSignOut}/>
   
    </div>
  )
}

export default SignedUp