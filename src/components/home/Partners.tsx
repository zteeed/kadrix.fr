"use client";

import Image from "next/image";
import { PARTNERS, partnerLogoSrc, type Partner } from "@/data/partners";

export function Partners() {
  return (
    <section className="border-t border-slate-200 bg-white py-10 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-10 sm:gap-x-20">
          {PARTNERS.map((partner: Partner) => {
            const marginClasses = [
              partner.reduceOuterMargin === "left" && "-ml-8 sm:-ml-10 lg:-ml-12",
              partner.reduceOuterMargin === "right" && "-mr-8 sm:-mr-10 lg:-mr-12",
              (partner.reduceInnerMargin === "left" || partner.reduceInnerMargin === "both") && "-ml-4 sm:-ml-5 lg:-ml-6",
              (partner.reduceInnerMargin === "right" || partner.reduceInnerMargin === "both") && "-mr-4 sm:-mr-5 lg:-mr-6",
            ]
              .filter(Boolean)
              .join(" ");
            return (
            <span
              key={partner.domain}
              className={`flex h-16 w-36 flex-shrink-0 items-center justify-center ${marginClasses}`}
              title={partner.name}
            >
              <Image
                src={partnerLogoSrc(partner)}
                alt={partner.name}
                width={144}
                height={64}
                className="max-h-14 w-full object-contain object-center"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = "block";
                }}
              />
              <span
                className="text-center text-sm font-medium text-kadrix-muted"
                style={{ display: "none" }}
                aria-hidden
              >
                {partner.name}
              </span>
            </span>
          );
          })}
        </div>
      </div>
    </section>
  );
}
