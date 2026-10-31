import React from "react";
import Link from "next/link";
import { Briefcase, Building2, Terminal, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { EXPERIENCE_DATA } from "@/lib/portfolioData";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { StaggerGrid, StaggerItem } from "@/components/animations/StaggerGrid";

export const metadata = {
  title: "Experience & Work History — Majharul Islam Sifat",
  description: "Work history including Junior Software Engineer at Archgig, e-commerce operations, and IT systems training.",
};

export default function ExperiencePage() {
  const professionalWork = EXPERIENCE_DATA.filter((e) => e.type === "Professional");
  const trainingWork = EXPERIENCE_DATA.filter((e) => e.type === "Learning & Training");

  return (
    <div className="space-y-24 pb-24 px-6 max-w-6xl mx-auto">
      {/* Header */}
      <ScrollReveal variant="slide-up">
        <div className="text-center space-y-4 pt-6">
          <SectionHeading
            badge="Professional Track Record"
            title="Work Experience &amp;"
            italicWord="Industry Exposure"
            subtitle="Clear distinction between active software engineering employment and structured learning programs."
          />
        </div>
      </ScrollReveal>

      {/* Professional Roles */}
      <div className="space-y-8 max-w-4xl mx-auto">
        <ScrollReveal variant="slide-up">
          <div className="flex items-center gap-2 pb-2 border-b border-neutral-200/70 dark:border-neutral-800">
            <Briefcase className="h-5 w-5 text-accent-ember" />
            <h2 className="font-display text-lg font-bold text-foreground">
              Professional Roles &amp; Business Operations
            </h2>
          </div>
        </ScrollReveal>

        <StaggerGrid className="space-y-6">
          {professionalWork.map((exp) => (
            <StaggerItem key={exp.id}>
              <Card variant="glass" className="space-y-4 p-6 sm:p-8 hover:-translate-y-1 transition-all duration-300 border border-neutral-200/70 dark:border-neutral-800">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="font-display text-xl font-bold text-foreground">
                      {exp.role}
                    </h3>
                    <p className="text-sm font-semibold text-accent-ember flex items-center gap-1.5 mt-0.5">
                      <Building2 className="h-4 w-4" />
                      {exp.organization}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {exp.isCurrent && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Current
                      </span>
                    )}
                    <Badge variant="neutral">{exp.duration}</Badge>
                  </div>
                </div>

                <p className="text-sm text-foreground/75 leading-relaxed">
                  {exp.description}
                </p>

                <div className="pt-2">
                  <p className="text-xs font-mono text-foreground/50 uppercase tracking-wider mb-2">
                    Applied Competencies
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-3 py-1 rounded-full bg-white dark:bg-canvas-charcoal border border-neutral-200/80 dark:border-neutral-800 font-mono text-foreground/70"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>

      {/* Structured Training & Learning Section */}
      <div className="space-y-8 max-w-4xl mx-auto">
        <ScrollReveal variant="slide-up">
          <div className="flex items-center gap-2 pb-2 border-b border-neutral-200/70 dark:border-neutral-800">
            <Terminal className="h-5 w-5 text-peach-500" />
            <h2 className="font-display text-lg font-bold text-foreground">
              Technical Training &amp; Apprenticeship
            </h2>
          </div>
        </ScrollReveal>

        <StaggerGrid className="space-y-6">
          {trainingWork.map((exp) => (
            <StaggerItem key={exp.id}>
              <Card variant="glass" className="space-y-4 p-6 sm:p-8 hover:-translate-y-1 transition-all duration-300 border border-neutral-200/70 dark:border-neutral-800">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="font-display text-lg font-bold text-foreground">
                      {exp.role}
                    </h3>
                    <p className="text-sm font-semibold text-peach-500 flex items-center gap-1.5 mt-0.5">
                      <Building2 className="h-4 w-4" />
                      {exp.organization}
                    </p>
                  </div>
                  <Badge variant="peach">Structured Training</Badge>
                </div>

                <p className="text-sm text-foreground/75 leading-relaxed">
                  {exp.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-1">
                  {exp.technologies.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-3 py-1 rounded-full bg-white dark:bg-canvas-charcoal border border-neutral-200/80 dark:border-neutral-800 font-mono text-foreground/70"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Card>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>

      {/* CTA */}
      <ScrollReveal variant="slide-up">
        <div className="text-center pt-4">
          <Link href="/projects">
            <Button variant="primary" size="lg" className="transition-transform duration-300 hover:scale-105">
              View Live Software Projects
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </ScrollReveal>
    </div>
  );
}
