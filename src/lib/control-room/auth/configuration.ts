import "server-only";

const REQUIRED_AUTH_CONFIGURATION_NAMES = [
  "GOOGLE_CLIENT_ID",
  "GOOGLE_CLIENT_SECRET",
  "BETTER_AUTH_SECRET",
  "CONTROL_ROOM_ALLOWED_EMAIL",
] as const;

type AuthConfigurationName =
  (typeof REQUIRED_AUTH_CONFIGURATION_NAMES)[number];
type AuthConfigurationValues = Partial<
  Record<AuthConfigurationName, string | undefined>
>;

export type ReadyControlRoomAuthConfiguration = {
  status: "ready";
  googleClientId: string;
  googleClientSecret: string;
  betterAuthSecret: string;
  allowedEmail: string;
};

export type ControlRoomAuthConfiguration =
  | ReadyControlRoomAuthConfiguration
  | { status: "missing"; missingNames: readonly AuthConfigurationName[] }
  | { status: "invalid"; reason: string };

const CONTROL_CHARACTER_PATTERN = /[\u0000-\u001f\u007f]/;

function validBoundedValue(
  value: string,
  minimumLength: number,
  maximumLength: number,
) {
  return (
    value.length >= minimumLength &&
    value.length <= maximumLength &&
    !CONTROL_CHARACTER_PATTERN.test(value)
  );
}

function parseEmail(value: string): string | null {
  if (!validBoundedValue(value, 3, 254)) return null;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return null;
  return value.toLowerCase();
}

export function parseControlRoomAuthConfiguration(
  values: AuthConfigurationValues,
): ControlRoomAuthConfiguration {
  const missingNames = REQUIRED_AUTH_CONFIGURATION_NAMES.filter(
    (name) => !values[name],
  );
  if (missingNames.length) return { status: "missing", missingNames };

  const googleClientId = values.GOOGLE_CLIENT_ID;
  const googleClientSecret = values.GOOGLE_CLIENT_SECRET;
  const betterAuthSecret = values.BETTER_AUTH_SECRET;
  const rawAllowedEmail = values.CONTROL_ROOM_ALLOWED_EMAIL;
  if (
    !googleClientId ||
    !googleClientSecret ||
    !betterAuthSecret ||
    !rawAllowedEmail
  ) {
    return {
      status: "missing",
      missingNames: REQUIRED_AUTH_CONFIGURATION_NAMES,
    };
  }

  if (!validBoundedValue(googleClientId, 1, 512)) {
    return { status: "invalid", reason: "The Google client ID is invalid." };
  }
  if (!validBoundedValue(googleClientSecret, 1, 1_024)) {
    return {
      status: "invalid",
      reason: "The Google client secret is invalid.",
    };
  }
  if (!validBoundedValue(betterAuthSecret, 32, 512)) {
    return {
      status: "invalid",
      reason: "The Better Auth secret is invalid.",
    };
  }
  const allowedEmail = parseEmail(rawAllowedEmail);
  if (!allowedEmail) {
    return {
      status: "invalid",
      reason: "The authorised Control Room identity is invalid.",
    };
  }

  return {
    status: "ready",
    googleClientId,
    googleClientSecret,
    betterAuthSecret,
    allowedEmail,
  };
}

export function getControlRoomAuthConfiguration(): ControlRoomAuthConfiguration {
  return parseControlRoomAuthConfiguration({
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    CONTROL_ROOM_ALLOWED_EMAIL: process.env.CONTROL_ROOM_ALLOWED_EMAIL,
  });
}
