"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Download, MessageSquare, Terminal } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { PROFILE_DATA } from "@/lib/portfolioData";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { ParallaxHero } from "@/components/animations/ParallaxHero";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative px-6 pt-12 sm:pt-20 lg:pt-24 max-w-6xl mx-auto overflow-hidden">
      {/* Background Decorative Ambient Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-peach-200/40 via-warm-100/50 to-transparent blur-3xl -z-10 rounded-full dark:from-peach-500/10 dark:via-canvas-charcoal/50" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Headline, Bio & CTAs */}
        <div className="lg:col-span-7 space-y-6 text-left">
          {/* Live Status Pill */}
          <ScrollReveal variant="slide-down" delay={0.1}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-peach-100 text-canvas-dark border border-peach-200/80 text-xs font-semibold dark:bg-peach-500/10 dark:text-peach-200 dark:border-peach-500/20 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-accent-ember animate-pulse" />
              <span>Junior Software Engineer at Archgig</span>
            </div>
          </ScrollReveal>

          {/* Oversized Editorial Headline */}
          <ScrollReveal variant="slide-up" delay={0.2} duration={0.65}>
            <h1 className="font-display text-4xl sm:text-6xl lg:text-[4rem] font-extrabold tracking-tight text-foreground leading-[1.08]">
              Crafting software &amp;{" "}
              <span className="font-serif italic font-normal text-peach-500 dark:text-peach-400">
                creative digital
              </span>{" "}
              journeys.
            </h1>
          </ScrollReveal>

          {/* Authentic Biography */}
          <ScrollReveal variant="slide-up" delay={0.3} duration={0.6}>
            <p className="text-base sm:text-lg text-foreground/75 max-w-xl font-sans leading-relaxed">
              I am <strong className="text-foreground font-semibold">Majharul Islam Sifat</strong>. An 8th Semester CST Diploma student, MERN developer, and content creator dedicated to building dependable web platforms and engaging visual stories.
            </p>
          </ScrollReveal>

          {/* Primary Action Buttons */}
          <ScrollReveal variant="slide-up" delay={0.4}>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link href="/projects">
                <Button size="lg" variant="primary" className="transition-transform duration-300 hover:scale-[1.02]">
                  View Projects
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="glass" className="transition-transform duration-300 hover:scale-[1.02]">
                  <MessageSquare className="h-4 w-4 text-accent-ember" />
                  Contact Me
                </Button>
              </Link>
              <a
                href="mailto:majharulislamsifat93@gmail.com?subject=Inquiry%20from%20Portfolio"
                className="inline-flex items-center justify-center p-3 rounded-full border border-neutral-300/80 hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800 transition-all duration-300 hover:scale-105"
                title="Download CV / Direct Inquiry"
              >
                <Download className="h-4 w-4 text-foreground/70" />
              </a>
            </div>
          </ScrollReveal>

          {/* Verified Quick Highlights Grid */}
          <ScrollReveal variant="fade" delay={0.5}>
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-neutral-200/70 dark:border-neutral-800 max-w-lg">
              <div>
                <p className="font-display text-2xl font-extrabold text-foreground tracking-tight">v1.1.2</p>
                <p className="text-xs text-foreground/55 font-medium mt-0.5">Voice-to-Text App</p>
              </div>
              <div>
                <p className="font-display text-2xl font-extrabold text-foreground tracking-tight">8th Sem</p>
                <p className="text-xs text-foreground/55 font-medium mt-0.5">Diploma in CST</p>
              </div>
              <div>
                <p className="font-display text-2xl font-extrabold text-foreground tracking-tight">4+ Videos</p>
                <p className="text-xs text-foreground/55 font-medium mt-0.5">Food &amp; Tour Vlogs</p>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Right Column: Authentic Personal Portrait Composition with Parallax */}
        <div className="lg:col-span-5 flex justify-center">
          <ParallaxHero offset={25} className="w-full max-w-[380px]">
            <ScrollReveal variant="scale-up" delay={0.25} duration={0.7}>
              <div className="relative w-full">
                {/* Background Graphic Box Layer */}
                <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-3xl bg-peach-200/50 dark:bg-canvas-charcoal border border-peach-200/40 -z-10 transition-transform duration-500" />

                {/* Main Portrait Card */}
                <div className="glass-card rounded-3xl p-4 sm:p-5 relative overflow-hidden group border border-white/60 dark:border-white/10 shadow-xl transition-shadow duration-500 hover:shadow-2xl">
                  <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-warm-100 dark:bg-neutral-900">
                    <Image
                      src={PROFILE_DATA.heroPortrait}
                      alt="Majharul Islam Sifat — Studio Portrait"
                      fill
                      sizes="(max-width: 768px) 100vw, 420px"
                      priority
                      className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                  </div>

                  {/* Floating Live Badge Layer */}
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-display text-sm font-bold text-foreground">
                        Majharul Islam Sifat
                      </h3>
                      <p className="text-xs text-foreground/60 flex items-center gap-1 mt-0.5">
                        <Terminal className="h-3 w-3 text-peach-500" />
                        Dhaka, Bangladesh
                      </p>
                    </div>
                    <Badge variant="peach">Available for Hire</Badge>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </ParallaxHero>
        </div>
      </div>
    </section>
  );
};

