import type { ServiceAccount } from "firebase-admin/app";
import * as adminSDK from "firebase-admin/app";
import { singleton } from "../utils/singleton.server";

const serviceAccount = {
  type: process.env.CREDENTIALS_TYPE,
  projectId: process.env.CREDENTIALS_PROJECT_ID,
  privateKeyId: process.env.CREDENTIALS_PRIVATE_KEY_ID,
  privateKey: process.env.CREDENTIALS_PRIVATE_KEY,
  clientEmail: process.env.CREDENTIALS_CLIENT_EMAIL,
  clientId: process.env.CREDENTIALS_CLIENT_ID,
  authUri: process.env.CREDENTIALS_AUTH_URI,
  tokenUri: process.env.CREDENTIALS_TOKEN_URI,
  authProviderX509CertUrl: process.env.CREDENTIALS_AUTH_PROVIDER_X509_CERT_URL,
  clientX509CertUrl: process.env.CREDENTIALS_CLIENT_X509_CERT_URL,
  universeDomain: process.env.CREDENTIALS_UNIVERSE_DOMAIN,
};

export const adminApp = singleton("admin-app", () =>
  adminSDK.initializeApp({
    credential: adminSDK.cert(serviceAccount as ServiceAccount),
  })
);
