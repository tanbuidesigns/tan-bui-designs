export type DataSourceLabel =
  | "repository-review"
  | "derived-from-baseline"
  | "manual-hypothesis"
  | "prototype-only"
  | "planned-integration";

export type VerificationStatus =
  | "confirmed"
  | "inferred"
  | "requires-verification";

export type ReviewPriority = "critical" | "high" | "medium" | "low";

export type PageCategory =
  | "core"
  | "case-study"
  | "blog"
  | "design-handbook"
  | "experimental"
  | "legal";

export type MetadataStatus =
  | "dedicated"
  | "inherited"
  | "missing"
  | "requires-verification";

export type CoverageStatus =
  | "present"
  | "partial"
  | "absent"
  | "not-applicable"
  | "requires-verification";

export type ContentStatus =
  | "complete"
  | "review"
  | "placeholder"
  | "unavailable"
  | "requires-verification";

export type PageAvailability = "available" | "development-only" | "unavailable";
export type IndexabilityIntent = "index" | "noindex" | "decision-required";
export type InternalLinkStatus = "linked" | "limited" | "unlinked" | "requires-verification";
export type ProductionVisibility = "public" | "conditionally-hidden" | "not-public";

export type PageBaselineRecord = {
  id: string;
  name: string;
  route: string;
  category: PageCategory;
  intendedIndexability: IndexabilityIntent;
  availability: PageAvailability;
  metadataTitle: MetadataStatus;
  metadataDescription: MetadataStatus;
  canonical: CoverageStatus;
  openGraph: CoverageStatus;
  twitter: CoverageStatus;
  structuredData: CoverageStatus;
  h1: CoverageStatus;
  content: ContentStatus;
  internalLinks: InternalLinkStatus;
  productionVisibility: ProductionVisibility;
  reviewPriority: ReviewPriority;
  verificationStatus: VerificationStatus;
  source: DataSourceLabel;
  evidencePaths: readonly string[];
  baselineReviewDate: string;
  notes: string;
};

export type ActionCategory =
  | "SEO"
  | "Content"
  | "Performance"
  | "Security"
  | "Analytics"
  | "Infrastructure"
  | "Accessibility"
  | "Privacy"
  | "Conversion";

export type EffortLevel = "small" | "medium" | "large" | "requires-discovery";
export type WorkflowStatus = "backlog" | "ready" | "in-progress" | "blocked" | "review" | "done";

export type ActionRecord = {
  id: string;
  title: string;
  category: ActionCategory;
  affectedArea: string;
  problemOrOpportunity: string;
  reason: string;
  businessImpact: string;
  userImpact: string;
  technicalRelevance: string;
  priority: ReviewPriority;
  effort: EffortLevel;
  dependency: string;
  suggestedOwner: string;
  approvalRequired: boolean;
  externalAccessRequired: boolean;
  status: WorkflowStatus;
  successMeasure: string;
  verificationStatus: VerificationStatus;
  source: DataSourceLabel;
  evidencePaths: readonly string[];
  notes: string;
};

export type ContentHypothesisStatus = "hypothesis" | "needs-validation" | "approved-for-research";

export type ContentHypothesis = {
  id: string;
  targetTopic: string;
  targetAudience: string;
  userIntent: string;
  relatedWork: string;
  proposal: string;
  fitReason: string;
  businessPurpose: string;
  evidenceSource: string;
  confidence: VerificationStatus;
  priority: ReviewPriority;
  validationMethod: string;
  nextAction: string;
  status: ContentHypothesisStatus;
  source: DataSourceLabel;
};

export type IntegrationId =
  | "local-baseline"
  | "repository-review"
  | "pagespeed-lab"
  | "crux-field"
  | "search-console"
  | "cloudflare-analytics"
  | "lead-store"
  | "github-change-history";

export type IntegrationLifecycleState =
  | "local"
  | "planned"
  | "awaiting-configuration"
  | "ready"
  | "connected"
  | "healthy"
  | "stale"
  | "degraded"
  | "unavailable"
  | "error";

export type DataFreshnessState = "current" | "ageing" | "stale" | "unknown" | "not-applicable";

export type IntegrationErrorKind =
  | "configuration"
  | "authentication"
  | "authorization"
  | "quota"
  | "timeout"
  | "network"
  | "upstream"
  | "parsing"
  | "validation"
  | "unavailable"
  | "unknown";

export type IntegrationSourceType =
  | "local-repository"
  | "external-public-api"
  | "external-authorised-api"
  | "cloudflare-binding"
  | "private-database"
  | "manual-entry";

export type SecurityClassification = "public" | "internal" | "confidential" | "personal-data";
export type IntegrationDataMode = "local-snapshot" | "disconnected" | "manual" | "live";
export type ConfigurationState = "not-required" | "missing" | "requires-authorization" | "not-enabled" | "ready";

export type FreshnessMetadata = {
  state: DataFreshnessState;
  generatedAt: string | null;
  lastSuccessfulUpdate: string | null;
  threshold: string;
  explanation: string;
};

