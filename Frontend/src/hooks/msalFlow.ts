import { BrowserAuthError, InteractionStatus } from "@azure/msal-browser";
import { useMsal } from "@azure/msal-react";
import { useState } from "react";
import { loginRequest, signupRequest } from "../config/msalConfig";

function errorHandle(error: any) {
  if (
    error instanceof BrowserAuthError &&
    error.errorCode === "user_cancelled"
  ) {
    console.log("User cancelled the login flow.");
  } else {
    console.error("Login failed: ", error);
  }
}

export function useLogin() {
  const { instance, inProgress } = useMsal();
  const [loading, setLoading] = useState(false);

  const loginHandle = async () => {
    try {
      if (inProgress === InteractionStatus.None) {
        setLoading(true);
        await instance.loginPopup(loginRequest);
      } else {
        console.warn("Interaction already in progress.");
      }
    } catch (error) {
      errorHandle(error);
    }
    setLoading(false);
  };

  return { loading, loginHandle };
}

export function useSignup() {
  const { instance, inProgress } = useMsal();
  const [loading, setLoading] = useState(false);

  const signupHandle = async () => {
    try {
      if (inProgress === InteractionStatus.None) {
        setLoading(true);
        await instance.loginPopup(signupRequest);
      } else {
        console.warn("Interaction already in progress.");
      }
    } catch (error) {
      errorHandle(error);
    }
    setLoading(false);
  };

  return { loading, signupHandle };
}

export function useLogout() {
  const { instance } = useMsal();

  const handleLogout = async () => {
    instance.logoutPopup();
  };

  return { handleLogout };
}
