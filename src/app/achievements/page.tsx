import React from "react";
import Link from "next/link";
import { CheckCircle2, ArrowUpRight, FileCheck } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ACHIEVEMENTS_DATA } from "@/lib/portfolioData";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { StaggerGrid, StaggerItem } from "@/components/animations/StaggerGrid";

export const metadata = {
  title: "Achievements & Certificates — Majharul Islam Sifat",
  description: "Verified academic and engineering milestones achieved by Majharul Islam Sifat.",
};

export default function AchievementsPage() {
  return (
    <div className="space-y-24 pb-24 px-6 max-w-6xl mx-auto">
      {/* Header */}
      <ScrollReveal variant="slide-up">
        <div className="text-center space-y-4 pt-6">
          <SectionHeading
            badge="Verified Records"
            title="Milestones &amp;"
            italicWord="Achievements"
            subtitle="A factual record of academic results, software production launches, and engineering accomplishments."
          />
        </div>
      </ScrollReveal>

      {/* Achievements Cards */}
      <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {ACHIEVEMENTS_DATA.map((ach) => (
          <StaggerItem key={ach.id}>
            <Card variant="glass" className="space-y-5 p-7 sm:p-8 flex flex-col justify-between h-full border border-neutral-200/70 dark:border-neutral-800 hover:-translate-y-1.5 transition-all duration-300">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="peach">{ach.category}</Badge>
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    {ach.statusLabel}
                  </span>
                </div>

                <div>
                  <h2 className="font-display text-xl font-bold text-foreground">
                    {ach.title}
                  </h2>
                  <p className="text-xs font-semibold text-accent-ember mt-1">
                    {ach.organization}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-foreground/70 leading-relaxed">
                  {ach.description}
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-200/60 dark:border-neutral-800 flex items-center justify-between text-xs text-foreground/50">
                <span className="font-mono">Record #{ach.id}</span>
                <span className="font-medium text-peach-500">Documented</span>
              </div>
            </Card>
          </StaggerItem>
        ))}
      </StaggerGrid>

      {/* Transparency Note */}
      <ScrollReveal variant="slide-up">
        <div className="rounded-3xl p-6 bg-warm-100/50 dark:bg-canvas-charcoal/50 border border-neutral-200/80 dark:border-neutral-800 text-center space-y-3 max-w-2xl mx-auto shadow-sm">
          <FileCheck className="h-6 w-6 text-accent-ember mx-auto" />
          <h3 className="font-display text-base font-bold text-foreground">
            Academic &amp; Certification Verification
          </h3>
          <p className="text-xs text-foreground/60 leading-relaxed">
            All listed qualifications represent authentic credentials under the Bangladesh Technical Education Board (BTEB) and Dhaka Board. Original certificates are available for verification upon employer or client request.
          </p>
          <div className="pt-2">
            <Link href="/contact">
              <Button variant="outline" size="sm" className="transition-transform duration-300 hover:scale-105">
                Request Credential Verification
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
