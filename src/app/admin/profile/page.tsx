"use client";

import React, { useState, useEffect } from "react";
import { User, Phone, Mail, MapPin, Check, Save } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export default function AdminProfilePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    tagline: "",
    shortBio: "",
    aboutIntro: "",
    aboutStory: "",
    email: "",
    whatsapp: "",
    location: "",
    resumeUrl: "",
  });

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await fetch("/api/admin/profile");
        const data = await res.json();
        if (data.success && data.profile) {
          setForm({
            fullName: data.profile.fullName || "",
            tagline: data.profile.tagline || "",
            shortBio: data.profile.shortBio || "",
            aboutIntro: data.profile.aboutIntro || "",
            aboutStory: data.profile.aboutStory || "",
            email: data.profile.email || "",
            whatsapp: data.profile.whatsapp || "",
            location: data.profile.location || "",
            resumeUrl: data.profile.resumeUrl || "",
          });
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);

    try {
      const res = await fetch("/api/admin/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (data.success) {
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3500);
      } else {
        alert(data.message || "Failed to update profile");
      }
    } catch {
      alert("Error saving profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Card variant="glass" className="p-8 text-center text-xs text-foreground/50">
        Loading profile information...
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Badge variant="peach">Identity & Branding</Badge>
          <h1 className="font-display text-2xl font-bold text-foreground mt-1">
            Personal Profile & Bio
          </h1>
          <p className="text-xs text-foreground/60">
            Edit your official titles, headlines, contact numbers, and public narrative.
          </p>
        </div>

        {savedSuccess && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
            <Check className="h-4 w-4" />
            <span>Profile Saved to Database!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Info (8 cols) */}
          <div className="lg:col-span-8 space-y-5">
            <Card variant="glass" className="p-6 sm:p-8 space-y-4 border border-neutral-200/80 dark:border-neutral-800">
              <h2 className="font-display text-base font-bold text-foreground flex items-center gap-2">
                <User className="h-4 w-4 text-accent-ember" />
                Public Narrative & Headings
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-foreground/70 uppercase">Full Name</label>
                  <input
                    type="text"
                    required
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/70 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-sm font-semibold text-foreground"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-foreground/70 uppercase">Headline / Tagline</label>
                  <input
                    type="text"
                    required
                    value={form.tagline}
                    onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/70 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-sm text-foreground"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-foreground/70 uppercase">Short Bio (Hero section)</label>
                <textarea
                  rows={2}
                  value={form.shortBio}
                  onChange={(e) => setForm({ ...form, shortBio: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/70 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs text-foreground leading-relaxed resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-foreground/70 uppercase">About Intro</label>
                <textarea
                  rows={3}
                  value={form.aboutIntro}
                  onChange={(e) => setForm({ ...form, aboutIntro: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/70 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs text-foreground leading-relaxed resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-foreground/70 uppercase">Full Professional Story</label>
                <textarea
                  rows={5}
                  value={form.aboutStory}
                  onChange={(e) => setForm({ ...form, aboutStory: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/70 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs text-foreground leading-relaxed resize-none"
                />
              </div>
            </Card>
          </div>

          {/* Contact Details (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <Card variant="glass" className="p-6 space-y-4 border border-neutral-200/80 dark:border-neutral-800">
              <h2 className="font-display text-base font-bold text-foreground">
                Official Channels
              </h2>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-foreground/70 uppercase flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-accent-ember" />
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white/70 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs text-foreground"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-foreground/70 uppercase flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5 text-emerald-500" />
                  WhatsApp Number
                </label>
                <input
                  type="text"
                  required
                  value={form.whatsapp}
                  onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white/70 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs text-foreground"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-foreground/70 uppercase flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-neutral-400" />
                  Location
                </label>
                <input
                  type="text"
                  required
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white/70 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs text-foreground"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-foreground/70 uppercase">
                  Resume / CV Link
                </label>
                <input
                  type="text"
                  value={form.resumeUrl}
                  onChange={(e) => setForm({ ...form, resumeUrl: e.target.value })}
                  placeholder="https://drive.google.com/..."
                  className="w-full px-3 py-2 rounded-xl bg-white/70 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs text-foreground"
                />
              </div>
            </Card>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              disabled={saving}
            >
              <Save className="h-4 w-4" />
              <span>{saving ? "Saving Changes..." : "Save Profile"}</span>
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
