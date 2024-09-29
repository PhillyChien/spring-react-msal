import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import LoginButton from "../LoginButton";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import { useState } from "react";
import UserDrawer from "../UserDrawer";

export default function Navbar() {
  const { accounts } = useMsal();
  const account = accounts[0];
  const isAuthenticated = useIsAuthenticated();
  const [open, setOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setOpen(open);
  };

  return (
    <div className="flex w-full items-center justify-end h-14 py-3 px-4">
      {isAuthenticated ? (
        <>
          <h1 className="mr-5 text-xl">
            Hi, {account.name ? account.name : "Anonymous User"}
          </h1>
          <IconButton onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <UserDrawer open={open} toggleDrawer={toggleDrawer} />
        </>
      ) : (
        <>
          <LoginButton />
        </>
      )}
    </div>
  );
}
