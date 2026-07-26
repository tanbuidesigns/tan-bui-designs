import { Resend } from "resend";

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

const resend = new Resend(
  process.env.RESEND_API_KEY
);

export async function POST(
  request: Request
) {
  try {
    if (!request.headers.get("content-type")?.includes("application/json")) {
      return Response.json({ success: false }, { status: 415 });
    }

    const contentLength = Number(request.headers.get("content-length") ?? 0);
    if (contentLength > maximumRequestBytes) {
      return Response.json({ success: false }, { status: 413 });
    }

    const submission = await request.json() as ContactSubmission;
    const name = textValue(submission.name);
    const email = textValue(submission.email);
    const message = textValue(submission.message);
    const website = textValue(submission.website);
    const services = Array.isArray(submission.services)
      ? submission.services.filter(
          (service): service is string =>
            typeof service === "string" && allowedServices.has(service),
        )
      : [];

    if (website) {
      return Response.json({ success: true });
    }

    if (
      name.length < 2 ||
      name.length > 120 ||
      email.length > 254 ||
      !emailPattern.test(email) ||
      message.length < 10 ||
      message.length > 5_000
    ) {
      return Response.json({ success: false }, { status: 400 });
    }

    const { error } = await resend.emails.send({
      from:
        "Tan Bui Designs <onboarding@resend.dev>",

      to: [
        "tanbuidesigns@gmail.com",
      ],

      replyTo: email,

      subject: `New Website Enquiry from ${name}`,

      text: `
Name:
${name}

Email:
${email}

Services:
${Array.isArray(services) && services.length ? services.join(", ") : "Not specified"}

Message:
${message}
      `,
    });

    if (error) {
      console.error("Contact email delivery failed", error.name);
      return Response.json({ success: false }, { status: 502 });
    }

    return Response.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}
