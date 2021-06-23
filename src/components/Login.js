import React from "react";
import { GoogleOutlined } from "@ant-design/icons";
import "firebase/app";
import { auth } from "../Firebase";
import firebase from "firebase/app";

const Login = () => {
  return (
    <div id="login-page">
      <div id="login-card">
        <h2>Welcome to UniChat!</h2>
        <div
          className="login-button google"
          onClick={() =>
            auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
          }
        >
          <GoogleOutlined /> Sign in with Google
        </div>
        {/* <br />
        <br />
        <div className="login-button facebook">
          <FacebookOutlined /> Sign in with Facebook
        </div> */}
      </div>
    </div>
  );
};

export default Login;