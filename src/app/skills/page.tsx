"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Code2, Palette, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SKILLS_DATA } from "@/lib/portfolioData";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { StaggerGrid, StaggerItem } from "@/components/animations/StaggerGrid";

export default function SkillsPage() {
  const [activeTab, setActiveTab] = useState<"ALL" | "Development" | "Creative">("ALL");

  const filteredSkills =
    activeTab === "ALL"
      ? SKILLS_DATA
      : SKILLS_DATA.filter((s) => s.category === activeTab);

  const devCount = SKILLS_DATA.filter((s) => s.category === "Development").length;
  const creativeCount = SKILLS_DATA.filter((s) => s.category === "Creative").length;

  return (
    <div className="space-y-16 pb-24 px-6 max-w-6xl mx-auto">
      {/* Header */}
      <ScrollReveal variant="slide-up">
        <div className="text-center space-y-4 pt-6">
          <SectionHeading
            badge="Technical & Creative Stack"
            title="Skills &"
            italicWord="Proficiencies"
            subtitle="Honest and transparent ratings of my engineering technologies, creative tools, and ongoing learning paths."
          />
        </div>
      </ScrollReveal>

      {/* Filter Tabs & Stack Summary */}
      <ScrollReveal variant="fade" delay={0.15}>
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="flex items-center justify-center gap-2 p-1.5 rounded-full bg-white/70 dark:bg-canvas-charcoal/70 border border-neutral-200/80 dark:border-neutral-800 shadow-sm">
            <button
              onClick={() => setActiveTab("ALL")}
              className={`px-4 py-2 rounded-full text-xs font-mono transition-all duration-300 ${
                activeTab === "ALL"
                  ? "bg-canvas-dark text-white dark:bg-white dark:text-neutral-900 shadow-md font-bold scale-105"
                  : "text-foreground/70 hover:text-foreground hover:bg-warm-100 dark:hover:bg-neutral-800"
              }`}
            >
              All Stack ({SKILLS_DATA.length})
            </button>

            <button
              onClick={() => setActiveTab("Development")}
              className={`px-4 py-2 rounded-full text-xs font-mono transition-all duration-300 flex items-center gap-1.5 ${
                activeTab === "Development"
                  ? "bg-accent-ember text-white shadow-md font-bold scale-105"
                  : "text-foreground/70 hover:text-foreground hover:bg-warm-100 dark:hover:bg-neutral-800"
              }`}
            >
              <Code2 className="h-3.5 w-3.5" />
              <span>Development ({devCount})</span>
            </button>

            <button
              onClick={() => setActiveTab("Creative")}
              className={`px-4 py-2 rounded-full text-xs font-mono transition-all duration-300 flex items-center gap-1.5 ${
                activeTab === "Creative"
                  ? "bg-peach-500 text-white shadow-md font-bold scale-105"
                  : "text-foreground/70 hover:text-foreground hover:bg-warm-100 dark:hover:bg-neutral-800"
              }`}
            >
              <Palette className="h-3.5 w-3.5" />
              <span>Creative ({creativeCount})</span>
            </button>
          </div>
        </div>
      </ScrollReveal>

      {/* Skills Grid with Staggered Entrance */}
      <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSkills.map((skill) => (
          <StaggerItem key={skill.id}>
            <Card
              variant="glass"
              className="space-y-3 p-6 group hover:-translate-y-1.5 transition-all duration-300 border border-neutral-200/80 dark:border-neutral-800 h-full"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {skill.category === "Development" ? (
                    <Code2 className="h-4 w-4 text-accent-ember" />
                  ) : (
                    <Palette className="h-4 w-4 text-peach-500" />
                  )}
                  <h3 className="font-display text-base font-bold text-foreground">
                    {skill.name}
                  </h3>
                </div>
                <Badge
                  variant={
                    skill.level === "Proficient"
                      ? "ember"
                      : skill.level === "Intermediate"
                      ? "peach"
                      : "neutral"
                  }
                >
                  {skill.level}
                </Badge>
              </div>

              <div className="pt-2 border-t border-neutral-200/60 dark:border-neutral-800 flex items-center justify-between text-[11px] font-mono text-foreground/45">
                <span>{skill.category} Stack</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Verified</span>
              </div>
            </Card>
          </StaggerItem>
        ))}
      </StaggerGrid>

      {/* Learning & Future Roadmap Banner */}
      <ScrollReveal variant="slide-up">
        <div className="rounded-3xl p-8 bg-warm-100/50 dark:bg-canvas-charcoal/50 border border-neutral-200/80 dark:border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="space-y-1.5 text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <Sparkles className="h-4 w-4 text-accent-ember" />
              <span className="font-mono text-xs font-bold uppercase text-accent-ember tracking-wider">
                Continuous Engineering Growth
              </span>
            </div>
            <h3 className="font-display text-lg font-bold text-foreground">
              Currently advancing skills in Next.js Server Components, Docker, and Microservices
            </h3>
            <p className="text-xs sm:text-sm text-foreground/70 max-w-xl">
              Passionate about writing clean code, building high-conversion landing experiences, and expanding full-stack architectural mastery.
            </p>
          </div>
          <Link href="/projects">
            <Button variant="outline" size="md" className="transition-transform duration-300 hover:scale-105">
              View Live Projects
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </ScrollReveal>
    </div>
  );
}
