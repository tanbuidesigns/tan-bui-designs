"use client";

import { useState } from "react";

import Button from "@/components/ui/Button";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setSuccess(false);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message"),
      }),
    });

    setLoading(false);

    if (response.ok) {
      setSuccess(true);
      form.reset();
    }
  }

  const fieldClass =
    "w-full border-0 border-b border-black/20 bg-transparent px-0 py-4 text-lg text-black outline-none transition-colors placeholder:text-gray-400 focus:border-black focus-visible:ring-0";

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <label htmlFor="contact-name" className="block text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
          Name
        </label>
        <input id="contact-name" type="text" name="name" autoComplete="name" required className={fieldClass} />
      </div>

      <div>
        <label htmlFor="contact-email" className="block text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
          Email
        </label>
        <input id="contact-email" type="email" name="email" autoComplete="email" required className={fieldClass} />
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
          Message
        </label>
        <textarea id="contact-message" name="message" rows={6} required className={`${fieldClass} resize-y`} />
      </div>

      <Button type="submit" disabled={loading} variant="primary" size="lg" showArrow>
        {loading ? "Sending..." : "Send Message"}
      </Button>

      <p aria-live="polite" className="min-h-6 text-sm text-green-700">
        {success ? "Thanks. Your message has been sent." : null}
      </p>
    </form>
  );
}
