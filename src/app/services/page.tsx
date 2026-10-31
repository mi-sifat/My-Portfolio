import React from "react";
import { ArrowUpRight, Check, Clock, MessageSquare, ShieldCheck, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ServiceCardBanner } from "@/components/services/ServiceCardBanner";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { StaggerGrid, StaggerItem } from "@/components/animations/StaggerGrid";
import { db } from "@/lib/db";
import { SERVICES_DATA } from "@/lib/portfolioData";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Professional Services — Majharul Islam Sifat",
  description: "Web development, e-commerce stores, portfolio websites, and video post-production services.",
};

export default async function ServicesPage() {
  let services: Array<{
    id: string;
    title: string;
    category?: string;
    shortDesc: string;
    pricing: string | null;
    deliveryTime: string | null;
    coverImageUrl: string | null;
    features: string[];
    deliverables: string[];
  }> = [];

  try {
    const raw = await db.service.findMany({
      where: { isPublished: true },
      include: { coverImage: true },
      orderBy: { order: "asc" },
    });

    if (raw.length > 0) {
      services = raw.map((s) => {
        let f: string[] = [];
        let d: string[] = [];
        try {
          f = typeof s.features === "string" ? JSON.parse(s.features) : s.features;
        } catch {
          f = [];
        }
        try {
          d = typeof s.deliverables === "string" ? JSON.parse(s.deliverables) : s.deliverables;
        } catch {
          d = [];
        }
        return {
          id: s.id,
          title: s.title,
          category: s.category || "Web Development",
          shortDesc: s.shortDesc,
          pricing: s.pricing,
          deliveryTime: s.deliveryTime,
          coverImageUrl: s.coverImageUrl || s.coverImage?.url || null,
          features: f,
          deliverables: d,
        };
      });
    }
  } catch (err) {
    console.error("DB query fallback:", err);
  }

  // Fallback to static data if database is empty
  if (services.length === 0) {
    services = SERVICES_DATA.map((s) => ({
      id: s.id,
      title: s.title,
      category: "Web Development",
      shortDesc: s.shortDesc,
      pricing: "Custom Scope",
      deliveryTime: s.estimatedDelivery || null,
      coverImageUrl: null,
      features: s.features,
      deliverables: s.deliverables,
    }));
  }

  return (
    <div className="space-y-24 pb-24 px-6 max-w-6xl mx-auto">
      {/* Header with Animation */}
      <ScrollReveal variant="slide-up">
        <div className="text-center space-y-4 pt-6">
          <SectionHeading
            badge="Client Solutions"
            title="Professional"
            italicWord="Services"
            subtitle="Modern web engineering, high-conversion e-commerce storefronts, and creative multimedia editing tailored to your brand."
          />
        </div>
      </ScrollReveal>

      {/* Services Grid with Staggered Entrance */}
      <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((service) => (
          <StaggerItem key={service.id}>
            <Card
              variant="glass"
              className="flex flex-col justify-between space-y-6 p-7 sm:p-8 h-full group hover:-translate-y-1.5 transition-all duration-300 border border-neutral-200/70 dark:border-neutral-800"
            >
              <div className="space-y-5">
                {/* Visual Service Banner */}
                <ServiceCardBanner
                  title={service.title}
                  category={service.category}
                  coverImageUrl={service.coverImageUrl}
                />

                <div className="flex items-center justify-between">
                  <Badge variant="peach">{service.category || "Available"}</Badge>
                  {service.deliveryTime && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono text-foreground/50">
                      <Clock className="h-3 w-3 text-peach-500" />
                      {service.deliveryTime}
                    </span>
                  )}
                </div>

                <div>
                  <h2 className="font-display text-2xl font-bold text-foreground group-hover:text-accent-ember transition-colors">
                    {service.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-foreground/70 leading-relaxed mt-2">
                    {service.shortDesc}
                  </p>
                </div>

                {/* Core Features */}
                <div className="space-y-2 pt-2 border-t border-neutral-200/60 dark:border-neutral-800">
                  <p className="text-[10px] font-mono uppercase tracking-wider text-foreground/45">
                    Key Features
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-xs text-foreground/80">
                        <Check className="h-3.5 w-3.5 text-accent-ember shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Deliverables */}
                {service.deliverables.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-neutral-200/60 dark:border-neutral-800">
                    <p className="text-[10px] font-mono uppercase tracking-wider text-foreground/45">
                      Deliverables
                    </p>
                    <ul className="space-y-1.5">
                      {service.deliverables.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-xs text-foreground/70">
                          <span className="h-1 w-1 rounded-full bg-peach-500" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Direct WhatsApp Action */}
              <div className="pt-4 border-t border-neutral-200/60 dark:border-neutral-800 space-y-2">
                <a
                  href={`https://wa.me/8801638090793?text=${encodeURIComponent(
                    `Hello Sifat, I would like to hire you for the "${service.title}" service. Let's discuss requirements.`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full block"
                >
                  <Button variant="primary" size="md" className="w-full">
                    Hire via WhatsApp
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </a>
                <p className="text-[10px] text-center text-foreground/45 font-mono">
                  {service.pricing || "Custom quotes based on exact specifications"}
                </p>
              </div>
            </Card>
          </StaggerItem>
        ))}
      </StaggerGrid>

      {/* Service Guarantee with ScrollReveal */}
      <ScrollReveal variant="slide-up">
        <div className="rounded-3xl p-8 bg-warm-100/60 dark:bg-canvas-charcoal/60 border border-neutral-200/80 dark:border-neutral-800 grid grid-cols-1 md:grid-cols-3 gap-6 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3.5">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-peach-100 text-peach-500 shrink-0">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <h3 className="font-display text-sm font-bold text-foreground">Clean, Maintainable Code</h3>
              <p className="text-xs text-foreground/60">Built on modern TypeScript and Next.js foundations without bloated libraries.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3.5">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-warm-200 text-canvas-dark shrink-0">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <h3 className="font-display text-sm font-bold text-foreground">Aesthetic Visual Design</h3>
              <p className="text-xs text-foreground/60">Editorial layouts, smooth transitions, and liquid glass interactions.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3.5">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-neutral-200 text-neutral-800 shrink-0">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <h3 className="font-display text-sm font-bold text-foreground">Direct Communication</h3>
              <p className="text-xs text-foreground/60">Transparent milestone updates, responsive WhatsApp feedback, and reliable delivery.</p>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
