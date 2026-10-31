"use client";

import React, { useState } from "react";
import { Mail, MessageCircle, MapPin, Send, CheckCircle2, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { PROFILE_DATA } from "@/lib/portfolioData";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setStatus("error");
        setErrorMessage(data.message || "Failed to submit message. Please try again.");
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("Network error occurred. Please contact directly via WhatsApp.");
    }
  };

  return (
    <div className="space-y-24 pb-24 px-6 max-w-6xl mx-auto">
      {/* Header */}
      <ScrollReveal variant="slide-up">
        <div className="text-center space-y-4 pt-6">
          <SectionHeading
            badge="Direct Communication"
            title="Let's Start a"
            italicWord="Conversation"
            subtitle="Have a project in mind, an engineering collaboration, or a YouTube inquiry? Reach out directly via WhatsApp or the contact form."
          />
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Contact Information & Direct Channels (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <ScrollReveal variant="slide-right" delay={0.1}>
            <div className="space-y-3">
              <Badge variant="peach">Contact Channels</Badge>
              <h2 className="font-display text-2xl font-bold text-foreground">
                Always Open for Meaningful Collaborations
              </h2>
              <p className="text-xs sm:text-sm text-foreground/70 leading-relaxed">
                I respond promptly to professional software inquiries, e-commerce web projects, and creative content creation opportunities.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="slide-right" delay={0.2}>
            <div className="space-y-4">
              {/* WhatsApp Card */}
              <a
                href={`https://wa.me/8801638090793?text=${encodeURIComponent("Hello Sifat, I found your portfolio and would like to connect.")}`}
                target="_blank"
                rel="noreferrer"
                className="block group"
              >
                <Card variant="glass" className="p-5 flex items-center justify-between border border-emerald-500/20 group-hover:border-emerald-500/40 transition-all duration-300 hover:scale-[1.02]">
                  <div className="flex items-center gap-3.5">
                    <div className="grid h-10 w-10 place-items-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      <MessageCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-mono text-foreground/45 uppercase tracking-wider">Direct WhatsApp</p>
                      <p className="font-display text-sm font-bold text-foreground">{PROFILE_DATA.whatsapp}</p>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-emerald-600 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Card>
              </a>

              {/* Email Card */}
              <a
                href={`mailto:${PROFILE_DATA.email}`}
                className="block group"
              >
                <Card variant="glass" className="p-5 flex items-center justify-between group-hover:border-accent-ember/40 transition-all duration-300 hover:scale-[1.02]">
                  <div className="flex items-center gap-3.5">
                    <div className="grid h-10 w-10 place-items-center rounded-2xl bg-peach-100 text-accent-ember dark:bg-peach-500/10">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-mono text-foreground/45 uppercase tracking-wider">Email Address</p>
                      <p className="font-display text-xs sm:text-sm font-bold text-foreground truncate max-w-[200px] sm:max-w-none">
                        {PROFILE_DATA.email}
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-accent-ember transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Card>
              </a>

              {/* Location Card */}
              <Card variant="glass" className="p-5 flex items-center gap-3.5">
                <div className="grid h-10 w-10 place-items-center rounded-2xl bg-warm-200 text-canvas-dark dark:bg-neutral-800 dark:text-peach-200">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-mono text-foreground/45 uppercase tracking-wider">Location</p>
                  <p className="font-display text-sm font-bold text-foreground">{PROFILE_DATA.location}</p>
                </div>
              </Card>
            </div>
          </ScrollReveal>
        </div>

        {/* Functional Contact Form (7 cols) */}
        <div className="lg:col-span-7">
          <ScrollReveal variant="slide-left" delay={0.15}>
            <Card variant="glass" className="p-7 sm:p-10 border border-neutral-200/80 dark:border-neutral-800 shadow-xl">
              {status === "success" ? (
                <div className="text-center py-12 space-y-4">
                  <div className="grid h-14 w-14 place-items-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mx-auto">
                    <CheckCircle2 className="h-7 w-7" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground">
                    Thank You, {formData.name || "Friend"}!
                  </h3>
                  <p className="text-xs sm:text-sm text-foreground/70 max-w-md mx-auto leading-relaxed">
                    Your message draft has been received and saved to database. You can also send this directly via WhatsApp for the fastest reply:
                  </p>
                  <div className="pt-2">
                    <a
                      href={`https://wa.me/8801638090793?text=${encodeURIComponent(`Hi Sifat, my name is ${formData.name} (${formData.email}). Subject: ${formData.subject}. Message: ${formData.message}`)}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Button variant="primary" size="md">
                        Send via WhatsApp
                        <ArrowUpRight className="h-4 w-4" />
                      </Button>
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-1">
                    <h3 className="font-display text-xl font-bold text-foreground">
                      Send a Message
                    </h3>
                    <p className="text-xs text-foreground/60">
                      Fill out the form below and I will get back to you as soon as possible.
                    </p>
                  </div>

                  {status === "error" && (
                    <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-600 dark:text-red-400">
                      {errorMessage}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-foreground/70 uppercase tracking-wider">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Al Masum"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-2xl bg-white/70 dark:bg-canvas-charcoal/70 border border-neutral-200/80 dark:border-neutral-800 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-peach-500/50"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-foreground/70 uppercase tracking-wider">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-2xl bg-white/70 dark:bg-canvas-charcoal/70 border border-neutral-200/80 dark:border-neutral-800 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-peach-500/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-foreground/70 uppercase tracking-wider">
                      Subject
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Project inquiry / Collaboration"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-2xl bg-white/70 dark:bg-canvas-charcoal/70 border border-neutral-200/80 dark:border-neutral-800 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-peach-500/50"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-foreground/70 uppercase tracking-wider">
                      Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Describe your project, timeline, or requirements..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-white/70 dark:bg-canvas-charcoal/70 border border-neutral-200/80 dark:border-neutral-800 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-peach-500/50 resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    variant="primary"
                    className="w-full transition-transform duration-300 hover:scale-[1.01]"
                    disabled={status === "sending"}
                  >
                    {status === "sending" ? "Preparing Message..." : "Submit Message"}
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              )}
            </Card>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
