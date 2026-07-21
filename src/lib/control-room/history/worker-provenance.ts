export type WorkerProvenance = {
  workerVersionId: string | null;
  workerVersionTag: string | null;
  workerVersionCreatedAt: string | null;
};

const unavailableWorkerProvenance: WorkerProvenance = {
  workerVersionId: null,
  workerVersionTag: null,
  workerVersionCreatedAt: null,
};

function nonEmptyString(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value : null;
}

export function normalizeWorkerVersionMetadata(value: unknown): WorkerProvenance {
  if (!value || typeof value !== "object") return unavailableWorkerProvenance;

  const metadata = value as Record<string, unknown>;
  const workerVersionId = nonEmptyString(metadata.id);
  if (!workerVersionId) return unavailableWorkerProvenance;

  return {
    workerVersionId,
    workerVersionTag: nonEmptyString(metadata.tag),
    workerVersionCreatedAt: nonEmptyString(metadata.timestamp),
  };
}
