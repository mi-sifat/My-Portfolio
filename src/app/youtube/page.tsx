"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ExternalLink, ArrowUpRight, Video, Play, Compass, Utensils, X } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { YOUTUBE_VIDEOS, PROFILE_DATA, VideoItem } from "@/lib/portfolioData";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { StaggerGrid, StaggerItem } from "@/components/animations/StaggerGrid";

const CATEGORIES = ["All", "Food Blogging", "Travel Vlogging", "Resort Reviews"];

export default function YouTubePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  const filteredVideos = YOUTUBE_VIDEOS.filter((v) => {
    if (selectedCategory === "All") return true;
    return v.category.toLowerCase().includes(selectedCategory.toLowerCase());
  });

  return (
    <div className="space-y-16 pb-24 px-6 max-w-6xl mx-auto">
      {/* Header */}
      <ScrollReveal variant="slide-up">
        <div className="text-center space-y-4 pt-6">
          <SectionHeading
            badge="Creative Content Channel"
            title="YouTube &"
            italicWord="Visual Storytelling"
            subtitle="Documenting scenic travel destinations, local culinary reviews, and resort experiences through cinematography."
          />
        </div>
      </ScrollReveal>

      {/* Channel Header Banner */}
      <ScrollReveal variant="scale-up" delay={0.1}>
        <div className="glass-card rounded-4xl p-6 sm:p-10 border border-peach-200/60 dark:border-neutral-800 shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
              <div className="relative aspect-square w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-white dark:border-canvas-charcoal shadow-lg bg-warm-100 shrink-0">
                <Image
                  src={PROFILE_DATA.creatorPortrait}
                  alt="Majharul Islam Sifat — Content Creator"
                  fill
                  sizes="112px"
                  className="object-cover"
                />
              </div>
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-red-600/10 text-red-600 text-xs font-semibold">
                  <Video className="h-3.5 w-3.5" />
                  Verified Creator Channel
                </div>
                <h2 className="font-display text-2xl font-bold text-foreground">
                  Majharul Islam Sifat
                </h2>
                <p className="text-xs sm:text-sm text-foreground/60 max-w-md">
                  Food Blogging · Travel Vlogging · Resort Reviews · Tour &amp; Lifestyle Diary
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="https://www.youtube.com/channel/UCD8FOEQ-yTH19DMjZkwSCLw"
                target="_blank"
                rel="noreferrer"
              >
                <Button size="lg" variant="primary" className="bg-red-600 hover:bg-red-700 text-white dark:bg-red-600 dark:hover:bg-red-700 transition-transform duration-300 hover:scale-105">
                  <svg className="h-4 w-4 fill-white" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                  Subscribe on YouTube
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Category Filter Controls */}
      <ScrollReveal variant="fade" delay={0.15}>
        <div className="flex items-center justify-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all duration-300 ${
                selectedCategory === cat
                  ? "bg-red-600 text-white shadow-md font-bold scale-105"
                  : "bg-white/80 dark:bg-canvas-charcoal/80 text-foreground/70 hover:text-foreground border border-neutral-200/80 dark:border-neutral-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </ScrollReveal>

      {/* Verified Video Showcase */}
      <div className="space-y-6">
        <ScrollReveal variant="slide-up">
          <div className="flex items-center justify-between pb-2 border-b border-neutral-200/70 dark:border-neutral-800">
            <h3 className="font-display text-xl font-bold text-foreground">
              Featured Videos
            </h3>
            <span className="text-xs font-mono text-foreground/50">
              {filteredVideos.length} Releases
            </span>
          </div>
        </ScrollReveal>

        <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredVideos.map((video) => (
            <StaggerItem key={video.id}>
              <Card variant="glass" className="space-y-4 p-5 group flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-300 border border-neutral-200/70 dark:border-neutral-800 h-full">
                <div className="space-y-3">
                  {/* Clickable Video Thumbnail Trigger */}
                  <div
                    onClick={() => setActiveVideo(video)}
                    className="block relative aspect-video w-full rounded-2xl overflow-hidden bg-neutral-900 group cursor-pointer"
                    title="Click to play video"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={video.thumbnailUrl}
                      alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors grid place-items-center">
                    <div className="grid h-14 w-14 place-items-center rounded-full bg-red-600 text-white shadow-xl transition-transform duration-300 group-hover:scale-110">
                      <Play className="h-6 w-6 fill-white ml-0.5" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md text-xs text-white font-mono flex items-center gap-1.5">
                    {video.category.includes("Food") ? (
                      <Utensils className="h-3 w-3 text-peach-300" />
                    ) : (
                      <Compass className="h-3 w-3 text-peach-300" />
                    )}
                    {video.category}
                  </div>
                </div>

                <h3 className="font-display text-base font-bold text-foreground leading-snug group-hover:text-red-600 transition-colors">
                  {video.title}
                </h3>
              </div>

              <div className="pt-3 border-t border-neutral-200/60 dark:border-neutral-800 flex items-center justify-between">
                <button
                  onClick={() => setActiveVideo(video)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 hover:underline"
                >
                  <Play className="h-3 w-3 fill-current" />
                  <span>Play Directly</span>
                </button>
                <a
                  href={video.youtubeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-foreground/50 hover:text-foreground"
                >
                  <span>Open in YouTube</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </Card>
          </StaggerItem>
        ))}
      </StaggerGrid>
    </div>

      {/* Embedded Video Player Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-4xl bg-black rounded-3xl overflow-hidden shadow-2xl border border-neutral-800 space-y-3 p-4">
            <div className="flex items-center justify-between text-white px-2">
              <div className="flex items-center gap-2 min-w-0 pr-4">
                <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                <h3 className="font-display text-sm font-bold truncate">
                  {activeVideo.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                className="p-1.5 rounded-full bg-neutral-800 text-white hover:bg-neutral-700 transition-colors"
                aria-label="Close video player"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0`}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
          </div>
        </div>
      )}

      {/* Content Creation Inquiries */}
      <div className="rounded-3xl p-8 bg-warm-100/60 dark:bg-canvas-charcoal/60 border border-neutral-200/80 dark:border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <h3 className="font-display text-lg font-bold text-foreground">
            Looking for Resort Reviews, Food Coverage, or Video Editing?
          </h3>
          <p className="text-xs sm:text-sm text-foreground/70">
            I collaborate with restaurants, resort brands, and creators on cinematography, promotional reviews, and YouTube video editing.
          </p>
        </div>
        <a
          href={`https://wa.me/8801638090793?text=${encodeURIComponent("Hi Sifat, I am interested in collaborating on YouTube video creation / editing.")}`}
          target="_blank"
          rel="noreferrer"
        >
          <Button variant="primary" size="md">
            Collaborate on YouTube
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </a>
      </div>
    </div>
  );
}
