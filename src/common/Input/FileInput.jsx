import React, { useState } from "react";
import "./styles.css";

function FileInput({ accept, id, fileHandleFnc, text,imageSrc }) {
  const [fileSelected, setFileSelected] = useState("");

  const onChange = (e) => {
    console.log(e.target.files);
    setFileSelected(e.target.files[0].name);
    fileHandleFnc(e.target.files[0]);
    
  };

  return (
    <>
    {
      imageSrc ? (<>
      <label
        htmlFor={id}
        className={`custom-input ${!fileSelected ? "label-input" : "active"}`}
      >
        {fileSelected ? `The File ${fileSelected} was Selected` : text}
      </label>
      <div className="upload__container">
      <input
        type="file"
        accept={accept}
        id={id}
        style={{ display: "none" }}
        className="image_upload" 
        onChange={onChange}
      />
   

      <img src={imageSrc} alt="fileSelected" style={{ width: '80px' }} />
      <p>{fileSelected}</p>
      </div>
      </>):(<>
      
        <label
        htmlFor={id}
        className={`custom-input ${!fileSelected ? "label-input" : "active"}`}
      >
        {fileSelected ? `The File ${fileSelected} was Selected` : text}
      </label>
      <input
        type="file"
        accept={accept}
        id={id}
        style={{ display: "none"}}
        onChange={onChange}
        className="upload__container"

       
      />
    </>)
    }
      
    </>
  );
}

export default FileInput;
