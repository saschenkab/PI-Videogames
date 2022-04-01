import React from "react";
import Yoshi from "../images/yoshi-loader.gif";
import "./loader.css";

const Loader = () => {
  return (
    <>
      <img className="loader" src={Yoshi} alt="background-gif" />
    </>
  );
};

export default Loader;
