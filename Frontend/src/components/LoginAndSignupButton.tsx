import Button from "@mui/material/Button";
import { useLogin, useSignup } from "../hooks/msalFlow";

export default function LoginAndSignupButton() {
  const { loading: loginLoading, loginHandle } = useLogin();
  const { loading: signupLoading, signupHandle } = useSignup();

  if (loginLoading) {
    return (
      <Button className="bg-black text-white mr-1.5" disabled>
        Logging in...
      </Button>
    );
  }

  if (signupLoading) {
    return (
      <Button className="bg-black text-white mr-1.5" disabled>
        Signing up...
      </Button>
    );
  }

  return (
    <>
      <Button
        onClick={loginHandle}
        className="bg-black text-white mr-1.5 hover:bg-gray-700"
      >
        Login
      </Button>
      <Button
        onClick={signupHandle}
        className="bg-black text-white mr-1.5 hover:bg-gray-700"
      >
        Signup
      </Button>
    </>
  );
}
