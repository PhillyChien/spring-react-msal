import { useMsal } from "@azure/msal-react";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import {
  removeAcquireToken,
  setInterceptorId,
} from "../redux/slices/config-slice";
import { setupAcquireTokenInterceptor } from "../config/axiosConfig";

const useAcquireToken = () => {
  const dispatch = useAppDispatch();
  const interceptorId = useAppSelector((state) => state.config.interceptorId);
  const { accounts, instance } = useMsal();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (instance === null || accounts.length === 0) {
      if (interceptorId) {
        dispatch(removeAcquireToken());
      }
      setInitialized(false);
      return;
    }

    if (!interceptorId && !initialized) {
      const interceptorId = setupAcquireTokenInterceptor(instance, accounts);
      dispatch(setInterceptorId(interceptorId));
      setInitialized(true);
      return;
    }
  }, [dispatch, accounts, instance, initialized, interceptorId]);
};

export default useAcquireToken;
