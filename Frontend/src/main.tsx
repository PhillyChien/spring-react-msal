import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.tsx";
import store from "./redux/store.ts";
import "./index.css";
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./config/msalConfig.ts";

const msalInstance = new PublicClientApplication(msalConfig);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MsalProvider instance={msalInstance}>
      <Provider store={store}>
        <App />
      </Provider>
    </MsalProvider>
  </StrictMode>
);
