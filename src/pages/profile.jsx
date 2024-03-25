import React from 'react'
import Header from '../components/Header/Header';
import {useSelector} from "react-redux";
import Button from '../common/Button/Button';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import {toast } from 'react-toastify';
const Profile = () => {
  const user = useSelector((state)=>state.user.user);


  const handleLogout = ()=>{

    signOut((auth)).then(()=>{
      toast.success("User Logged Out !");
    }).catch((err)=>{

      console.log(err)
    })
  }

  if(!user){
    return <p>Loading....</p>
  }

  return (
    <div>
      <Header/>

      <h1>{user.name}</h1>
      <h1>{user.email}</h1>
      <h1>{user.uid}</h1>
    <Button text="Logout" onClick={handleLogout}/>


    </div>
  )
}

export default Profile