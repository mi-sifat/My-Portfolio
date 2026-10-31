"use client";

import React, { useState, useEffect } from "react";
import { Check, Save, Lock, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Site settings
  const [form, setForm] = useState({
    siteName: "",
    metaTitle: "",
    metaDesc: "",
    keywords: "",
    footerText: "",
  });

  // Password change
  const [pwForm, setPwForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pwSaving, setPwSaving] = useState(false);
  const [pwSuccess, setPwSuccess] = useState(false);
  const [pwError, setPwError] = useState<string | null>(null);

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

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwError(null);
    setPwSuccess(false);

    if (pwForm.newPassword !== pwForm.confirmPassword) {
      setPwError("নতুন password দুটো মিলছে না।");
      return;
    }
    if (pwForm.newPassword.length < 8) {
      setPwError("নতুন password কমপক্ষে ৮ অক্ষরের হতে হবে।");
      return;
    }

    setPwSaving(true);
    try {
      const res = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: pwForm.currentPassword,
          newPassword: pwForm.newPassword,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setPwSuccess(true);
        setPwForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
        setTimeout(() => setPwSuccess(false), 4000);
      } else {
        setPwError(data.message || "Password পরিবর্তন ব্যর্থ হয়েছে।");
      }
    } catch {
      setPwError("Server error. আবার চেষ্টা করো।");
    } finally {
      setPwSaving(false);
    }
  };

  if (loading) {
    return (
      <Card variant="glass" className="p-8 text-center text-xs text-foreground/50">
        Loading settings...
      </Card>
    );
  }

  const inputClass =
    "w-full px-3.5 py-2.5 rounded-xl bg-white/70 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ember/40";

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Badge variant="peach">Configuration</Badge>
          <h1 className="font-display text-2xl font-bold text-foreground mt-1">
            Platform Settings
          </h1>
          <p className="text-xs text-foreground/60">
            Global SEO, footer text, and account security settings.
          </p>
        </div>
        {savedSuccess && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
            <Check className="h-4 w-4" />
            <span>Settings Saved!</span>
          </div>
        )}
      </div>

      {/* ── SEO Settings ── */}
      <form onSubmit={handleSubmit} className="max-w-3xl space-y-5">
        <Card variant="glass" className="p-6 sm:p-8 space-y-4 border border-neutral-200/80 dark:border-neutral-800">
          <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
            <Save className="h-4 w-4 text-ember" /> SEO &amp; Site Identity
          </h2>

          <div className="space-y-1">
            <label className="text-xs font-mono text-foreground/70 uppercase">Website Brand Name</label>
            <input
              type="text"
              required
              value={form.siteName}
              onChange={(e) => setForm({ ...form, siteName: e.target.value })}
              className={inputClass}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono text-foreground/70 uppercase">SEO Meta Title</label>
            <input
              type="text"
              required
              value={form.metaTitle}
              onChange={(e) => setForm({ ...form, metaTitle: e.target.value })}
              className={inputClass}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono text-foreground/70 uppercase">SEO Meta Description</label>
            <textarea
              rows={3}
              required
              value={form.metaDesc}
              onChange={(e) => setForm({ ...form, metaDesc: e.target.value })}
              className={`${inputClass} resize-none`}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono text-foreground/70 uppercase">Search Keywords (Comma Separated)</label>
            <input
              type="text"
              value={form.keywords}
              onChange={(e) => setForm({ ...form, keywords: e.target.value })}
              className={`${inputClass} font-mono`}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono text-foreground/70 uppercase">Footer Copyright Text</label>
            <input
              type="text"
              value={form.footerText}
              onChange={(e) => setForm({ ...form, footerText: e.target.value })}
              className={inputClass}
            />
          </div>

          <div className="pt-3">
            <Button type="submit" variant="primary" size="md" disabled={saving}>
              <Save className="h-4 w-4" />
              <span>{saving ? "Saving..." : "Save Settings"}</span>
            </Button>
          </div>
        </Card>
      </form>

      {/* ── Change Password ── */}
      <form onSubmit={handlePasswordChange} className="max-w-3xl">
        <Card variant="glass" className="p-6 sm:p-8 space-y-4 border border-neutral-200/80 dark:border-neutral-800">
          <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-ember" /> Change Admin Password
          </h2>

          {/* Current Password */}
          <div className="space-y-1">
            <label className="text-xs font-mono text-foreground/70 uppercase">Current Password</label>
            <div className="relative">
              <input
                type={showCurrent ? "text" : "password"}
                required
                value={pwForm.currentPassword}
                onChange={(e) => setPwForm({ ...pwForm, currentPassword: e.target.value })}
                placeholder="বর্তমান password দাও"
                className={`${inputClass} pr-10`}
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground"
              >
                {showCurrent ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div className="space-y-1">
            <label className="text-xs font-mono text-foreground/70 uppercase">New Password</label>
            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                required
                minLength={8}
                value={pwForm.newPassword}
                onChange={(e) => setPwForm({ ...pwForm, newPassword: e.target.value })}
                placeholder="নতুন password (কমপক্ষে ৮ অক্ষর)"
                className={`${inputClass} pr-10`}
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground"
              >
                {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-1">
            <label className="text-xs font-mono text-foreground/70 uppercase">Confirm New Password</label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                required
                value={pwForm.confirmPassword}
                onChange={(e) => setPwForm({ ...pwForm, confirmPassword: e.target.value })}
                placeholder="নতুন password আবার দাও"
                className={`${inputClass} pr-10`}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground"
              >
                {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Error / Success */}
          {pwError && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs">
              {pwError}
            </div>
          )}
          {pwSuccess && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
              <Check className="h-4 w-4" />
              Password সফলভাবে পরিবর্তন হয়েছে!
            </div>
          )}

          <div className="pt-3">
            <Button type="submit" variant="primary" size="md" disabled={pwSaving}>
              <Lock className="h-4 w-4" />
              <span>{pwSaving ? "Updating..." : "Change Password"}</span>
            </Button>
          </div>
        </Card>
      </form>
    </div>
  );
}
