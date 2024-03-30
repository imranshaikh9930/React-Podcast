import React, { useState } from 'react';
import Input from '../common/Input/Input';
import FileInput from '../common/Input/FileInput';
import Button from '../common/Button/Button';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { auth, db, storage } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc,getDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { setUser } from '../slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SignUp = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignUp = async () => {
    setLoading(true);

    try {
      if (password !== confirmPassword) {
        throw new Error('Password and Confirm Password do not match');
      }

      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
      }

      const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredentials.user;

      if (profilePic) {
        try {
          const profilePictureRef = ref(storage, `users/${user.uid}/${Date.now()}`);
          await uploadBytes(profilePictureRef, profilePic);
      
          const fileURL = await getDownloadURL(profilePictureRef);
      
          // Update user document with the profile picture URL
          await setDoc(doc(db, 'users', user.uid), {
            name: fullName,
            email: user.email,
            uid: user.uid,
            profilePic: fileURL,
          });
      
          // Fetch updated user document
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          const updatedUser = { ...userDoc.data(), uid: user.uid }; // Merging data with user ID
          
          console.log(updatedUser)
          // Update Redux store with the updated user data
          dispatch(setUser(updatedUser));
        } catch (error) {
          console.error('Error uploading profile picture:', error);
          // Handle error
        }
      } else {
        // If no profile picture is uploaded, update user document without profilePic field
        try {
          await setDoc(doc(db, 'users', user.uid), {
            name: fullName,
            email: user.email,
            uid: user.uid,
          });
      
          // Fetch updated user document
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          const updatedUser = { ...userDoc.data(), uid: user.uid }; // Merging data with user ID
      
          // Update Redux store with the updated user data
          dispatch(setUser(updatedUser));
        } catch (error) {
          console.error('Error updating user document:', error);
          // Handle error
        }
      }

      toast.success('User has been created!');
      navigate('/podcast');
    } catch (error) {
      console.error('Error signing up:', error.message);
      toast.error(error.message);
    }

    setLoading(false);
  };

  const handleDisplayImage = (file) => {
    setProfilePic(file);
    const reader = new FileReader(); 
    reader.onload = () => {
   const imageDataUrl = reader.result; 
   setImageSrc(imageDataUrl);
   
 };

 // Read the file as a data URL
 if (file) {
   reader.readAsDataURL(file);
 }
  };

  return (
    <div className="signedUp-page">
      <Input
        state={fullName}
        setState={setFullName}
        placeholder="Full Name"
        type="text"
        required
      />
      <Input
        state={email}
        setState={setEmail}
        placeholder="Email"
        type="email"
        required
      />
      <Input
        state={password}
        setState={setPassword}
        placeholder="Password"
        type="password"
        required
      />
      <Input
        state={confirmPassword}
        setState={setConfirmPassword}
        placeholder="Confirm Password"
        type="password"
        required
      />
    <div className={`${imageSrc ? "upload__container" : "no__upload"}`} >

       <FileInput
          accept={"image/*"}
          id="display-image-input"
          fileHandleFnc={handleDisplayImage}
          text={"Display Image Upload"}
          imageSrc = {imageSrc}
        />
       </div>
      <Button text={loading ? 'Loading...' : 'Sign Up Now'} disabled={loading} onClick={handleSignUp} />
    </div>
  );
};

export default SignUp;