export type IntegrationDescriptor = {
  id: IntegrationId;
  displayName: string;
  description: string;
  sourceType: IntegrationSourceType;
  lifecycleState: IntegrationLifecycleState;
  dataMode: IntegrationDataMode;
  freshness: FreshnessMetadata;
  plannedCadence: string;
  currentRefreshMode: string;
  configurationState: ConfigurationState;
  configurationRequirements: readonly string[];
  accessRequirements: string;
  persistenceRequired: boolean;
  schedulingRequired: boolean;
  securityClassification: SecurityClassification;
  limitation: string;
  nextTask: string;
  verificationStatus: VerificationStatus;
  source: DataSourceLabel;
};

export type ProviderSourceMetadata = {
  integrationId: IntegrationId;
  displayName: string;
  dataMode: IntegrationDataMode;
  freshness: FreshnessMetadata;
};

export type ProviderResult<T> =
  | {
      status: "success";
      data: T;
      source: ProviderSourceMetadata;
      warnings: readonly string[];
    }
  | {
      status: "unavailable";
      reason: string;
      nextRequirement: string;
      source: ProviderSourceMetadata;
    }
  | {
      status: "error";
      error: { kind: IntegrationErrorKind; message: string };
      retryable: boolean;
      source: ProviderSourceMetadata;
    };

export type PerformanceStrategy = "mobile" | "desktop";
export type LighthouseCategory = "performance" | "accessibility" | "best-practices" | "seo";

export type PerformanceTarget = {
  id: string;
  displayLabel: string;
  pageId: string;
  canonicalUrl: string;
  route: string;
  pageCategory: PageCategory;
  allowedStrategies: readonly PerformanceStrategy[];
  defaultStrategy: PerformanceStrategy;
  enabled: boolean;
  reviewPriority: ReviewPriority;
};

export type PerformanceRequest = {
  targetId: PerformanceTarget["id"];
  strategy: PerformanceStrategy;
  requestedCategories: readonly LighthouseCategory[];
};

export type LabMetric = { value: number | null; displayValue: string | null };
export type LabPerformanceResult = {
  targetId: string;
  requestedUrl: string;
  finalUrl: string | null;
  strategy: PerformanceStrategy;
  analysisTimestamp: string | null;
  lighthouseVersion: string | null;
  categoryScores: Record<LighthouseCategory, number | null>;
  metrics: {
    firstContentfulPaint: LabMetric;
    largestContentfulPaint: LabMetric;
    cumulativeLayoutShift: LabMetric;
    totalBlockingTime: LabMetric;
    speedIndex: LabMetric;
  };
  opportunities: readonly string[];
  diagnostics: readonly string[];
  warnings: readonly string[];
};

export type FieldPerformanceResult = {
  targetId: string;
  coverage: "page" | "origin" | "unavailable";
  collectionPeriod: { start: string | null; end: string | null };
  trafficEligibility: "eligible" | "ineligible" | "unknown";
  coreWebVitalsAssessment: "pass" | "fail" | "unknown";
  lcpDistribution: readonly number[] | null;
  inpDistribution: readonly number[] | null;
  clsDistribution: readonly number[] | null;
};

export type IntegrationSummary = {
  total: number;
  activeLocal: number;
  plannedExternal: number;
  requiringConfiguration: number;
  personalData: number;
  stale: number;
  errors: number;
};

export type FutureConfigurationItem = {
  name: string;
  purpose: string;
  secret: boolean;
  serverOnly: true;
  futureTask: string;
  required: boolean;
  status: "not-created";
};

export type ReadinessChecklistItem = {
  id: string;
  label: string;
  complete: boolean;
  explanation: string;
};

export type OperationalReadinessItem = {
  id: string;
  label: string;
  state: "active" | "not-configured" | "not-enabled" | "decision-required" | "planned";
  explanation: string;
};

export type ChangeLogEntry = {
  id: string;
  date: string;
  changeType: "prototype" | "baseline" | "inventory" | "planning-system" | "integration-foundation";
  summary: string;
  reason: string;
  affectedArea: string;
  expectedOutcome: string;
  verificationStatus: VerificationStatus;
  source: DataSourceLabel;
  reviewDate: string;
  notes: string;
};

export type DecisionRecord = {
  id: string;
  question: string;
  context: string;
  priority: ReviewPriority;
  verificationStatus: VerificationStatus;
  source: DataSourceLabel;
};

export type LeadPrerequisite = {
  id: string;
  label: string;
  status: "not-enabled" | "decision-required" | "technical-work-required";
  reason: string;
};

export type SummaryMetric = {
  id: string;
  label: string;
  value: number;
  description: string;
};

export type PageSummary = {
  total: number;
  dedicatedMetadata: number;
  inheritedMetadata: number;
  requiringReview: number;
  unavailableOrNoindex: number;
  requiringVerification: number;
};

export type ActionSummary = {
  openCriticalHigh: number;
  ready: number;
  blocked: number;
  externalAccess: number;
  approvalRequired: number;
  byPriority: Record<ReviewPriority, number>;
};

export type ControlRoomSnapshot = {
  baselineReviewDate: string;
  lastUpdatedDate: string;
  pages: readonly PageBaselineRecord[];
  actions: readonly ActionRecord[];
  contentHypotheses: readonly ContentHypothesis[];
  integrations: readonly IntegrationDescriptor[];
  changes: readonly ChangeLogEntry[];
  decisions: readonly DecisionRecord[];
  leadPrerequisites: readonly LeadPrerequisite[];
  pageSummary: PageSummary;
  actionSummary: ActionSummary;
  integrationSummary: IntegrationSummary;
};
