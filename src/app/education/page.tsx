import React from "react";
import Link from "next/link";
import { GraduationCap, Award, BookOpen, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { EDUCATION_DATA } from "@/lib/portfolioData";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { StaggerGrid, StaggerItem } from "@/components/animations/StaggerGrid";

export const metadata = {
  title: "Education & Academic Background — Majharul Islam Sifat",
  description: "Academic qualifications, CST Diploma in Engineering (8th Semester), and SSC Science credentials.",
};

export default function EducationPage() {
  return (
    <div className="space-y-24 pb-24 px-6 max-w-6xl mx-auto">
      {/* Header */}
      <ScrollReveal variant="slide-up">
        <div className="text-center space-y-4 pt-6">
          <SectionHeading
            badge="Academic Qualifications"
            title="Education &amp;"
            italicWord="Academic Foundation"
            subtitle="A structured timeline of my formal engineering diploma and secondary school education."
          />
        </div>
      </ScrollReveal>

      {/* Timeline Section */}
      <StaggerGrid className="max-w-4xl mx-auto space-y-8">
        {EDUCATION_DATA.map((edu, idx) => (
          <StaggerItem key={edu.id}>
            <div className="relative pl-8 sm:pl-10 group">
              {/* Timeline Vertical Line */}
              {idx < EDUCATION_DATA.length - 1 && (
                <div className="absolute left-3.5 top-8 bottom-0 w-0.5 bg-neutral-200 dark:bg-neutral-800" />
              )}

              {/* Timeline Dot */}
              <div className="absolute left-0 top-1.5 grid h-7 w-7 place-items-center rounded-full bg-peach-100 text-accent-ember border-2 border-white dark:border-canvas-charcoal dark:bg-peach-500/20 shadow-sm transition-transform duration-300 group-hover:scale-110">
                <GraduationCap className="h-3.5 w-3.5" />
              </div>

              {/* Content Card */}
              <Card variant="glass" className="space-y-4 p-6 sm:p-8 hover:-translate-y-1 transition-all duration-300 border border-neutral-200/70 dark:border-neutral-800">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h2 className="font-display text-xl font-bold text-foreground">
                      {edu.degree}
                    </h2>
                    <p className="text-sm font-semibold text-accent-ember">
                      {edu.institution} {edu.board && `(${edu.board})`}
                    </p>
                  </div>
                  <Badge variant="peach">{edu.statusBadge}</Badge>
                </div>

                {edu.department && (
                  <p className="text-xs font-mono text-foreground/60 flex items-center gap-1.5">
                    <BookOpen className="h-3.5 w-3.5 text-peach-500" />
                    Department: {edu.department}
                  </p>
                )}

                <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed">
                  {edu.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-neutral-200/60 dark:border-neutral-800 text-xs font-mono text-foreground/50">
                  <span>Duration: {edu.duration}</span>
                  {edu.gpa && (
                    <span className="flex items-center gap-1 text-foreground/80 font-semibold">
                      <Award className="h-3.5 w-3.5 text-accent-ember" />
                      Result: {edu.gpa}
                    </span>
                  )}
                </div>
              </Card>
            </div>
          </StaggerItem>
        ))}
      </StaggerGrid>

      {/* Diploma Curriculum Context Box */}
      <ScrollReveal variant="slide-up">
        <div className="max-w-4xl mx-auto rounded-3xl p-8 bg-warm-100/50 dark:bg-canvas-charcoal/50 border border-neutral-200/80 dark:border-neutral-800 space-y-4 shadow-sm">
          <div className="flex items-center gap-2 text-accent-ember">
            <CheckCircle2 className="h-5 w-5" />
            <h3 className="font-display text-base font-bold text-foreground">
              Technical Disciplines Covered in CST Diploma
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-foreground/70 leading-relaxed">
            The Computer Science &amp; Technology diploma curriculum at BTEB encompasses core software fundamentals: Algorithms, Data Structures, Relational Database Management (RDBMS), Operating Systems, Web Development, Object-Oriented Programming, and Computer Networking.
          </p>
          <div className="pt-2">
            <Link href="/experience">
              <Button variant="outline" size="sm" className="transition-transform duration-300 hover:scale-105">
                View Practical Experience
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
