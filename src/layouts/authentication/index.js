import React, { useEffect } from "react";
import { setLayout } from "context";
import SignIn from "./sign-in";
import Verification from "./Verification";
import { useSoftUIController } from "context";

const Authentication = () => {
  const [controller, dispatch] = useSoftUIController();
  const { succesLogin } = controller;
  
  useEffect(() => {
    setLayout(dispatch, "auth");
  }, []);

  return <div>{succesLogin === "signin" ? <SignIn /> : <Verification />}</div>;
};

export default Authentication;
