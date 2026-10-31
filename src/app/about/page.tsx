import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Compass, Laptop, ShoppingBag, Target, Eye } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { PROFILE_DATA } from "@/lib/portfolioData";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { StaggerGrid, StaggerItem } from "@/components/animations/StaggerGrid";

export const metadata = {
  title: "About Me — Majharul Islam Sifat",
  description: "Learn about Majharul Islam Sifat: background, journey into technology, software engineering, and creative vision.",
};

export default function AboutPage() {
  return (
    <div className="space-y-24 pb-24 px-6 max-w-6xl mx-auto">
      {/* Header */}
      <ScrollReveal variant="slide-up">
        <div className="text-center space-y-4 pt-6">
          <SectionHeading
            badge="Personal Story & Vision"
            title="The Story Behind the"
            italicWord="Developer & Creator"
            subtitle="How curiosity, family encouragement, and hands-on experiments shaped my engineering and creative journey."
          />
        </div>
      </ScrollReveal>

      {/* Hero Biography Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Full Standing Portrait */}
        <div className="lg:col-span-5 flex justify-center">
          <ScrollReveal variant="scale-up" delay={0.1}>
            <div className="relative w-full max-w-sm rounded-3xl overflow-hidden glass-card p-3 border border-neutral-200/70 dark:border-neutral-800 shadow-xl group hover:shadow-2xl transition-all duration-500">
              <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-warm-100 dark:bg-canvas-charcoal">
                <Image
                  src={PROFILE_DATA.aboutPortrait}
                  alt="Majharul Islam Sifat — Full Body Portrait"
                  fill
                  sizes="(max-width: 768px) 100vw, 420px"
                  priority
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-4 text-center space-y-1">
                <h3 className="font-display text-base font-bold text-foreground">Majharul Islam Sifat</h3>
                <p className="text-xs text-foreground/60 font-mono">Junior Software Engineer · CST Diploma</p>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Narrative Biography */}
        <div className="lg:col-span-7 space-y-6">
          <ScrollReveal variant="slide-left" delay={0.15}>
            <div className="space-y-4">
              <Badge variant="peach">Introduction</Badge>
              <h2 className="font-display text-3xl font-bold text-foreground leading-tight">
                Driven by curiosity, grounded in continuous practical learning.
              </h2>
              <p className="text-sm sm:text-base text-foreground/75 leading-relaxed">
                I am a Junior Software Engineer and Diploma candidate in Computer Science &amp; Technology (CST), currently in my 8th Semester. My focus revolves around building clean, responsive full-stack applications, robust desktop utilities, and expressive digital media.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="slide-up" delay={0.25}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white/60 dark:bg-canvas-charcoal/60 border border-neutral-200/70 dark:border-neutral-800 space-y-1 hover:border-peach-400 transition-colors">
                <p className="text-xs font-mono text-foreground/45 uppercase tracking-wider">Current Role</p>
                <p className="font-display text-sm font-bold text-foreground">Junior Software Engineer</p>
                <p className="text-xs text-accent-ember font-medium">Archgig</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/60 dark:bg-canvas-charcoal/60 border border-neutral-200/70 dark:border-neutral-800 space-y-1 hover:border-peach-400 transition-colors">
                <p className="text-xs font-mono text-foreground/45 uppercase tracking-wider">Education</p>
                <p className="font-display text-sm font-bold text-foreground">Diploma in Engineering (CST)</p>
                <p className="text-xs text-peach-500 font-medium">8th Semester (Ongoing)</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Detailed Journey Milestones */}
      <div className="space-y-10">
        <ScrollReveal variant="slide-up">
          <SectionHeading
            badge="Step-by-Step Evolution"
            title="Milestones of My"
            italicWord="Journey"
            subtitle="An honest breakdown of the events that brought me to where I am today."
            align="left"
          />
        </ScrollReveal>

        <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StaggerItem>
            <Card variant="glass" className="space-y-4 h-full border border-neutral-200/70 dark:border-neutral-800 group hover:-translate-y-1 transition-transform">
              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-peach-100 text-accent-ember dark:bg-peach-500/20">
                <Compass className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground">1. The Spark &amp; Creative Roots</h3>
              <p className="text-xs text-foreground/70 leading-relaxed">
                My technology journey began with encouragement from my cousin, <strong>Al Masum Bhai</strong>. His advice prompted me to dive into digital creation. I started exploring video recording, video editing, thumbnail crafting, and visual styling, developing an acute eye for visual details.
              </p>
            </Card>
          </StaggerItem>

          <StaggerItem>
            <Card variant="glass" className="space-y-4 h-full border border-neutral-200/70 dark:border-neutral-800 group hover:-translate-y-1 transition-transform">
              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-warm-200 text-canvas-dark dark:bg-neutral-800 dark:text-peach-200">
                <Laptop className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground">2. Engineering &amp; Programming</h3>
              <p className="text-xs text-foreground/70 leading-relaxed">
                Enrolling in Diploma in Engineering (CST) introduced me to the world of software development. I transitioned from visual editing to writing code, mastering JavaScript, PHP, MySQL, and modern frameworks. This passion led to real software initiatives like the <strong>Voice-to-Text v1.1.2</strong> Windows app.
              </p>
            </Card>
          </StaggerItem>

          <StaggerItem>
            <Card variant="glass" className="space-y-4 h-full border border-neutral-200/70 dark:border-neutral-800 group hover:-translate-y-1 transition-transform">
              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-neutral-200 text-neutral-800 dark:bg-neutral-800 dark:text-white">
                <ShoppingBag className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground">3. Real-world Business &amp; Operations</h3>
              <p className="text-xs text-foreground/70 leading-relaxed">
                Working alongside <strong>Men&apos;s Outfit</strong>, an apparel business belonging to my paternal cousin, opened my eyes to the commercial side of technology. I gained firsthand experience with online order processing, digital marketing, and the real mechanics of e-commerce storefronts.
              </p>
            </Card>
          </StaggerItem>
        </StaggerGrid>
      </div>

      {/* Goals & Future Vision */}
      <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <StaggerItem>
          <Card variant="glass" className="space-y-4 p-8 border border-peach-200/60 dark:border-neutral-800 h-full">
            <div className="flex items-center gap-2 text-peach-500">
              <Target className="h-5 w-5" />
              <h3 className="font-display text-lg font-bold text-foreground">Current Goals</h3>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-foreground/75">
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-peach-500 mt-2 shrink-0" />
                Complete my CST Diploma in Engineering with outstanding academic proficiency.
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-peach-500 mt-2 shrink-0" />
                Deepen production software engineering skills at Archgig across full-stack architectures.
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-peach-500 mt-2 shrink-0" />
                Enhance MERN stack capabilities and release practical open-source developer tools.
              </li>
            </ul>
          </Card>
        </StaggerItem>

        <StaggerItem>
          <Card variant="glass" className="space-y-4 p-8 border border-neutral-200/80 dark:border-neutral-800 h-full">
            <div className="flex items-center gap-2 text-accent-ember">
              <Eye className="h-5 w-5" />
              <h3 className="font-display text-lg font-bold text-foreground">Future Vision</h3>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-foreground/75">
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-ember mt-2 shrink-0" />
                Evolve into a versatile Software Architect creating impactful digital consumer products.
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-ember mt-2 shrink-0" />
                Expand my content creation platform with high-value travel vlogs and educational tech tutorials.
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-ember mt-2 shrink-0" />
                Launch sustainable digital software products addressing everyday productivity challenges.
              </li>
            </ul>
          </Card>
        </StaggerItem>
      </StaggerGrid>

      {/* Navigation CTA */}
      <ScrollReveal variant="slide-up">
        <div className="text-center pt-8">
          <Link href="/projects">
            <Button variant="primary" size="lg" className="transition-transform duration-300 hover:scale-105">
              Explore My Projects Portfolio
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </ScrollReveal>
    </div>
  );
}
