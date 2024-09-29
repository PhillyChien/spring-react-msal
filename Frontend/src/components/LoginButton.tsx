import { useMsal } from "@azure/msal-react";

import { loginRequest } from "../config/msalConfig";
import { InteractionStatus } from "@azure/msal-browser";
import Button from "./Button";
import { useState } from "react";

export default function LoginButton() {
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

  return loading ? (
    <Button disabled={true} className="bg-black text-white mr-1.5">
      Logging in...
    </Button>
  ) : (
    <Button
      onClick={loginHandle}
      className="bg-black text-white mr-1.5 hover:bg-gray-700"
    >
      Login
    </Button>
  );
}
