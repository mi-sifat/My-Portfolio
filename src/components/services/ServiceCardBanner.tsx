"use client";

import React, { useState } from "react";
import Image from "next/image";
import { generateBannerDataUrl } from "@/lib/bannerGenerator";

interface ServiceCardBannerProps {
  title: string;
  category?: string;
  coverImageUrl?: string | null;
}

export const ServiceCardBanner: React.FC<ServiceCardBannerProps> = ({
  title,
  category = "Professional Service",
  coverImageUrl,
}) => {
  const [imageError, setImageError] = useState(false);

  if (coverImageUrl && !imageError) {
    const isSvg = coverImageUrl.startsWith("data:image/svg") || coverImageUrl.endsWith(".svg");

    return (
      <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 group-hover:border-peach-500/30 transition-colors">
        {isSvg ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={coverImageUrl}
            alt={`${title} Service Banner`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
        ) : (
          <Image
            src={coverImageUrl}
            alt={`${title} Service Banner`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={() => setImageError(true)}
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
      </div>
    );
  }

  const fallbackDataUrl = generateBannerDataUrl({
    title,
    category,
    technologies: ["Architecture", "Production", "Support"],
    theme: "warm-peach",
  });

  return (
    <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 group-hover:border-peach-500/30 transition-colors">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={fallbackDataUrl}
        alt={`${title} Service Banner`}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-50" />
    </div>
  );
};

