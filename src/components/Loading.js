import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";

const Loading = () => {
  let navigate = useNavigate();
  let auth = JSON.parse(localStorage.getItem("isAuthenticated"));
  if (auth) {
    navigate("/user");
  }
  return (
    <ReactLoading
      type="spinningBubbles"
      color="#8956ff"
      height={667}
      width={375}
    />
  );
};

export default Loading;
