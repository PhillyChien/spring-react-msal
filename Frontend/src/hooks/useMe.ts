import { useMsal } from "@azure/msal-react";
import userService from "../service/backend/userService";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../redux/hook";
import { setUser } from "../redux/slices/user-slice";

const useMe = () => {
  const { accounts } = useMsal();
  const account = accounts.length > 0 ? accounts[0] : null;
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      if (account) {
        setLoading(true);
        try {
          const meData = await userService.getMe();
          dispatch(
            setUser({
              userId: meData.id,
              email: meData.email,
              roles: meData.roles,
            })
          );
        } catch (error) {
          console.error(error);
          setError("Failed to fetch getMe data");
        } finally {
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [account, dispatch]);
  return { loading, error };
};

export default useMe;
