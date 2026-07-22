import type { WebmasterAnalysisBriefV1 } from "./domain.ts";
import { formatChatGPTCopy } from "./chatgpt-prompt.ts";
import { formatBriefJson } from "./format-json.ts";
import { formatBriefMarkdown } from "./format-markdown.ts";

export type AnalysisBriefCopyPayloads = { chatgpt: string; markdown: string; json: string };

export function createAnalysisBriefCopyPayloads(brief: WebmasterAnalysisBriefV1): AnalysisBriefCopyPayloads {
  const markdown = formatBriefMarkdown(brief);
  return { markdown, json: formatBriefJson(brief), chatgpt: formatChatGPTCopy(markdown) };
}
