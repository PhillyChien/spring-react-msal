import { InteractionStatus } from "@azure/msal-browser";
import { useMsal } from "@azure/msal-react";
import { useState } from "react";
import { loginRequest } from "../config/msalConfig";

export default function useLogin() {
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
      console.error(error);
    }
    setLoading(false);
  };

  return { loading, loginHandle };
}
