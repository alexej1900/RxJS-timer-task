import React from "react";
import "./index.css";

export const Button = ({type, onClick}) => {
  return(
    <button className={type} id={type} onClick={onClick}>
      {type}
    </button>
  );
};
