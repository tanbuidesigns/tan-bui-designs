"use client";

import Link from "next/link";
import { useState } from "react";

import Button from "@/components/ui/Button";

const services = [
  "Brand Identity",
  "Packaging Design",
  "Publication Design",
  "Website Design",
  "Exhibition Design",
  "Creative Direction",
] as const;

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError(false);

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          services: formData.getAll("services"),
          message: formData.get("message"),
        }),
      });

      if (!response.ok) throw new Error("Contact request failed");
      setSuccess(true);
      form.reset();
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  const fieldClass =
    "w-full border-0 border-b border-black/20 bg-transparent px-0 py-3 text-base text-black outline-none transition-colors placeholder:text-gray-400 focus:border-black focus-visible:ring-0";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="block text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">Name</label>
          <input id="contact-name" type="text" name="name" autoComplete="name" required className={fieldClass} />
        </div>
        <div>
          <label htmlFor="contact-email" className="block text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">Email</label>
          <input id="contact-email" type="email" name="email" autoComplete="email" required className={fieldClass} />
        </div>
      </div>

      <fieldset>
        <legend className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">What can I help with?</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {services.map((service) => (
            <label key={service} className="cursor-pointer">
              <input type="checkbox" name="services" value={service} className="peer sr-only" />
              <span className="inline-flex min-h-10 items-center rounded-full border border-black/12 bg-white px-4 text-sm text-gray-600 transition-[background-color,border-color,color,transform] hover:-translate-y-px hover:border-black/30 peer-checked:border-black peer-checked:bg-black peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-black motion-reduce:transition-none">
                {service}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="contact-message" className="block text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">Message</label>
        <textarea id="contact-message" name="message" rows={4} required className={`${fieldClass} resize-y`} />
      </div>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
        <Button type="submit" disabled={loading} variant="primary" size="md" showArrow>
          {loading ? "Sending..." : "Send message"}
        </Button>
        <p className="max-w-sm text-xs leading-relaxed text-gray-500">
          Your details are used to respond to this enquiry. Read the <Link href="/privacy" className="underline underline-offset-2 hover:text-black">privacy notice</Link>.
        </p>
      </div>

      <p aria-live="polite" className={`min-h-5 text-sm ${error ? "text-red-700" : "text-green-700"}`}>
        {success ? "Thanks. Your message has been sent." : error ? "Something went wrong. Please email tanbuidesigns@gmail.com instead." : null}
      </p>
    </form>
  );
}
