import type { SearchConsoleProperty } from "@/types/control-room-search";

export const searchConsoleProperties: readonly SearchConsoleProperty[] = [
  {
    id: "tanbui-domain",
    siteUrl: "sc-domain:tanbuidesigns.com",
    displayLabel: "Tan Bui Designs domain",
    propertyType: "domain",
    expectedPublicHosts: ["tanbuidesigns.com", "www.tanbuidesigns.com"],
    enabled: true,
    securityClassification: "internal",
    accessRequirement: "The dedicated service account must be added as a Full user of this Search Console property.",
    notes: "The domain property is the only enabled Task 5 property. URL-prefix variants remain unsupported unless the owner confirms a different Search Console setup.",
  },
];

export function getEnabledSearchConsolePropertyById(propertyId: string): SearchConsoleProperty | null {
  return searchConsoleProperties.find((property) => property.enabled && property.id === propertyId) ?? null;
}
