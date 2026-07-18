import "server-only";

import type {
  IntegrationErrorKind,
  LabDiagnostic,
  LabMetric,
  LighthouseCategory,
} from "@/types/control-room";

type JsonRecord = Record<string, unknown>;

export type NormalizedPageSpeedResponse = {
  finalUrl: string;
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
  diagnostics: readonly LabDiagnostic[];
  warnings: readonly string[];
};

export type PageSpeedParseResult =
  | { ok: true; data: NormalizedPageSpeedResponse }
  | { ok: false; kind: IntegrationErrorKind; message: string; retryable: boolean };

const categoryIds: readonly LighthouseCategory[] = ["performance", "accessibility", "best-practices", "seo"];
const coreAuditIds = new Set([
  "first-contentful-paint",
  "largest-contentful-paint",
  "cumulative-layout-shift",
  "total-blocking-time",
  "speed-index",
]);

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function finiteNumber(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function boundedString(value: unknown, maximum: number): string | null {
  if (typeof value !== "string") return null;
  const text = value.trim();
  return text ? text.slice(0, maximum) : null;
}

function safeText(value: unknown, maximum = 500): string | null {
  if (typeof value !== "string") return null;
  const text = value
    .replace(/\[([^\]]+)]\([^)]*\)/g, "$1")
    .replace(/<[^>]*>/g, "")
    .replace(/https?:\/\/\S+/gi, "[link omitted]")
    .replace(/\s+/g, " ")
    .trim();
  return text ? text.slice(0, maximum) : null;
}

function extractMetric(audits: JsonRecord, id: string): LabMetric {
  const audit = audits[id];
  if (!isRecord(audit)) return { value: null, displayValue: null };
  const mode = safeText(audit.scoreDisplayMode, 40);
  if (mode === "error" || mode === "notApplicable") return { value: null, displayValue: null };
  return {
    value: finiteNumber(audit.numericValue),
    displayValue: safeText(audit.displayValue, 120),
  };
}

function extractCategoryScores(categories: JsonRecord): Record<LighthouseCategory, number | null> {
  return Object.fromEntries(
    categoryIds.map((id) => {
      const category = categories[id];
      const score = isRecord(category) ? finiteNumber(category.score) : null;
      return [id, score !== null && score >= 0 && score <= 1 ? Math.round(score * 100) : null];
    }),
  ) as Record<LighthouseCategory, number | null>;
}

function extractDiagnostics(categories: JsonRecord, audits: JsonRecord, lighthouseVersion: string | null): readonly LabDiagnostic[] {
  const performance = categories.performance;
  const references = isRecord(performance) && Array.isArray(performance.auditRefs) ? performance.auditRefs : [];

  return references
    .flatMap((reference): LabDiagnostic[] => {
      if (!isRecord(reference)) return [];
      const auditId = safeText(reference.id, 100);
      if (!auditId || coreAuditIds.has(auditId)) return [];
      const audit = audits[auditId];
      if (!isRecord(audit)) return [];

      const title = safeText(audit.title, 180);
      if (!title) return [];
      const score = finiteNumber(audit.score);
      const displayValue = safeText(audit.displayValue, 180);
      const details = isRecord(audit.details) ? audit.details : {};
      const estimatedSavingsMs = finiteNumber(details.overallSavingsMs);
      const estimatedSavingsBytes = finiteNumber(details.overallSavingsBytes);
      const group = safeText(reference.group, 80) ?? safeText(audit.group, 80);
      const actionableGroup = group ? /(opportunit|diagnostic|insight)/i.test(group) : false;
      const actionable =
        (score !== null && score < 0.9) &&
        (estimatedSavingsMs !== null || estimatedSavingsBytes !== null || displayValue !== null || actionableGroup);
      if (!actionable) return [];

      return [{
        auditId,
        title,
        summary: safeText(audit.description),
        displayValue,
        score,
        scoreDisplayMode: safeText(audit.scoreDisplayMode, 50),
        estimatedSavingsMs,
        estimatedSavingsBytes,
        group,
        sourceVersion: lighthouseVersion,
      }];
    })
    .sort((a, b) =>
      (b.estimatedSavingsMs ?? -1) - (a.estimatedSavingsMs ?? -1) ||
      (b.estimatedSavingsBytes ?? -1) - (a.estimatedSavingsBytes ?? -1) ||
      (a.score ?? 1) - (b.score ?? 1),
    )
    .slice(0, 8);
}

function extractWarnings(lighthouse: JsonRecord): readonly string[] {
  if (!Array.isArray(lighthouse.runWarnings)) return [];
  return lighthouse.runWarnings
    .flatMap((warning): string[] => {
      const text = safeText(warning, 300) ?? (isRecord(warning) ? safeText(warning.message, 300) : null);
      return text ? [text] : [];
    })
    .slice(0, 10);
}

export function parsePageSpeedResponse(input: unknown): PageSpeedParseResult {
  if (!isRecord(input)) return { ok: false, kind: "parsing", message: "PageSpeed returned an unreadable response.", retryable: false };

  const captcha = safeText(input.captchaResult, 80);
  if (captcha && !/NOT_NEEDED|NONE|UNSPECIFIED/i.test(captcha)) {
    return { ok: false, kind: "upstream", message: "PageSpeed could not complete the analysis because a challenge was required.", retryable: true };
  }

  const lighthouse = input.lighthouseResult;
  if (!isRecord(lighthouse)) return { ok: false, kind: "validation", message: "PageSpeed returned no usable Lighthouse result.", retryable: true };

  const runtimeError = lighthouse.runtimeError;
  if (isRecord(runtimeError)) {
    const code = safeText(runtimeError.code, 100);
    if (code && !/NO_ERROR|NONE/i.test(code)) {
      const timeout = /TIMEOUT|TIMED_OUT/i.test(code);
      return {
        ok: false,
        kind: timeout ? "timeout" : "upstream",
        message: timeout ? "PageSpeed did not complete the laboratory test in time." : "PageSpeed could not complete a reliable laboratory test.",
        retryable: timeout,
      };
    }
  }

  const finalUrl = boundedString(lighthouse.finalUrl, 2_048);
  const categories = lighthouse.categories;
  const audits = lighthouse.audits;
  if (!finalUrl || !isRecord(categories) || !isRecord(categories.performance) || !isRecord(audits)) {
    return { ok: false, kind: "validation", message: "PageSpeed returned an incomplete Lighthouse result.", retryable: true };
  }

  const lighthouseVersion = safeText(lighthouse.lighthouseVersion, 80);
  return {
    ok: true,
    data: {
      finalUrl,
      analysisTimestamp: safeText(lighthouse.fetchTime, 80),
      lighthouseVersion,
      categoryScores: extractCategoryScores(categories),
      metrics: {
        firstContentfulPaint: extractMetric(audits, "first-contentful-paint"),
        largestContentfulPaint: extractMetric(audits, "largest-contentful-paint"),
        cumulativeLayoutShift: extractMetric(audits, "cumulative-layout-shift"),
        totalBlockingTime: extractMetric(audits, "total-blocking-time"),
        speedIndex: extractMetric(audits, "speed-index"),
      },
      diagnostics: extractDiagnostics(categories, audits, lighthouseVersion),
      warnings: extractWarnings(lighthouse),
    },
  };
}
