import React from "react";
import Link from "next/link";
import { ArrowUpRight, Clock, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { PRODUCTS_DATA } from "@/lib/portfolioData";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { StaggerGrid, StaggerItem } from "@/components/animations/StaggerGrid";

export const metadata = {
  title: "Digital Products Marketplace — Majharul Islam Sifat",
  description: "Future software tools, desktop utilities, and digital assets roadmap.",
};

export default function ProductsPage() {
  return (
    <div className="space-y-24 pb-24 px-6 max-w-6xl mx-auto">
      {/* Header */}
      <ScrollReveal variant="slide-up">
        <div className="text-center space-y-4 pt-6">
          <SectionHeading
            badge="Product Roadmap"
            title="Digital Products &amp;"
            italicWord="Software Tools"
            subtitle="A transparent overview of planned and in-development software products. No artificial prices or fake purchase checkouts."
          />
        </div>
      </ScrollReveal>

      {/* Honest Status Banner */}
      <ScrollReveal variant="fade" delay={0.1}>
        <div className="rounded-3xl p-6 bg-peach-50/60 dark:bg-canvas-charcoal/60 border border-peach-200/60 dark:border-neutral-800 flex items-start gap-3.5 max-w-3xl mx-auto shadow-sm">
          <AlertCircle className="h-5 w-5 text-accent-ember shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h3 className="font-display text-sm font-bold text-foreground">
              Marketplace Transparency Notice
            </h3>
            <p className="text-xs text-foreground/70 leading-relaxed">
              There are currently no finished commercial products ready for instant download or sale. All entries below represent active engineering concepts or planned templates. Real purchase flows and payment gateways will only be enabled after final testing.
            </p>
          </div>
        </div>
      </ScrollReveal>

      {/* Products Grid */}
      <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {PRODUCTS_DATA.map((product) => (
          <StaggerItem key={product.id}>
            <Card variant="glass" className="space-y-6 p-7 sm:p-8 flex flex-col justify-between h-full border border-neutral-200/70 dark:border-neutral-800 hover:-translate-y-1.5 transition-all duration-300">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="neutral">{product.category}</Badge>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-peach-100 text-canvas-dark dark:bg-peach-500/20 dark:text-peach-200 text-xs font-semibold font-mono">
                    <Clock className="h-3 w-3 text-peach-500" />
                    {product.status}
                  </span>
                </div>

                <div>
                  <h2 className="font-display text-2xl font-bold text-foreground">
                    {product.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-foreground/70 leading-relaxed mt-2">
                    {product.shortDesc}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-neutral-200/60 dark:border-neutral-800">
                  <p className="text-[10px] font-mono uppercase tracking-wider text-foreground/45">
                    Planned Capabilities
                  </p>
                  <ul className="space-y-1.5">
                    {product.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-xs text-foreground/75">
                        <span className="h-1 w-1 rounded-full bg-accent-ember" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-200/60 dark:border-neutral-800 flex items-center justify-between">
                <span className="text-xs font-mono text-foreground/50">
                  Status: In Roadmap
                </span>
                <Link href="/contact">
                  <Button variant="outline" size="sm" className="transition-transform duration-300 hover:scale-105">
                    Notify Me on Release
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>
            </Card>
          </StaggerItem>
        ))}
      </StaggerGrid>

      {/* Suggest a Product Idea */}
      <ScrollReveal variant="slide-up">
        <div className="text-center space-y-4 max-w-xl mx-auto pt-6">
          <h3 className="font-display text-xl font-bold text-foreground">
            Have an idea for a Windows tool or developer starter kit?
          </h3>
          <p className="text-xs sm:text-sm text-foreground/65">
            I am always open to feedback on software utilities that solve real-world productivity problems.
          </p>
          <Link href="/contact">
            <Button variant="primary" size="md" className="transition-transform duration-300 hover:scale-105">
              Submit a Tool Proposal
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </ScrollReveal>
    </div>
  );
}
