import { useMsal } from "@azure/msal-react";
import Button from "@mui/material/Button";

export default function LogoutButton() {
  const { instance } = useMsal();
  const handleLogout = async () => {
    try {
      await instance.logoutPopup();
    } catch (error) {
      console.error(error);
    }
  };

  return <Button onClick={handleLogout}>Logout</Button>;
}
