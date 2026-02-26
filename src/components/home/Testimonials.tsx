"use client";

import { useState } from "react";

const testimonials = [
  {
    quote:
      "Grâce à Kadrix, ce qu'on faisait en plus d'1 heure auparavant nous le faisons maintenant en 5 minutes.",
    author: "Patrick Lamarque",
    role: "Directeur département vie fédérale, Fédération Française de Tir",
  },
  {
    quote:
      "Kadrix a vraiment eu un rôle déterminant dans la digitalisation de notre groupe.",
    author: "Ludovic Plana",
    role: "Chef de projet informatique, Groupe Delisle",
  },
  {
    quote:
      "Générer des fiches produits par an grâce à l'IA, c'est le défi relevé avec Kadrix.",
    author: "Marie Furon",
    role: "Directrice innovation et excellence opérationnelle, Showroomprivé",
  },
  {
    quote:
      "Kadrix a une grande expertise technique, l'équipe a su respecter les délais et faire preuve de grande souplesse.",
    author: "Quentin de Pélichy",
    role: "Directeur général, Turboself",
  },
  {
    quote: "En seulement 3 mois, on a réussi à lancer un logiciel 100% fonctionnel avec Kadrix.",
    author: "Hugo des Longchamps",
    role: "CTO, Paladin",
  },
  {
    quote:
      "Kadrix a été le partenaire idéal pour passer de l'idée au produit en quelques mois. Leur agilité et leur transparence ont été décisives pour notre lancement.",
    author: "Clémence Luc",
    role: "Cofondatrice & CEO de 10%",
  },
];

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const current = testimonials[activeIndex];

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-bold text-kadrix-dark sm:text-3xl">
          Nos clients témoignent
        </h2>
        <div className="mx-auto mt-12 max-w-3xl">
          <blockquote className="rounded-2xl bg-slate-50 p-8 sm:p-10 ring-1 ring-slate-200/80">
            <p className="text-lg text-kadrix-dark sm:text-xl">&ldquo;{current.quote}&rdquo;</p>
            <footer className="mt-6">
              <p className="font-semibold text-kadrix-dark">{current.author}</p>
              <p className="text-sm text-kadrix-muted">{current.role}</p>
            </footer>
          </blockquote>
          <div className="mt-6 flex items-center justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveIndex(i)}
                className={`h-2 rounded-full transition-all ${
                  i === activeIndex ? "w-8 bg-kadrix-primary" : "w-2 bg-slate-300 hover:bg-slate-400"
                }`}
                aria-label={`Témoignage ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
