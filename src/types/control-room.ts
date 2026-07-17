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

export type IntegrationStatus =
  | "not-connected"
  | "awaiting-access"
  | "awaiting-technical-work"
  | "not-approved";

export type IntegrationReadiness = {
  id: string;
  name: string;
  category: "performance" | "search" | "analytics" | "leads" | "change-management";
  status: IntegrationStatus;
  requirements: string;
  intendedMetrics: readonly string[];
  limitations: string;
  refreshCadence: string;
  persistenceNeeded: boolean;
  complexity: EffortLevel;
  verificationStatus: VerificationStatus;
  source: DataSourceLabel;
};

export type ChangeLogEntry = {
  id: string;
  date: string;
  changeType: "prototype" | "baseline" | "inventory" | "planning-system";
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
  integrations: readonly IntegrationReadiness[];
  changes: readonly ChangeLogEntry[];
  decisions: readonly DecisionRecord[];
  leadPrerequisites: readonly LeadPrerequisite[];
  pageSummary: PageSummary;
  actionSummary: ActionSummary;
};
