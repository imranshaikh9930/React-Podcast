import React, { useState } from "react";
import Input from "../../common/Input/Input";
import Button from "../../common/Button/Button";
import FileInput from "../../common/Input/FileInput";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage, auth, db } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";
import {useNavigate} from "react-router-dom";
const CreatePodcast = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [displayImage, setDisplayImage] = useState();
  const [bannerImage, setBannerImage] = useState();
  const [loading, setLoading] = useState(false);
 
  const navigate = useNavigate();
  const handleSubmit = async () => {

    setLoading(true);
    if (title && desc && displayImage && bannerImage) {
      // Upload files => send request to server
      // Create a new doc in new collection

      try {
        const bannerImageRef = ref(
          storage,
          `podcasts/${auth.currentUser.uid}/${Date.now()}`
        );

        await uploadBytes(bannerImageRef, bannerImage);

        const bannerImageUrl = await getDownloadURL(bannerImageRef);

        const displayImageRef = ref(
          storage,
          `podcasts/${auth.currentUser.uid}/${Date.now()}`
        );

        await uploadBytes(displayImageRef, displayImage);

        const displayImageUrl = await getDownloadURL(displayImageRef);

        const podcastData = {
          title: title,
          description: desc,
          bannerImage: bannerImageUrl,
          displayImage: displayImageUrl,
          createdBy: auth.currentUser.uid,
        };

        const docRef = await addDoc(collection(db, "podcasts"), podcastData);

        setLoading(false);
        setTitle("");
        setDesc("");
        setBannerImage("");
        setDisplayImage("");
        navigate("/podcast")
        toast.success("Podcast Added  Successfully");

      } catch (e) {
        toast.error(e.message);
        console.log(e.message);
        setLoading(false);
      }
    } else {
      toast.error("Please Enter All Values");
      setLoading(false);
    }
  };

  const displayImageHandle = (file) => {
    setDisplayImage(file);
  };

  const bannerImageHandle = (file) => {
    setBannerImage(file);
   
  };
  return (
    <div className="wrapper-container">
      <div className="wrapper">
        <Input
          state={title}
          setState={setTitle}
          placeholder="Title"
          type="text"
          required={true}
        />
        <Input
          state={desc}
          setState={setDesc}
          placeholder="Description"
          type="text"
          required={true}
        />
        <FileInput
          accept={"image/*"}
          id="display-image-input"
          fileHandleFnc={displayImageHandle}
          text={"Display Image Upload"}
        />
        
        <FileInput
          accept={"image/*"}
          id="banner-image-input"
          fileHandleFnc={bannerImageHandle}
          text={"Banner Image Upload"}
         
          />
     
    
     
        <Button
          text={loading ? "Loading..." : "Create Podcast"}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default CreatePodcast;
