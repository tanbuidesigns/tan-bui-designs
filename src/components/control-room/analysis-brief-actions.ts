export type CopyTarget = "chatgpt" | "markdown" | "json";
export type CopyPayloads = Record<CopyTarget, string>;
export type CopyResult = { status: string; fallback: string | null };

const successStatus: Record<CopyTarget, string> = {
  chatgpt: "Copied for ChatGPT.",
  markdown: "Markdown copied.",
  json: "JSON copied.",
};

export async function copyAnalysisBriefPayload(writeText: ((value: string) => Promise<void>) | undefined, payloads: CopyPayloads, target: CopyTarget): Promise<CopyResult> {
  const value = payloads[target];
  try {
    if (!writeText) throw new Error("clipboard_unavailable");
    await writeText(value);
    return { status: successStatus[target], fallback: null };
  } catch {
    return { status: "Clipboard access is unavailable. Copy the selected text manually.", fallback: value };
  }
}

export function printAnalysisBrief(print: () => void): void {
  print();
}
