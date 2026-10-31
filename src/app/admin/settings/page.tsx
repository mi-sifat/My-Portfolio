"use client";

import React, { useState, useEffect } from "react";
import { Check, Save } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [form, setForm] = useState({
    siteName: "",
    metaTitle: "",
    metaDesc: "",
    keywords: "",
    footerText: "",
  });

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch("/api/admin/settings");
        const data = await res.json();
        if (data.success && data.settings) {
          setForm({
            siteName: data.settings.siteName || "",
            metaTitle: data.settings.metaTitle || "",
            metaDesc: data.settings.metaDesc || "",
            keywords: data.settings.keywords || "",
            footerText: data.settings.footerText || "",
          });
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (data.success) {
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3500);
      } else {
        alert(data.message || "Failed to update settings");
      }
    } catch {
      alert("Error saving settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Card variant="glass" className="p-8 text-center text-xs text-foreground/50">
        Loading settings...
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Badge variant="peach">Configuration</Badge>
          <h1 className="font-display text-2xl font-bold text-foreground mt-1">
            Platform Settings & SEO
          </h1>
          <p className="text-xs text-foreground/60">
            Control global title tags, search engine indexing descriptions, and footer text.
          </p>
        </div>

        {savedSuccess && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
            <Check className="h-4 w-4" />
            <span>Settings Saved!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="max-w-3xl space-y-5">
        <Card variant="glass" className="p-6 sm:p-8 space-y-4 border border-neutral-200/80 dark:border-neutral-800">
          <div className="space-y-1">
            <label className="text-xs font-mono text-foreground/70 uppercase">Website Brand Name</label>
            <input
              type="text"
              required
              value={form.siteName}
              onChange={(e) => setForm({ ...form, siteName: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/70 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-sm font-semibold text-foreground"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono text-foreground/70 uppercase">SEO Meta Title</label>
            <input
              type="text"
              required
              value={form.metaTitle}
              onChange={(e) => setForm({ ...form, metaTitle: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/70 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs text-foreground"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono text-foreground/70 uppercase">SEO Meta Description</label>
            <textarea
              rows={3}
              required
              value={form.metaDesc}
              onChange={(e) => setForm({ ...form, metaDesc: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/70 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs text-foreground leading-relaxed resize-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono text-foreground/70 uppercase">Search Keywords (Comma Separated)</label>
            <input
              type="text"
              value={form.keywords}
              onChange={(e) => setForm({ ...form, keywords: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/70 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs text-foreground font-mono"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono text-foreground/70 uppercase">Footer Copyright Text</label>
            <input
              type="text"
              value={form.footerText}
              onChange={(e) => setForm({ ...form, footerText: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/70 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs text-foreground"
            />
          </div>

          <div className="pt-3">
            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={saving}
            >
              <Save className="h-4 w-4" />
              <span>{saving ? "Saving..." : "Save Settings"}</span>
            </Button>
          </div>
        </Card>
      </form>
    </div>
  );
}
