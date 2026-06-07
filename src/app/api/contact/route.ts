import { Resend } from "resend";

const resend = new Resend(
  process.env.RESEND_API_KEY
);

export async function POST(
  request: Request
) {
  try {
    const {
      name,
      email,
      message,
    } = await request.json();

    await resend.emails.send({
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

Message:
${message}
      `,
    });

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