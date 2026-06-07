"use client";

import { useState } from "react";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);
    setSuccess(false);

    const formData = new FormData(
      e.currentTarget
    );

    const response = await fetch(
      "/api/contact",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message:
            formData.get("message"),
        }),
      }
    );

    setLoading(false);

    if (response.ok) {
      setSuccess(true);
      e.currentTarget.reset();
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-10"
    >
      <div>
        <label className="block text-sm uppercase tracking-[0.15em] text-gray-500 mb-3">
          Name
        </label>

        <input
          type="text"
          name="name"
          required
          className="w-full border-b border-gray-300 py-4 outline-none focus:border-black transition"
        />
      </div>

      <div>
        <label className="block text-sm uppercase tracking-[0.15em] text-gray-500 mb-3">
          Email
        </label>

        <input
          type="email"
          name="email"
          required
          className="w-full border-b border-gray-300 py-4 outline-none focus:border-black transition"
        />
      </div>

      <div>
        <label className="block text-sm uppercase tracking-[0.15em] text-gray-500 mb-3">
          Message
        </label>

        <textarea
          name="message"
          rows={7}
          required
          className="w-full border-b border-gray-300 py-4 outline-none resize-none focus:border-black transition"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="
          group
          inline-flex
          items-center
          gap-3
          bg-black
          text-white
          px-8
          py-4
          transition-all
          duration-300
          hover:px-10
        "
      >
        {loading
          ? "Sending..."
          : "Send Message"}

        <span className="transition-transform duration-300 group-hover:translate-x-2">
          →
        </span>
      </button>

      {success && (
        <p className="text-green-600">
          Thanks. Your message has been sent.
        </p>
      )}
    </form>
  );
}