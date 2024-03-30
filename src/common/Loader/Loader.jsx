import React from "react";
import "./Loader.css";
function Loader() {
  return (
    <div className="container">
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Loader;
