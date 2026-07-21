export const MAX_CONTROL_ROOM_FORM_BYTES = 8_192;

export type FormHeaderValidation =
  | { ok: true }
  | { ok: false; status: 400 | 413 | 415 };

export type BoundedFormRead =
  | { ok: true; form: URLSearchParams }
  | { ok: false; status: 400 | 413 };

export function validateUrlEncodedFormHeaders(
  headers: Headers,
): FormHeaderValidation {
  const contentType = headers.get("content-type")?.toLowerCase() ?? "";
  if (!contentType.startsWith("application/x-www-form-urlencoded")) {
    return { ok: false, status: 415 };
  }

  const declaredLength = headers.get("content-length");
  if (declaredLength === null) return { ok: true };

  const contentLength = Number(declaredLength);
  if (!Number.isInteger(contentLength) || contentLength < 1) {
    return { ok: false, status: 400 };
  }
  if (contentLength > MAX_CONTROL_ROOM_FORM_BYTES) {
    return { ok: false, status: 413 };
  }

  return { ok: true };
}

export async function readBoundedUrlEncodedForm(
  request: Request,
): Promise<BoundedFormRead> {
  if (!request.body) return { ok: false, status: 400 };

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      totalBytes += value.byteLength;
      if (totalBytes > MAX_CONTROL_ROOM_FORM_BYTES) {
        try {
          await reader.cancel();
        } catch {
          // The request is already rejected; cancellation is best-effort cleanup.
        }
        return { ok: false, status: 413 };
      }
      chunks.push(value);
    }
  } catch {
    return { ok: false, status: 400 };
  }

  if (totalBytes < 1) return { ok: false, status: 400 };

  const bytes = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }

  try {
    const body = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
    return { ok: true, form: new URLSearchParams(body) };
  } catch {
    return { ok: false, status: 400 };
  }
}
