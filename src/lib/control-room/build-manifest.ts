import manifest from "@/data/generated/control-room-build-manifest.json";

export type BuildRouteRecord = (typeof manifest.routes)[number];
export type BuildCommitCandidate = (typeof manifest.commits)[number];

export const controlRoomBuildManifest = manifest;
