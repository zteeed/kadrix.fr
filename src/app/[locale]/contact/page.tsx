"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { getTranslations } from "@/i18n/request";
import type { Locale } from "@/i18n/config";

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID || "xzdayqkw";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.kadrix.fr";

export default function ContactPage() {
  const params = useParams();
  const locale = (params?.locale as Locale) ?? "fr";
  const t = getTranslations(locale);
  const budgetOptions = t.contact.budgetOptions as string[];
  const [budget, setBudget] = useState("");

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-kadrix-dark sm:text-4xl">
          {t.contact.title}
        </h1>
        <p className="mt-4 text-lg text-kadrix-muted">{t.contact.intro}</p>
      </div>

      <form
        className="mt-12 space-y-6"
        action={`https://formspree.io/f/${FORMSPREE_ID}`}
        method="POST"
      >
        <input
          type="hidden"
          name="_next"
          value={`${SITE_URL}/${locale}/contact/merci`}
        />
        <input
          type="hidden"
          name="_subject"
          value={t.contact.subjectNewMessage}
        />
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="prenom"
              className="block text-sm font-medium text-kadrix-dark"
            >
              {t.contact.firstName}
            </label>
            <input
              id="prenom"
              name="prenom"
              type="text"
              required
              className="mt-2 block w-full rounded-lg border border-slate-300 px-4 py-3 text-kadrix-dark shadow-sm focus:border-kadrix-primary focus:ring-1 focus:ring-kadrix-primary"
            />
          </div>
          <div>
            <label
              htmlFor="nom"
              className="block text-sm font-medium text-kadrix-dark"
            >
              {t.contact.lastName}
            </label>
            <input
              id="nom"
              name="nom"
              type="text"
              required
              className="mt-2 block w-full rounded-lg border border-slate-300 px-4 py-3 text-kadrix-dark shadow-sm focus:border-kadrix-primary focus:ring-1 focus:ring-kadrix-primary"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-kadrix-dark"
          >
            {t.contact.email}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-2 block w-full rounded-lg border border-slate-300 px-4 py-3 text-kadrix-dark shadow-sm focus:border-kadrix-primary focus:ring-1 focus:ring-kadrix-primary"
          />
        </div>

        <div>
          <label
            htmlFor="telephone"
            className="block text-sm font-medium text-kadrix-dark"
          >
            {t.contact.phone}
          </label>
          <input
            id="telephone"
            name="telephone"
            type="tel"
            className="mt-2 block w-full rounded-lg border border-slate-300 px-4 py-3 text-kadrix-dark shadow-sm focus:border-kadrix-primary focus:ring-1 focus:ring-kadrix-primary"
          />
        </div>

        <div>
          <label
            htmlFor="societe"
            className="block text-sm font-medium text-kadrix-dark"
          >
            {t.contact.company}
          </label>
          <input
            id="societe"
            name="societe"
            type="text"
            className="mt-2 block w-full rounded-lg border border-slate-300 px-4 py-3 text-kadrix-dark shadow-sm focus:border-kadrix-primary focus:ring-1 focus:ring-kadrix-primary"
          />
        </div>

        <div>
          <label
            htmlFor="budget"
            className="block text-sm font-medium text-kadrix-dark"
          >
            {t.contact.budget}
          </label>
          <select
            id="budget"
            name="budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="mt-2 block w-full rounded-lg border border-slate-300 px-4 py-3 text-kadrix-dark shadow-sm focus:border-kadrix-primary focus:ring-1 focus:ring-kadrix-primary"
          >
            <option value="">{t.contact.budgetPlaceholder}</option>
            {budgetOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-kadrix-dark"
          >
            {t.contact.messageLabel}
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className="mt-2 block w-full rounded-lg border border-slate-300 px-4 py-3 text-kadrix-dark shadow-sm focus:border-kadrix-primary focus:ring-1 focus:ring-kadrix-primary"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-full bg-kadrix-primary px-6 py-4 text-base font-medium text-white hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-kadrix-primary focus:ring-offset-2"
        >
          {t.contact.submit}
        </button>
      </form>
    </div>
  );
}
