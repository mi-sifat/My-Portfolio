"use client";

import React, { useState } from "react";
import Image from "next/image";
import { generateBannerDataUrl } from "@/lib/bannerGenerator";

interface ProjectCardBannerProps {
  title: string;
  category: string;
  technologies?: string[];
  coverImageUrl?: string | null;
  priority?: boolean;
}

export const ProjectCardBanner: React.FC<ProjectCardBannerProps> = ({
  title,
  category,
  technologies = [],
  coverImageUrl,
  priority = false,
}) => {
  const [imageError, setImageError] = useState(false);

  // If there's an image and no error, render it
  if (coverImageUrl && !imageError) {
    const isSvg = coverImageUrl.startsWith("data:image/svg") || coverImageUrl.endsWith(".svg");

    return (
      <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 group-hover:border-peach-500/30 transition-colors">
        {isSvg ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={coverImageUrl}
            alt={`${title} Banner`}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            onError={() => setImageError(true)}
          />
        ) : (
          <Image
            src={coverImageUrl}
            alt={`${title} Banner`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={priority}
            onError={() => setImageError(true)}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
      </div>
    );
  }

  // Fallback to inline procedural banner
  const fallbackDataUrl = generateBannerDataUrl({
    title,
    category,
    technologies,
    theme: "dark-obsidian",
  });

  return (
    <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 group-hover:border-peach-500/30 transition-colors">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={fallbackDataUrl}
        alt={`${title} Graphic Banner`}
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-50 group-hover:opacity-30 transition-opacity" />
    </div>
  );
};

