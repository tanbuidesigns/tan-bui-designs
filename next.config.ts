import type { NextConfig } from "next";

const controlRoomHeaders = [
  { key: "Cache-Control", value: "private, no-store, max-age=0, must-revalidate" },
  { key: "Cloudflare-CDN-Cache-Control", value: "no-store" },
  { key: "CDN-Cache-Control", value: "no-store" },
  { key: "Pragma", value: "no-cache" },
  { key: "Expires", value: "0" },
  { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive, nosnippet" },
  { key: "Referrer-Policy", value: "no-referrer" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
] as const;

const nextConfig: NextConfig = {
  async headers() {
    return [
      { source: "/control-room", headers: [...controlRoomHeaders] },
      { source: "/control-room/:path*", headers: [...controlRoomHeaders] },
      { source: "/api/auth", headers: [...controlRoomHeaders] },
      { source: "/api/auth/:path*", headers: [...controlRoomHeaders] },
    ];
  },
};

export default nextConfig;

void import("@opennextjs/cloudflare").then((module) => {
  module.initOpenNextCloudflareForDev();
});
