import "server-only";

export type PageSpeedConfiguration =
  | { configured: false }
  | { configured: true; apiKey: string };

export function getPageSpeedConfiguration(): PageSpeedConfiguration {
  const apiKey = process.env.PAGESPEED_API_KEY?.trim();
  return apiKey ? { configured: true, apiKey } : { configured: false };
}
