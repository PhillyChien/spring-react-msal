import Button from "@mui/material/Button";
import useLogin from "../hooks/useLogin";

export default function LoginButton() {
  const { loading, loginHandle } = useLogin();

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
