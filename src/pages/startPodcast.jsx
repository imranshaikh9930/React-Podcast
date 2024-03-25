import React, { useState } from "react";
import Header from "../components/Header/Header";
import Input from "../common/Input/Input";
import CreatePodcast from "../components/StartPodCast/CreatePodcast";

const StartPodcast = () => {
 

  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  return (
    <>
      <Header />
      <CreatePodcast/>

     
    </>
  );
};

export default StartPodcast;
