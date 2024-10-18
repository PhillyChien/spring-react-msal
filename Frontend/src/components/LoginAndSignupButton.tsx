import Button from "@mui/material/Button";
import { useLogin, useSignup } from "../hooks/msalFlow";
import { Box } from "@mui/material";

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
    <Box>
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
    </Box>
  );
}
