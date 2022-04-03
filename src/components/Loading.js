import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";

const Loading = () => {
  let navigate = useNavigate();
  let [authUser, setAuthUser] = useState(null);
  if (authUser) {
    navigate("/user");
  }
  useEffect(() => {
    let auth = JSON.parse(localStorage.getItem("isAuthenticated"));
    if (auth) {
      setAuthUser();
    }
  }, [authUser]);
  console.log("Got here");
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
