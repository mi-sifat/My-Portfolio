"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Code2, Palette, ExternalLink, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ProjectCardBanner } from "@/components/projects/ProjectCardBanner";
import { ServiceCardBanner } from "@/components/services/ServiceCardBanner";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { StaggerGrid, StaggerItem } from "@/components/animations/StaggerGrid";
import {
  SKILLS_DATA,
  EDUCATION_DATA,
  EXPERIENCE_DATA,
  YOUTUBE_VIDEOS,
  ACHIEVEMENTS_DATA,
} from "@/lib/portfolioData";

export interface HomeProject {
  id: string;
  slug: string;
  title: string;
  category: string;
  shortDesc: string;
  technologies: string[];
  status: string;
  liveDemoUrl: string | null;
  githubUrl: string | null;
  coverImageUrl: string | null;
}

export interface HomeService {
  id: string;
  slug: string;
  title: string;
  category?: string;
  shortDesc: string;
  pricing: string | null;
  deliveryTime: string | null;
  features: string[];
  coverImageUrl: string | null;
}

interface HomeSectionPreviewsProps {
  projects?: HomeProject[];
  services?: HomeService[];
}

export const HomeSectionPreviews: React.FC<HomeSectionPreviewsProps> = ({
  projects = [],
  services = [],
}) => {
  return (
    <div className="space-y-32">
      {/* 1. SKILLS OVERVIEW */}
      <section className="px-6 max-w-6xl mx-auto space-y-10">
        <ScrollReveal variant="slide-up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <SectionHeading
              badge="Technical & Creative Stack"
              title="Skills &amp;"
              italicWord="Capabilities"
              subtitle="Honest proficiency levels across web development, database systems, and multimedia editing."
              align="left"
            />
            <Link href="/skills">
              <Button variant="outline" size="sm" className="transition-transform duration-300 hover:scale-[1.02]">
                View Detailed Skills Matrix
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </ScrollReveal>

        <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Development Stack Card */}
          <StaggerItem>
            <Card variant="glass" className="space-y-4 h-full border border-neutral-200/80 dark:border-neutral-800">
              <div className="flex items-center gap-2 pb-2 border-b border-neutral-200/60 dark:border-neutral-800">
                <Code2 className="h-5 w-5 text-accent-ember" />
                <h3 className="font-display text-base font-bold text-foreground">
                  Development &amp; Engineering
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {SKILLS_DATA.filter((s) => s.category === "Development").map((skill) => (
                  <div
                    key={skill.id}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-canvas-charcoal border border-neutral-200/80 dark:border-neutral-800 text-xs transition-transform duration-300 hover:scale-105"
                  >
                    <span className="font-medium text-foreground">{skill.name}</span>
                    <span className="text-[10px] text-foreground/45 uppercase tracking-wider font-mono">
                      {skill.level}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </StaggerItem>

          {/* Creative Multimedia Card */}
          <StaggerItem>
            <Card variant="glass" className="space-y-4 h-full border border-neutral-200/80 dark:border-neutral-800">
              <div className="flex items-center gap-2 pb-2 border-b border-neutral-200/60 dark:border-neutral-800">
                <Palette className="h-5 w-5 text-peach-500" />
                <h3 className="font-display text-base font-bold text-foreground">
                  Creative &amp; Multimedia Production
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {SKILLS_DATA.filter((s) => s.category === "Creative").map((skill) => (
                  <div
                    key={skill.id}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-canvas-charcoal border border-neutral-200/80 dark:border-neutral-800 text-xs transition-transform duration-300 hover:scale-105"
                  >
                    <span className="font-medium text-foreground">{skill.name}</span>
                    <span className="text-[10px] text-peach-500 dark:text-peach-400 uppercase tracking-wider font-mono">
                      {skill.level}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </StaggerItem>
        </StaggerGrid>
      </section>

      {/* 2. EDUCATION & EXPERIENCE PREVIEWS */}
      <section className="px-6 max-w-6xl mx-auto space-y-10">
        <ScrollReveal variant="slide-up">
          <SectionHeading
            badge="Timeline & Background"
            title="Education &amp;"
            italicWord="Professional Journey"
            subtitle="Combining academic study in Computer Science with real-world software engineering at Archgig."
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Education Timeline Column */}
          <ScrollReveal variant="slide-right" delay={0.1}>
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2">
                <h3 className="font-display text-lg font-bold text-foreground">
                  Academic Background
                </h3>
                <Link href="/education" className="text-xs text-foreground/60 hover:text-foreground flex items-center gap-1">
                  Full Records <ArrowUpRight className="h-3 w-3" />
                </Link>
              </div>
              <div className="space-y-4">
                {EDUCATION_DATA.map((edu) => (
                  <Card key={edu.id} variant="glass" className="p-5 space-y-2 border border-neutral-200/70 dark:border-neutral-800">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-display text-sm font-bold text-foreground">
                        {edu.degree}
                      </h4>
                      <Badge variant="peach">{edu.statusBadge}</Badge>
                    </div>
                    <p className="text-xs text-foreground/70 font-medium">
                      {edu.institution} {edu.board && `· ${edu.board}`}
                    </p>
                    <p className="text-xs text-foreground/60 leading-relaxed">
                      {edu.description}
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Experience Column */}
          <ScrollReveal variant="slide-left" delay={0.1}>
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2">
                <h3 className="font-display text-lg font-bold text-foreground">
                  Professional &amp; Training
                </h3>
                <Link href="/experience" className="text-xs text-foreground/60 hover:text-foreground flex items-center gap-1">
                  Full Records <ArrowUpRight className="h-3 w-3" />
                </Link>
              </div>
              <div className="space-y-4">
                {EXPERIENCE_DATA.map((exp) => (
                  <Card key={exp.id} variant="glass" className="p-5 space-y-2 border border-neutral-200/70 dark:border-neutral-800">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-display text-sm font-bold text-foreground">
                        {exp.role} · <span className="text-accent-ember">{exp.organization}</span>
                      </h4>
                      <span className="text-[11px] font-mono text-foreground/50">{exp.duration}</span>
                    </div>
                    <p className="text-xs text-foreground/60 leading-relaxed">
                      {exp.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {exp.technologies.map((tech) => (
                        <span key={tech} className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-foreground/60 font-mono">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 3. FEATURED PROJECTS SHOWCASE (DATABASE-DRIVEN WITH VISUAL BANNERS) */}
      <section className="px-6 max-w-6xl mx-auto space-y-10">
        <ScrollReveal variant="slide-up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <SectionHeading
              badge="Engineering Portfolio"
              title="Featured"
              italicWord="Software Projects"
              subtitle="Real-world applications spanning desktop utilities, e-commerce, and Android systems."
              align="left"
            />
            <Link href="/projects">
              <Button variant="primary" size="sm" className="transition-transform duration-300 hover:scale-[1.02]">
                Explore All Projects
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </ScrollReveal>

        <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.slice(0, 3).map((project) => (
            <StaggerItem key={project.id}>
              <Card
                variant="glass"
                className="flex flex-col justify-between space-y-4 h-full group hover:-translate-y-1.5 transition-all duration-300 border border-neutral-200/70 dark:border-neutral-800"
              >
                <div className="space-y-3">
                  {/* Visual Project Banner */}
                  <ProjectCardBanner
                    title={project.title}
                    category={project.category}
                    technologies={project.technologies}
                    coverImageUrl={project.coverImageUrl}
                  />

                  <div className="flex items-center justify-between">
                    <Badge variant="neutral">{project.category}</Badge>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-peach-100 text-canvas-dark dark:bg-peach-500/20 dark:text-peach-200 font-semibold">
                      {project.status}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-foreground group-hover:text-accent-ember transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-xs text-foreground/65 leading-relaxed line-clamp-3">
                    {project.shortDesc}
                  </p>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {project.technologies.slice(0, 3).map((t) => (
                      <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-white dark:bg-canvas-charcoal border border-neutral-200/60 dark:border-neutral-800 text-foreground/60 font-mono">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Links */}
                <div className="flex items-center gap-3 pt-3 border-t border-neutral-200/50 dark:border-neutral-800">
                  {project.liveDemoUrl && (
                    <a
                      href={project.liveDemoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-accent-ember hover:underline"
                    >
                      Live Demo <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-foreground/60 hover:text-foreground"
                    >
                      <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                      </svg>
                      Source
                    </a>
                  )}
                  <Link
                    href="/projects"
                    className="ml-auto text-xs text-foreground/50 hover:text-foreground"
                  >
                    Details &rarr;
                  </Link>
                </div>
              </Card>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </section>

      {/* 4. YOUTUBE & CREATIVE CONTENT PREVIEW */}
      <section className="px-6 max-w-6xl mx-auto space-y-10">
        <ScrollReveal variant="slide-up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <SectionHeading
              badge="Content Creator"
              title="Travel, Food &amp;"
              italicWord="Vlog Journeys"
              subtitle="Authentic culinary expeditions and scenic resort documentation from my verified YouTube channel."
              align="left"
            />
            <a
              href="https://www.youtube.com/channel/UCD8FOEQ-yTH19DMjZkwSCLw"
              target="_blank"
              rel="noreferrer"
            >
              <Button variant="secondary" size="sm" className="transition-transform duration-300 hover:scale-[1.02]">
                <svg className="h-4 w-4 fill-red-600" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                Visit YouTube Channel
              </Button>
            </a>
          </div>
        </ScrollReveal>

        <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {YOUTUBE_VIDEOS.map((video) => (
            <StaggerItem key={video.id}>
              <Card variant="glass" className="p-3 space-y-3 flex flex-col justify-between group h-full border border-neutral-200/70 dark:border-neutral-800">
                <div>
                  <a href={video.youtubeUrl} target="_blank" rel="noreferrer" className="block relative aspect-video w-full rounded-2xl overflow-hidden bg-neutral-900">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={video.thumbnailUrl}
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                    <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] text-white font-mono">
                      {video.category}
                    </div>
                  </a>
                  <h4 className="font-display text-xs font-bold text-foreground mt-3 line-clamp-2">
                    {video.title}
                  </h4>
                </div>
                <a
                  href={video.youtubeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-accent-ember hover:underline pt-2 border-t border-neutral-200/50 dark:border-neutral-800"
                >
                  Watch on YouTube <ExternalLink className="h-3 w-3" />
                </a>
              </Card>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </section>

      {/* 5. SERVICES & PRODUCTS PREVIEW (DATABASE-DRIVEN WITH BANNERS) */}
      <section className="px-6 max-w-6xl mx-auto space-y-10">
        <ScrollReveal variant="slide-up">
          <SectionHeading
            badge="Marketplace & Offerings"
            title="Digital Services &amp;"
            italicWord="Products"
            subtitle="Explore available freelance solutions and upcoming software tools."
          />
        </ScrollReveal>

        <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.slice(0, 3).map((service) => (
            <StaggerItem key={service.id}>
              <Card
                variant="glass"
                className="flex flex-col justify-between space-y-4 h-full group hover:-translate-y-1.5 transition-all duration-300 border border-neutral-200/70 dark:border-neutral-800"
              >
                <div className="space-y-3">
                  <ServiceCardBanner
                    title={service.title}
                    category={service.category}
                    coverImageUrl={service.coverImageUrl}
                  />

                  <Badge variant="peach">{service.category || "Service Offering"}</Badge>
                  <h3 className="font-display text-base font-bold text-foreground group-hover:text-accent-ember transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-foreground/65 leading-relaxed line-clamp-3">
                    {service.shortDesc}
                  </p>
                  <ul className="space-y-1.5 pt-1">
                    {service.features.slice(0, 3).map((f) => (
                      <li key={f} className="text-xs text-foreground/75 flex items-center gap-2">
                        <span className="h-1 w-1 rounded-full bg-peach-500" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-neutral-200/50 dark:border-neutral-800">
                  <a
                    href={`https://wa.me/8801638090793?text=${encodeURIComponent(`Hi Sifat, I am interested in your ${service.title} service.`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full block"
                  >
                    <Button variant="primary" size="sm" className="w-full">
                      Order via WhatsApp
                    </Button>
                  </a>
                </div>
              </Card>
            </StaggerItem>
          ))}
        </StaggerGrid>

        {/* Digital Products Teaser Card */}
        <ScrollReveal variant="scale-up">
          <div className="rounded-3xl border border-neutral-200/70 dark:border-neutral-800 bg-peach-50/50 dark:bg-canvas-charcoal/50 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-accent-ember font-mono">
                <Sparkles className="h-3.5 w-3.5" />
                Digital Products Marketplace
              </span>
              <h3 className="font-display text-xl font-bold text-foreground">
                Planned &amp; In-Development Digital Assets
              </h3>
              <p className="text-xs sm:text-sm text-foreground/70 max-w-xl">
                Future standalone desktop utilities and creator template packs. No artificial pricing or fake purchase buttons are listed.
              </p>
            </div>
            <Link href="/products">
              <Button variant="glass" size="md" className="transition-transform duration-300 hover:scale-[1.02]">
                View Product Roadmap
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* 6. ACHIEVEMENTS PREVIEW */}
      <section className="px-6 max-w-6xl mx-auto space-y-10">
        <ScrollReveal variant="slide-up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <SectionHeading
              badge="Verified Milestones"
              title="Achievements &amp;"
              italicWord="Recognition"
              subtitle="Documented milestones from academic examinations and independent software engineering."
              align="left"
            />
            <Link href="/achievements">
              <Button variant="outline" size="sm" className="transition-transform duration-300 hover:scale-[1.02]">
                View All Milestones
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </ScrollReveal>

        <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ACHIEVEMENTS_DATA.map((item) => (
            <StaggerItem key={item.id}>
              <Card variant="glass" className="space-y-3 h-full border border-neutral-200/70 dark:border-neutral-800">
                <Badge variant="neutral">{item.statusLabel}</Badge>
                <h3 className="font-display text-sm font-bold text-foreground">
                  {item.title}
                </h3>
                <p className="text-xs text-foreground/50 font-medium">
                  {item.organization}
                </p>
                <p className="text-xs text-foreground/65 leading-relaxed">
                  {item.description}
                </p>
              </Card>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </section>

      {/* 7. CONTACT CALL-TO-ACTION SECTION */}
      <section className="px-6 max-w-5xl mx-auto">
        <ScrollReveal variant="scale-up">
          <div className="glass-card rounded-4xl p-8 sm:p-12 text-center space-y-6 border border-peach-200/50 dark:border-white/10 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-peach-200/30 dark:bg-peach-500/10 blur-3xl -z-10 rounded-full" />
            
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-peach-100 text-canvas-dark border border-peach-200 dark:bg-peach-500/20 dark:text-peach-200">
              Let&apos;s Build Together
            </span>

            <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground max-w-2xl mx-auto leading-tight">
              Have a project in mind or want to collaborate?
            </h2>

            <p className="text-sm sm:text-base text-foreground/70 max-w-xl mx-auto leading-relaxed">
              Whether you need a full-stack web application, an e-commerce platform, or creative multimedia editing, my inbox and WhatsApp are always open.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <a
                href={`https://wa.me/8801638090793?text=${encodeURIComponent("Hello Sifat, I reviewed your website and would like to discuss a project.")}`}
                target="_blank"
                rel="noreferrer"
              >
                <Button size="lg" variant="primary" className="transition-transform duration-300 hover:scale-105">
                  Direct WhatsApp Message
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </a>
              <Link href="/contact">
                <Button size="lg" variant="glass" className="transition-transform duration-300 hover:scale-105">
                  Contact Form
                </Button>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};
