import React from "react";
import { google_auth } from "./firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Button } from "@mui/material";

export default function Google() {
  const provider = new GoogleAuthProvider();

  const signwithgoole = () => {
    signInWithPopup(google_auth, provider)
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  };
  return (
    <div className="con container">
      <Button variant="contained" onClick={signwithgoole}>
        Log in With Google
      </Button>
    </div>
  );
}
