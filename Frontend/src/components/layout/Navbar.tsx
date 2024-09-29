import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import LoginButton from "../LoginButton";
import LogoutButton from "../LogoutButton";

export default function Navbar() {
  const { accounts } = useMsal();
  const account = accounts[0];
  const isAuthenticated = useIsAuthenticated();
  console.log(account);
  return (
    <div className="flex w-full items-center justify-end h-14 py-3 px-4">
      {isAuthenticated ? (
        <>
          <h1 className="mr-5 text-xl">
            Hi, {account.name ? account.name : "Anonymous User"}
          </h1>
          <LogoutButton />
        </>
      ) : (
        <>
          <LoginButton />
        </>
      )}
    </div>
  );
}
