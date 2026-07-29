import { Resend } from "resend";

import { recordContactLead } from "@/lib/control-room/leads/service";
import { readBoundedJsonRequest } from "@/lib/contact/bounded-json-request";

type ContactSubmission = {
  name?: unknown;
  email?: unknown;
  services?: unknown;
  message?: unknown;
  website?: unknown;
};

const allowedServices = new Set([
  "Brand Identity",
  "Packaging Design",
  "Publication Design",
  "Website Design",
  "Exhibition Design",
  "Creative Direction",
]);

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const maximumRequestBytes = 20_000;

function textValue(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function jsonResponse(success: boolean, status = 200) {
  return Response.json(
    { success },
    {
      status,
      headers: { "Cache-Control": "no-store" },
    },
  );
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    if (!request.headers.get("content-type")?.includes("application/json")) {
      return jsonResponse(false, 415);
    }

    const declaredLength = request.headers.get("content-length");
    if (declaredLength !== null) {
      const contentLength = Number(declaredLength);
      if (!Number.isInteger(contentLength) || contentLength < 1) {
        return jsonResponse(false, 400);
      }
      if (contentLength > maximumRequestBytes) {
        return jsonResponse(false, 413);
      }
    }

    const body = await readBoundedJsonRequest(request, maximumRequestBytes);
    if (!body.ok) return jsonResponse(false, body.status);
    if (!body.value || typeof body.value !== "object") {
      return jsonResponse(false, 400);
    }

    const submission = body.value as ContactSubmission;
    const name = textValue(submission.name);
    const email = textValue(submission.email);
    const message = textValue(submission.message);
    const website = textValue(submission.website);
    const services = Array.isArray(submission.services)
      ? Array.from(
          new Set(
            submission.services.filter(
              (service): service is string =>
                typeof service === "string" && allowedServices.has(service),
            ),
          ),
        )
      : [];

    if (website) return jsonResponse(true);

    if (
      name.length < 2 ||
      name.length > 120 ||
      email.length > 254 ||
      !emailPattern.test(email) ||
      message.length < 10 ||
      message.length > 5_000
    ) {
      return jsonResponse(false, 400);
    }

    const { error } = await resend.emails.send({
      from: "Tan Bui Designs <hello@tanbuidesigns.com>",
      to: ["tanbuidesigns@gmail.com"],
      replyTo: email,
      subject: `New Website Enquiry from ${name}`,
      text: `
Name:
${name}

Email:
${email}

Services:
${services.length ? services.join(", ") : "Not specified"}

Message:
${message}
      `,
    });

    if (error) {
      console.error(
        JSON.stringify({
          event: "contact_email_delivery_failed",
          errorType: error.name,
        }),
      );
      return jsonResponse(false, 502);
    }

    const createdAt = new Date().toISOString();
    const leadResult = await recordContactLead({
      id: crypto.randomUUID(),
      name,
      email,
      services,
      sourcePath: "/contact",
      createdAt,
    });
    if (leadResult.status !== "recorded") {
      console.error(
        JSON.stringify({
          event: "contact_lead_storage_failed",
          storageStatus: leadResult.status,
        }),
      );
    }

    return jsonResponse(true);
  } catch (error) {
    console.error(
      JSON.stringify({
        event: "contact_submission_failed",
        errorType: error instanceof Error ? error.name : "unknown",
      }),
    );
    return jsonResponse(false, 500);
  }
}
