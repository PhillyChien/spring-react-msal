import { useMsal } from "@azure/msal-react";

import { loginRequest } from "../config/msalConfig";
import { InteractionStatus } from "@azure/msal-browser";

const LoginButton = () => {
  const { instance, inProgress } = useMsal();

  const handleLogin = () => {
    if (inProgress === InteractionStatus.None) {
      instance.loginRedirect(loginRequest).catch((e) => {
        console.error("Login failed with error:", e);
      });
    } else {
      console.warn("Interaction already in progress.");
    }
  };

  return <button onClick={handleLogin}>Login</button>;
};

export default LoginButton;
