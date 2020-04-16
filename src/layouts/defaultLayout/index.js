import React from "react";
import Header from "./header";
import "./style.css";

const DefaultLayout = props => {
  return (
    <>
      <Header title={props.title} btn={props.private} />
        <div className="user-container">{props.children}</div>
    </>
  );
};

export default DefaultLayout;
