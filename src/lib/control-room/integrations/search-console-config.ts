import "server-only";

import { getEnabledSearchConsolePropertyById } from "@/data/control-room/search-console-properties";
import type { SearchConsoleProperty } from "@/types/control-room-search";

const requiredNames = [
  "GSC_SERVICE_ACCOUNT_EMAIL",
  "GSC_SERVICE_ACCOUNT_PRIVATE_KEY",
  "GSC_PROPERTY_ID",
] as const;

export type ReadySearchConsoleConfiguration = {
  status: "ready";
  serviceAccountEmail: string;
  privateKey: string;
  privateKeyId: string | null;
  property: SearchConsoleProperty;
};

export type SearchConsoleConfiguration =
  | ReadySearchConsoleConfiguration
  | { status: "missing"; missingNames: readonly string[] }
  | { status: "invalid"; reason: string };

export function getSearchConsoleConfiguration(): SearchConsoleConfiguration {
  const values = {
    GSC_SERVICE_ACCOUNT_EMAIL: process.env.GSC_SERVICE_ACCOUNT_EMAIL?.trim(),
    GSC_SERVICE_ACCOUNT_PRIVATE_KEY: process.env.GSC_SERVICE_ACCOUNT_PRIVATE_KEY?.trim(),
    GSC_PROPERTY_ID: process.env.GSC_PROPERTY_ID?.trim(),
  };
  const missingNames = requiredNames.filter((name) => !values[name]);
  if (missingNames.length) return { status: "missing", missingNames };

  const serviceAccountEmail = values.GSC_SERVICE_ACCOUNT_EMAIL;
  const rawPrivateKey = values.GSC_SERVICE_ACCOUNT_PRIVATE_KEY;
  const propertyId = values.GSC_PROPERTY_ID;
  if (!serviceAccountEmail || !rawPrivateKey || !propertyId) return { status: "missing", missingNames: requiredNames };
  if (!/^[^\s@]+@[^\s@]+\.iam\.gserviceaccount\.com$/i.test(serviceAccountEmail)) {
    return { status: "invalid", reason: "GSC_SERVICE_ACCOUNT_EMAIL is not a valid service-account email." };
  }

  const privateKey = rawPrivateKey.replace(/\\n/g, "\n");
  if (!privateKey.includes("-----BEGIN PRIVATE KEY-----") || !privateKey.includes("-----END PRIVATE KEY-----")) {
    return { status: "invalid", reason: "GSC_SERVICE_ACCOUNT_PRIVATE_KEY must be a PKCS#8 PEM private key." };
  }

  const property = getEnabledSearchConsolePropertyById(propertyId);
  if (!property) return { status: "invalid", reason: "GSC_PROPERTY_ID does not match an enabled registered property." };

  return {
    status: "ready",
    serviceAccountEmail,
    privateKey,
    privateKeyId: process.env.GSC_SERVICE_ACCOUNT_PRIVATE_KEY_ID?.trim() || null,
    property,
  };
}
