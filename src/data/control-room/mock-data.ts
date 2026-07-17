import type {
  ContentOpportunity,
  ControlRoomMetric,
  PageHealthRecord,
  PerformanceHistoryEntry,
  PlannedIntegration,
  RecommendedAction,
  ReportingPeriod,
} from "@/types/control-room";

export const reportingPeriod: ReportingPeriod = {
  label: "Last 28 days",
  startDate: "1 June 2026",
  endDate: "28 June 2026",
  lastRefreshed: "29 June 2026 at 09:30",
};

export const overviewMetrics: readonly ControlRoomMetric[] = [
  {
    id: "search-clicks",
    label: "Search clicks",
    value: "184",
    change: "+12%",
    trend: "up",
    description: "Mock visits from unpaid Google search results during the reporting period.",
  },
  {
    id: "search-impressions",
    label: "Search impressions",
    value: "8,420",
    change: "+8%",
    trend: "up",
    description: "Mock occasions when a Tan Bui Designs page appeared in search results.",
  },
  {
    id: "average-position",
    label: "Average search position",
    value: "18.6",
    change: "Improved by 1.4",
    trend: "up",
    description: "Mock average position across tracked search appearances. Lower is generally better.",
  },
  {
    id: "mobile-performance",
    label: "Average mobile performance",
    value: "79",
    change: "+3 points",
    trend: "up",
    description: "Mock average mobile performance result across the representative page inventory.",
  },
];

export const recommendedActions: readonly RecommendedAction[] = [
  {
    id: "page-metadata",
    title: "Add unique metadata to important pages",
    priority: "High",
    affectedArea: "Home, About, Work and Islamiyah Series",
    reason: "These pages currently rely on broad site-level metadata, making their purpose less specific in search results.",
    nextStep: "Write and review one accurate title and description for each priority page.",
  },
  {
    id: "crawl-policy",
    title: "Create a sitemap and robots policy",
    priority: "High",
    affectedArea: "Site-wide crawl management",
    reason: "The current application has no explicit sitemap or robots implementation.",
    nextStep: "Define which public routes should be indexed before adding either file.",
  },
  {
    id: "click-through",
    title: "Improve a visible page with weak click-through",
    priority: "Medium",
    affectedArea: "Packaging design service discovery",
    reason: "Mock data suggests useful visibility without a matching level of search visits.",
    nextStep: "Review the page title, description and search intent before changing page copy.",
  },
];

export const pageHealthRecords: readonly PageHealthRecord[] = [
  { path: "/", label: "Homepage", indexability: "Review", metadata: "Needs attention", openGraph: "Missing", mobilePerformance: 76, issues: "Generic metadata and no dedicated social image", status: "Needs attention" },
  { path: "/work", label: "Work", indexability: "Review", metadata: "Needs attention", openGraph: "Missing", mobilePerformance: 78, issues: "Relies on root metadata", status: "Needs attention" },
  { path: "/about", label: "About", indexability: "Review", metadata: "Needs attention", openGraph: "Missing", mobilePerformance: 74, issues: "No page metadata; remote background assets", status: "Needs attention" },
  { path: "/contact", label: "Contact", indexability: "Review", metadata: "Healthy", openGraph: "Review", mobilePerformance: 86, issues: "No dedicated social image", status: "Review" },
  { path: "/work/urban-eat", label: "Urban Eat", indexability: "Review", metadata: "Healthy", openGraph: "Review", mobilePerformance: 80, issues: "No project structured data", status: "Review" },
  { path: "/work/islamiyah-series", label: "Islamiyah Series", indexability: "Review", metadata: "Missing", openGraph: "Missing", mobilePerformance: 77, issues: "Missing case-study metadata", status: "Needs attention" },
  { path: "/blog", label: "Blog", indexability: "Review", metadata: "Healthy", openGraph: "Healthy", mobilePerformance: 84, issues: "No sitemap discovery", status: "Healthy" },
];

export const performanceHistory: readonly PerformanceHistoryEntry[] = [
  { period: "Week 1", value: 72 },
  { period: "Week 2", value: 75 },
  { period: "Week 3", value: 76 },
  { period: "Week 4", value: 79 },
  { period: "Week 5", value: 81 },
  { period: "Week 6", value: 79 },
];

export const contentOpportunities: readonly ContentOpportunity[] = [
  {
    id: "packaging-designer",
    query: "freelance packaging designer UK",
    matchingPage: "/work/urban-eat",
    currentPosition: 16,
    reason: "Strong portfolio relevance with mock visibility just outside the first page.",
    recommendedAction: "Clarify packaging expertise in metadata and supporting internal links.",
    priority: "High",
  },
  {
    id: "healthcare-exhibition",
    query: "healthcare exhibition designer",
    matchingPage: "/about",
    currentPosition: 28,
    reason: "Relevant experience is present, but there is no focused public project page.",
    recommendedAction: "Review what healthcare exhibition material can be published safely.",
    priority: "Medium",
  },
  {
    id: "islamic-publication",
    query: "Islamic publication designer",
    matchingPage: "/work/islamiyah-series",
    currentPosition: 12,
    reason: "The case study closely matches the topic but lacks dedicated metadata.",
    recommendedAction: "Add accurate case-study metadata before considering new content.",
    priority: "High",
  },
  {
    id: "multidisciplinary-consultant",
    query: "multidisciplinary design consultant",
    matchingPage: "/about",
    currentPosition: "Not ranked",
    reason: "The positioning matches existing visible copy but has no mock search presence.",
    recommendedAction: "Strengthen the connection between About, Work and Contact pages.",
    priority: "Low",
  },
];

export const plannedIntegrations: readonly PlannedIntegration[] = [
  { name: "Google Search Console", purpose: "Search visibility, clicks and query information" },
  { name: "PageSpeed Insights", purpose: "Measured mobile and desktop performance checks" },
  { name: "Page inventory checks", purpose: "Metadata, indexability and content completeness" },
  { name: "Enquiry attribution", purpose: "Consented source information for new enquiries" },
  { name: "Website change history", purpose: "A useful record of reviewed website improvements" },
];
