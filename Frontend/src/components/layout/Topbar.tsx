import { useIsAuthenticated } from "@azure/msal-react";
import LoginAndSignupButton from "../LoginAndSignupButton";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import { useState } from "react";
import UserDrawer from "../UserDrawer";
import BreadCrumbs from "./BreadCrumbs";

export default function Topbar() {
  const isAuthenticated = useIsAuthenticated();
  const [open, setOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setOpen(open);
  };

  return (
    <header className="flex w-full items-center justify-between h-14 py-3 px-4">
      {isAuthenticated ? (
        <>
          <BreadCrumbs />
          <IconButton onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <UserDrawer open={open} toggleDrawer={toggleDrawer(false)} />
        </>
      ) : (
        <>
          <div></div>
          <LoginAndSignupButton />
        </>
      )}
    </header>
  );
}
