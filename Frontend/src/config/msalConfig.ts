import {
  AccountInfo,
  Configuration,
  LogLevel,
  PopupRequest,
} from "@azure/msal-browser";

/**
 * Configuration object to be passed to MSAL instance on creation.
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md
 */

export const msalConfig: Configuration = {
  auth: {
    clientId: "52fa7731-c3b5-4428-97e3-a67fccdc5567", // This is the ONLY mandatory field that you need to supply.
    authority:
      "https://aifpocmsal.b2clogin.com/aifpocmsal.onmicrosoft.com/B2C_1_login3", // Replace the placeholder with your tenant subdomain
    knownAuthorities: ["aifpocmsal.b2clogin.com"], // Mark your B2C tenant's domain as trusted.
    redirectUri: "http://localhost:3000", // Points to window.location.origin. You must register this URI on Microsoft Entra admin center/App Registration.
    postLogoutRedirectUri: "/", // Indicates the page to navigate after logout.
    navigateToLoginRequestUrl: false, // If "true", will navigate back to the original request location before processing the auth code response.
  },
  cache: {
    cacheLocation: "localStorage", // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
          default:
            return;
        }
      },
    },
  },
};

/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit:
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
const tokenRequest: PopupRequest = {
  prompt: "login",
  scopes: [],
};

const generateTokenRequest = (account: AccountInfo) => ({
  ...tokenRequest,
  account,
});

const loginRequest = {
  ...tokenRequest,
  authority:
    "https://aifpocmsal.b2clogin.com/aifpocmsal.onmicrosoft.com/B2C_1_login3",
};

const signupRequest = {
  ...tokenRequest,
  authority:
    "https://aifpocmsal.b2clogin.com/aifpocmsal.onmicrosoft.com/B2C_1_signup3",
};

export { loginRequest, signupRequest, generateTokenRequest };
