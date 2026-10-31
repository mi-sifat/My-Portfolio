"use client";

import React, { useState } from "react";
import { Sparkles, RefreshCw, Check, X, Info, Download } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { generateBannerDataUrl, BannerOptions } from "@/lib/bannerGenerator";

interface BannerGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  category: string;
  technologies: string[];
  onApplyBanner: (bannerUrl: string) => void;
}

export const BannerGeneratorModal: React.FC<BannerGeneratorModalProps> = ({
  isOpen,
  onClose,
  title,
  category,
  technologies,
  onApplyBanner,
}) => {
  const [theme, setTheme] = useState<BannerOptions["theme"]>("dark-obsidian");
  const [applying, setApplying] = useState(false);
  const [showAiNotice, setShowAiNotice] = useState(false);

  if (!isOpen) return null;

  const currentBannerDataUrl = generateBannerDataUrl({
    title: title || "Project Name",
    category: category || "Software Development",
    technologies: technologies.length > 0 ? technologies : ["React", "TypeScript", "Node.js"],
    theme,
  });

  const handleApply = async () => {
    setApplying(true);
    try {
      // Convert SVG data URL to a File and upload to /api/admin/media/upload
      const res = await fetch(currentBannerDataUrl);
      const blob = await res.blob();
      const file = new File([blob], `${(title || "project").toLowerCase().replace(/[^a-z0-9]/g, "-")}-banner.svg`, {
        type: "image/svg+xml",
      });

      const formData = new FormData();
      formData.append("file", file);
      formData.append("altText", `${title} Visual Banner`);

      const uploadRes = await fetch("/api/admin/media/upload", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadRes.json();
      if (uploadData.success && uploadData.media?.url) {
        onApplyBanner(uploadData.media.url);
      } else {
        // Fallback to direct SVG data URI if upload fails
        onApplyBanner(currentBannerDataUrl);
      }
      onClose();
    } catch {
      onApplyBanner(currentBannerDataUrl);
      onClose();
    } finally {
      setApplying(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-canvas-charcoal border border-neutral-200 dark:border-neutral-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-peach-100 dark:bg-peach-500/20 text-peach-600 dark:text-peach-300">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-foreground">
                Automatic Graphic Banner Studio
              </h3>
              <p className="text-xs text-foreground/60">
                Procedural 16:9 banner tailored to your project title &amp; stack
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-foreground/50 hover:text-foreground transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Live Banner Preview */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-foreground/70 uppercase tracking-wider font-mono">
              Live Preview (16:9 Aspect Ratio)
            </label>
            <span className="text-[11px] font-mono text-accent-ember font-medium">
              1280 × 720 HD SVG
            </span>
          </div>

          <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-neutral-300 dark:border-neutral-700 bg-neutral-900 shadow-inner group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentBannerDataUrl}
              alt="Generated Banner Preview"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.01]"
            />
          </div>
        </div>

        {/* Style Preset Selector */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-foreground/70">
            Select Visual Aesthetic Mood
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: "dark-obsidian", label: "Dark Obsidian", color: "bg-neutral-900 border-neutral-700" },
              { id: "warm-peach", label: "Warm Peach", color: "bg-peach-900/60 border-peach-500/40" },
              { id: "modern-mesh", label: "Modern Mesh", color: "bg-rose-950/60 border-rose-500/40" },
              { id: "tech-blueprint", label: "Tech Blueprint", color: "bg-cyan-950/60 border-cyan-500/40" },
            ].map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setTheme(p.id as BannerOptions["theme"])}
                className={`px-3 py-2 rounded-xl text-xs font-medium border text-left transition-all ${
                  theme === p.id
                    ? "border-accent-ember ring-2 ring-accent-ember/30 text-foreground font-bold shadow-sm"
                    : "border-neutral-200 dark:border-neutral-800 text-foreground/70 hover:text-foreground"
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <span className={`h-2.5 w-2.5 rounded-full ${p.color}`} />
                  {p.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* AI Information Accordion / Notice */}
        <div className="rounded-2xl bg-neutral-100/70 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 p-4 space-y-2">
          <button
            type="button"
            onClick={() => setShowAiNotice(!showAiNotice)}
            className="flex items-center justify-between w-full text-left"
          >
            <div className="flex items-center gap-2 text-xs font-semibold text-foreground/80">
              <Info className="h-4 w-4 text-peach-500" />
              <span>About AI Image Generation Integration</span>
            </div>
            <span className="text-xs text-foreground/45 hover:text-foreground">
              {showAiNotice ? "Hide details" : "Learn more"}
            </span>
          </button>
          {showAiNotice && (
            <div className="text-xs text-foreground/70 space-y-2 pt-2 border-t border-neutral-200 dark:border-neutral-800 leading-relaxed font-sans">
              <p>
                <strong>Current Engine:</strong> This studio uses high-resolution procedural vector rendering to generate branded, lightweight, 100% free card banners matching your exact brand palette without any third-party fees.
              </p>
              <p>
                <strong>Cloud AI Option:</strong> If you wish to connect external generative models (e.g. OpenAI DALL-E 3 or Google Imagen 3), you can provide an API key in your <code>.env</code> file. Note that external AI generation costs approximately $0.04 to $0.08 per image and requires an active billing account.
              </p>
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-4 border-t border-neutral-200 dark:border-neutral-800">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>

          <a
            href={currentBannerDataUrl}
            download={`${(title || "project").toLowerCase().replace(/[^a-z0-9]/g, "-")}-banner.svg`}
            className="w-full sm:w-auto"
          >
            <Button type="button" variant="outline" className="w-full">
              <Download className="h-4 w-4" />
              Download SVG
            </Button>
          </a>

          <Button
            type="button"
            variant="primary"
            onClick={handleApply}
            disabled={applying}
            className="w-full sm:w-auto"
          >
            {applying ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                Saving to Media...
              </>
            ) : (
              <>
                <Check className="h-4 w-4" />
                Apply as Project Cover
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
