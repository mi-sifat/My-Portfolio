"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Plus, Edit2, Trash2, Award, Check, X } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface AchievementItem {
  id: string;
  title: string;
  organization: string;
  issueDate: string | null;
  category: string;
  description: string | null;
  order: number;
}

export default function AdminAchievementsPage() {
  const [achievements, setAchievements] = useState<AchievementItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAch, setEditingAch] = useState<AchievementItem | null>(null);

  const [form, setForm] = useState({
    title: "",
    organization: "",
    issueDate: "",
    category: "Certificate",
    description: "",
    order: 0,
  });

  const fetchAchievements = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/achievements");
      const data = await res.json();
      if (data.success) {
        setAchievements(data.achievements);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAchievements();
  }, [fetchAchievements]);

  const openCreateModal = () => {
    setEditingAch(null);
    setForm({
      title: "",
      organization: "",
      issueDate: "2024",
      category: "Certificate",
      description: "",
      order: achievements.length,
    });
    setModalOpen(true);
  };

  const openEditModal = (ach: AchievementItem) => {
    setEditingAch(ach);
    setForm({
      title: ach.title,
      organization: ach.organization,
      issueDate: ach.issueDate || "",
      category: ach.category,
      description: ach.description || "",
      order: ach.order,
    });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = editingAch ? "PUT" : "POST";
      const payload = {
        ...(editingAch ? { id: editingAch.id } : {}),
        ...form,
        order: Number(form.order),
      };

      const res = await fetch("/api/admin/achievements", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        setModalOpen(false);
        fetchAchievements();
      } else {
        alert(data.message || "Failed to save achievement");
      }
    } catch {
      alert("Error saving achievement");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this achievement?")) return;
    try {
      const res = await fetch("/api/admin/achievements", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        setAchievements((prev) => prev.filter((a) => a.id !== id));
      }
    } catch {
      alert("Failed to delete achievement");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Badge variant="peach">Recognition & Honors</Badge>
          <h1 className="font-display text-2xl font-bold text-foreground mt-1">
            Certifications & Awards ({achievements.length})
          </h1>
          <p className="text-xs text-foreground/60">
            Professional certifications, programming recognitions, and competitive milestones.
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={openCreateModal}>
          <Plus className="h-4 w-4" />
          <span>Add Certificate</span>
        </Button>
      </div>

      {loading ? (
        <Card variant="glass" className="p-8 text-center text-xs text-foreground/50">
          Loading achievements...
        </Card>
      ) : (
        <div className="space-y-4">
          {achievements.map((ach) => (
            <Card
              key={ach.id}
              variant="glass"
              className="p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4 border border-neutral-200/80 dark:border-neutral-800"
            >
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-peach-100 dark:bg-peach-900/40 text-accent-ember font-semibold">
                    {ach.category}
                  </span>
                  <span className="text-xs font-mono text-foreground/50">
                    {ach.issueDate}
                  </span>
                </div>
                <h3 className="font-display text-base font-bold text-foreground">
                  {ach.title}
                </h3>
                <p className="text-xs font-semibold text-foreground/75">
                  {ach.organization}
                </p>
                {ach.description && (
                  <p className="text-xs text-foreground/60 leading-relaxed mt-1">
                    {ach.description}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openEditModal(ach)}
                  className="h-8 px-2.5 text-xs"
                >
                  <Edit2 className="h-3 w-3" />
                  <span>Edit</span>
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleDelete(ach.id)}
                  className="h-8 px-2 text-red-500 hover:text-red-600 hover:bg-red-500/10"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Modal Form for Create / Edit */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white dark:bg-canvas-charcoal rounded-3xl p-6 sm:p-8 shadow-2xl border border-neutral-200 dark:border-neutral-800 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-accent-ember" />
                <h2 className="font-display text-lg font-bold text-foreground">
                  {editingAch ? "Edit Achievement" : "Add Achievement"}
                </h2>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-xl text-foreground/50 hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-mono text-foreground/70 uppercase">Title / Honor</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Full-Stack Web Development Certificate"
                  className="w-full px-3 py-2 rounded-xl bg-warm-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-foreground text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-mono text-foreground/70 uppercase">Issuing Organization</label>
                  <input
                    type="text"
                    required
                    value={form.organization}
                    onChange={(e) => setForm({ ...form, organization: e.target.value })}
                    placeholder="e.g. Programming Hero, BTEB"
                    className="w-full px-3 py-2 rounded-xl bg-warm-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-foreground text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-foreground/70 uppercase">Date / Year</label>
                  <input
                    type="text"
                    value={form.issueDate}
                    onChange={(e) => setForm({ ...form, issueDate: e.target.value })}
                    placeholder="e.g. 2024"
                    className="w-full px-3 py-2 rounded-xl bg-warm-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-foreground text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-mono text-foreground/70 uppercase">Description</label>
                <textarea
                  rows={2}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Verification link or brief summary..."
                  className="w-full px-3 py-2 rounded-xl bg-warm-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-foreground text-xs resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-200 dark:border-neutral-800">
                <Button variant="secondary" size="sm" type="button" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit">
                  <Check className="h-4 w-4" />
                  <span>{editingAch ? "Update" : "Save"}</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
