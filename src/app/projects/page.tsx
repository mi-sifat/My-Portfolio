"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { ArrowUpRight, ExternalLink, Code2, Layers, Cpu, Smartphone, Search, X, FolderGit2 } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ProjectCardBanner } from "@/components/projects/ProjectCardBanner";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { StaggerGrid, StaggerItem } from "@/components/animations/StaggerGrid";

interface ProjectItem {
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
  isFeatured: boolean;
  order: number;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        if (data.success && Array.isArray(data.projects)) {
          setProjects(data.projects);
        }
      } catch (err) {
        console.error("Failed to load projects from DB:", err);
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);

  // Compute dynamic category pills from live database projects
  const categories = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return ["All", ...Array.from(set)];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        selectedCategory === "All" || project.category === selectedCategory;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        project.title.toLowerCase().includes(q) ||
        project.shortDesc.toLowerCase().includes(q) ||
        project.technologies.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [projects, selectedCategory, searchQuery]);

  return (
    <div className="space-y-16 pb-24 px-6 max-w-6xl mx-auto">
      {/* Header with ScrollReveal */}
      <ScrollReveal variant="slide-up">
        <div className="text-center space-y-4 pt-6">
          <SectionHeading
            badge="Engineering Portfolio"
            title="Featured Software &"
            italicWord="Applications"
            subtitle="Explore functional software systems spanning Windows desktop utilities, live e-commerce, Android apps, and IoT concepts."
          />
        </div>
      </ScrollReveal>

      {/* Interactive Controls: Search & Category Filter */}
      <ScrollReveal variant="fade" delay={0.15}>
        <div className="space-y-4 max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 justify-center sm:justify-start">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-300 ${
                    selectedCategory === cat
                      ? "bg-canvas-dark text-white dark:bg-white dark:text-neutral-900 shadow-md scale-105 font-bold"
                      : "bg-white/80 dark:bg-canvas-charcoal/80 text-foreground/70 hover:text-foreground border border-neutral-200/80 dark:border-neutral-800"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Real-time Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-foreground/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by tech or title..."
                className="w-full pl-9 pr-8 py-1.5 rounded-full bg-white/80 dark:bg-canvas-charcoal/80 border border-neutral-200/80 dark:border-neutral-800 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-peach-500/50 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Projects Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className="h-96 rounded-3xl bg-neutral-200/40 dark:bg-neutral-800/40 animate-pulse border border-neutral-200/60 dark:border-neutral-800"
            />
          ))}
        </div>
      ) : filteredProjects.length === 0 ? (
        <Card variant="glass" className="p-12 text-center space-y-3">
          <FolderGit2 className="h-10 w-10 text-foreground/40 mx-auto" />
          <p className="text-sm text-foreground/60">
            No projects matched &quot;{searchQuery || selectedCategory}&quot;.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
            }}
          >
            Clear Filters
          </Button>
        </Card>
      ) : (
        <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <StaggerItem key={project.id}>
              <Card
                variant="glass"
                className="flex flex-col justify-between space-y-5 p-6 sm:p-7 group hover:-translate-y-1.5 transition-all duration-300 border border-neutral-200/70 dark:border-neutral-800"
              >
                <div className="space-y-4">
                  {/* Visual Project Banner */}
                  <ProjectCardBanner
                    title={project.title}
                    category={project.category}
                    technologies={project.technologies}
                    coverImageUrl={project.coverImageUrl}
                  />

                  {/* Category & Status */}
                  <div className="flex items-center justify-between">
                    <Badge variant="neutral">
                      {project.category === "Software Development" && <Code2 className="h-3 w-3" />}
                      {project.category === "E-commerce" && <Layers className="h-3 w-3" />}
                      {project.category === "Android" && <Smartphone className="h-3 w-3" />}
                      {project.category === "IoT" && <Cpu className="h-3 w-3" />}
                      {project.category}
                    </Badge>
                    <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-peach-100 text-canvas-dark dark:bg-peach-500/20 dark:text-peach-200 font-semibold">
                      {project.status}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h2 className="font-display text-xl font-bold text-foreground group-hover:text-accent-ember transition-colors">
                    {project.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-foreground/70 leading-relaxed">
                    {project.shortDesc}
                  </p>

                  {/* Technology Tags */}
                  <div className="space-y-1.5 pt-2">
                    <p className="text-[10px] font-mono uppercase tracking-wider text-foreground/45">
                      Tech Stack
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((t) => (
                        <span
                          key={t}
                          className="text-xs px-2.5 py-1 rounded-md bg-white dark:bg-canvas-charcoal border border-neutral-200/80 dark:border-neutral-800 text-foreground/75 font-mono"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Bar */}
                <div className="flex items-center gap-3 pt-4 border-t border-neutral-200/60 dark:border-neutral-800">
                  {project.liveDemoUrl && (
                    <a
                      href={project.liveDemoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-ember hover:underline"
                    >
                      Live Demo
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground/70 hover:text-foreground"
                    >
                      <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        />
                      </svg>
                      Repository
                    </a>
                  )}
                  <span className="ml-auto text-xs text-foreground/45 font-mono">
                    #{project.slug}
                  </span>
                </div>
              </Card>
            </StaggerItem>
          ))}
        </StaggerGrid>
      )}

      {/* CTA Box */}
      <ScrollReveal variant="slide-up">
        <div className="rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-peach-100/80 via-warm-100/50 to-peach-50 dark:from-canvas-charcoal dark:via-neutral-900 dark:to-neutral-900 border border-peach-200/80 dark:border-neutral-800 text-center space-y-4">
          <h3 className="font-display text-2xl font-bold text-foreground">
            Have a custom software or web platform in mind?
          </h3>
          <p className="text-xs sm:text-sm text-foreground/70 max-w-lg mx-auto">
            From responsive e-commerce storefronts to Windows tools and full-stack web applications, I can engineer your solution.
          </p>
          <div className="pt-2">
            <Link href="/contact">
              <Button size="lg" variant="primary">
                Discuss Your Project
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
