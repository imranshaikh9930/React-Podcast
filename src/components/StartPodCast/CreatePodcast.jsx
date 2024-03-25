import React, { useState } from "react";
import Input from "../../common/Input/Input";
import Button from "../../common/Button/Button";
import FileInput from "../../common/Input/FileInput";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage, auth,db } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";
const CreatePodcast = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [displayImage, setDisplayImage] = useState();
  const [bannerImage, setBannerImage] = useState();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    toast.success("Handling Form");
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
          title:title,
          description:desc,
          bannerImage:bannerImageUrl,
          displayImage:displayImageUrl,
          createdBy:auth.currentUser.uid
        }

        const docRef = await addDoc(collection(db, "podcasts"), podcastData);

        
       
        setLoading(false);
        setTitle("");
        setDesc("");
        setBannerImage(null);
        setDisplayImage(null);
        toast.success("Podcast Added  Successfully")
      } catch (e) {
        toast.error(e.message);
        console.log(e.message);
        setLoading(false)
      }
    } else {
      toast.error("Please Enter All Values");
      setLoading(false)
    }
  };

  const displayImageHandle = (file) => {
    setDisplayImage(file);
  };

  const displayBannerImageHandle = (file) => {
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
          text={"Display Image upload"}
          accept={"image/*"}
          id="display-image-input"
          fileHandleFunc={displayImageHandle}
        />
        <FileInput
          text={"Banner Image upload"}
          accept={"image/*"}
          id="banner-image-input"
          fileHandleFunc={displayBannerImageHandle}
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
