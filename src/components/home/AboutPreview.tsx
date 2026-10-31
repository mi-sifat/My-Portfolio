import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Compass, Laptop, ShoppingBag } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { PROFILE_DATA } from "@/lib/portfolioData";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

export const AboutPreview: React.FC = () => {
  return (
    <section className="px-6 max-w-6xl mx-auto space-y-12">
      <ScrollReveal variant="slide-up">
        <SectionHeading
          badge="About The Journey"
          title="From Curiosity to"
          italicWord="Software Craftsmanship"
          subtitle="A quick glance at how advice from family sparked a passion for development, creative design, and digital business."
        />
      </ScrollReveal>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Authentic Standing Portrait */}
        <div className="lg:col-span-5 flex justify-center">
          <ScrollReveal variant="scale-up" delay={0.15}>
            <div className="relative w-full max-w-sm rounded-3xl overflow-hidden glass-card p-3 border border-neutral-200/60 dark:border-neutral-800 shadow-lg group hover:shadow-xl transition-shadow duration-300">
              <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-warm-100 dark:bg-canvas-charcoal">
                <Image
                  src={PROFILE_DATA.aboutPortrait}
                  alt="Majharul Islam Sifat — Full Body Portrait"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-3 text-center">
                <p className="font-display text-xs font-semibold uppercase tracking-wider text-foreground/50">
                  Diploma Student &amp; Junior Engineer
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Right: Narrative Story Cards */}
        <div className="lg:col-span-7 space-y-5">
          <ScrollReveal variant="slide-left" delay={0.1}>
            <Card variant="glass" className="space-y-3 hover:translate-x-1 transition-all duration-300">
              <div className="flex items-center gap-2.5 text-accent-ember">
                <Compass className="h-5 w-5" />
                <h3 className="font-display text-base font-bold text-foreground">
                  How It Began
                </h3>
              </div>
              <p className="text-sm text-foreground/75 leading-relaxed">
                My path into Computer Science and Technology began with guidance and encouragement from my cousin, <strong>Al Masum Bhai</strong>. Starting out with video creation, thumbnail design, and visual aesthetics, I discovered the power of crafting digital media.
              </p>
            </Card>
          </ScrollReveal>

          <ScrollReveal variant="slide-left" delay={0.2}>
            <Card variant="glass" className="space-y-3 hover:translate-x-1 transition-all duration-300">
              <div className="flex items-center gap-2.5 text-peach-500">
                <Laptop className="h-5 w-5" />
                <h3 className="font-display text-base font-bold text-foreground">
                  Programming &amp; Engineering Focus
                </h3>
              </div>
              <p className="text-sm text-foreground/75 leading-relaxed">
                During my Diploma in Engineering studies, programming opened up an entirely new horizon. I transitioned into building real-world software, currently working as a <strong>Junior Software Engineer at Archgig</strong> and mastering the MERN stack.
              </p>
            </Card>
          </ScrollReveal>

          <ScrollReveal variant="slide-left" delay={0.3}>
            <Card variant="glass" className="space-y-3 hover:translate-x-1 transition-all duration-300">
              <div className="flex items-center gap-2.5 text-warm-500">
                <ShoppingBag className="h-5 w-5" />
                <h3 className="font-display text-base font-bold text-foreground">
                  Digital Business Insight
                </h3>
              </div>
              <p className="text-sm text-foreground/75 leading-relaxed">
                Working with <strong>Men&apos;s Outfit</strong>, a clothing enterprise belonging to my cousin, gave me hands-on practical insight into online store workflows, customer fulfillment, and e-commerce platform mechanics.
              </p>
            </Card>
          </ScrollReveal>

          {/* Action to Dedicated Page */}
          <ScrollReveal variant="slide-up" delay={0.35}>
            <div className="pt-2">
              <Link href="/about">
                <Button variant="secondary" size="md">
                  Read Full Biography &amp; Vision
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

