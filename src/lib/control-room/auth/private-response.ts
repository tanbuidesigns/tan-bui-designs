const PRIVATE_RESPONSE_HEADERS = {
  "Cache-Control": "private, no-store, max-age=0, must-revalidate",
  "Cloudflare-CDN-Cache-Control": "no-store",
  "CDN-Cache-Control": "no-store",
  Pragma: "no-cache",
  Expires: "0",
  "X-Robots-Tag": "noindex, nofollow, noarchive, nosnippet",
  "Referrer-Policy": "no-referrer",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
} as const;

export function withPrivateResponseHeaders(response: Response): Response {
  const headers = new Headers(response.headers);
  for (const [name, value] of Object.entries(PRIVATE_RESPONSE_HEADERS)) {
    headers.set(name, value);
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
