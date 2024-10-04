import { AccountInfo, IPublicClientApplication } from "@azure/msal-browser";
import axios from "axios";
import { generateTokenRequest } from "./msalConfig";

const axiosInstance = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const setupAcquireTokenInterceptor = (
  msalInstance: IPublicClientApplication,
  accounts: AccountInfo[]
) => {
  const interceptorId = axiosInstance.interceptors.request.use(
    async (config) => {
      try {
        console.log("Acquiring token silently");
        const response = await msalInstance.acquireTokenSilent(
          generateTokenRequest(accounts[0])
        );

        const token = response.accessToken;

        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        console.error("Failed to acquire token: ", error);
        throw error;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return interceptorId;
};

const removeAcquireTokenInterceptor = (interceptorId: number) => {
  axiosInstance.interceptors.request.eject(interceptorId);
};

export {
  axiosInstance,
  setupAcquireTokenInterceptor,
  removeAcquireTokenInterceptor,
};
