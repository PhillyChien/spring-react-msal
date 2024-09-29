import { useMsal } from "@azure/msal-react";

export default function useLogout() {
  const { instance } = useMsal();

  const handleLogout = async () => {
    instance.logoutPopup();
  };

  return { handleLogout };
}
