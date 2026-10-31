"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Plus, Edit2, Trash2, Briefcase, Check, X } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface ExpItem {
  id: string;
  organization: string;
  role: string;
  type: string;
  startDate: string;
  endDate: string | null;
  isCurrent: boolean;
  description: string;
  responsibilities: string[];
  technologies: string[];
  order: number;
}

export default function AdminExperiencePage() {
  const [experiences, setExperiences] = useState<ExpItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingExp, setEditingExp] = useState<ExpItem | null>(null);

  const [form, setForm] = useState({
    organization: "",
    role: "",
    type: "PROFESSIONAL",
    startDate: "",
    endDate: "",
    isCurrent: false,
    description: "",
    responsibilities: "",
    technologies: "",
    order: 0,
  });

  const fetchExperiences = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/experience");
      const data = await res.json();
      if (data.success) {
        setExperiences(data.experiences);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExperiences();
  }, [fetchExperiences]);

  const openCreateModal = () => {
    setEditingExp(null);
    setForm({
      organization: "",
      role: "",
      type: "PROFESSIONAL",
      startDate: "2024",
      endDate: "",
      isCurrent: true,
      description: "",
      responsibilities: "",
      technologies: "Next.js, TypeScript, Tailwind",
      order: experiences.length,
    });
    setModalOpen(true);
  };

  const openEditModal = (exp: ExpItem) => {
    setEditingExp(exp);
    setForm({
      organization: exp.organization,
      role: exp.role,
      type: exp.type,
      startDate: exp.startDate,
      endDate: exp.endDate || "",
      isCurrent: exp.isCurrent,
      description: exp.description,
      responsibilities: Array.isArray(exp.responsibilities) ? exp.responsibilities.join("\n") : "",
      technologies: Array.isArray(exp.technologies) ? exp.technologies.join(", ") : "",
      order: exp.order,
    });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = editingExp ? "PUT" : "POST";
      const payload = {
        ...(editingExp ? { id: editingExp.id } : {}),
        ...form,
        order: Number(form.order),
      };

      const res = await fetch("/api/admin/experience", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        setModalOpen(false);
        fetchExperiences();
      } else {
        alert(data.message || "Failed to save experience");
      }
    } catch {
      alert("Error saving experience");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this experience record?")) return;
    try {
      const res = await fetch("/api/admin/experience", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        setExperiences((prev) => prev.filter((e) => e.id !== id));
      }
    } catch {
      alert("Failed to delete experience");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Badge variant="peach">Career & Learning</Badge>
          <h1 className="font-display text-2xl font-bold text-foreground mt-1">
            Work Experience & Roles ({experiences.length})
          </h1>
          <p className="text-xs text-foreground/60">
            Maintain your engineering roles, freelance history, and industry industrial attachments.
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={openCreateModal}>
          <Plus className="h-4 w-4" />
          <span>Add Experience</span>
        </Button>
      </div>

      {loading ? (
        <Card variant="glass" className="p-8 text-center text-xs text-foreground/50">
          Loading experiences...
        </Card>
      ) : (
        <div className="space-y-4">
          {experiences.map((exp) => (
            <Card
              key={exp.id}
              variant="glass"
              className="p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4 border border-neutral-200/80 dark:border-neutral-800"
            >
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-peach-100 dark:bg-peach-900/40 text-accent-ember font-semibold">
                    {exp.type}
                  </span>
                  <span className="text-xs font-mono text-foreground/50">
                    {exp.startDate} – {exp.isCurrent ? "Present" : exp.endDate}
                  </span>
                </div>
                <h3 className="font-display text-base font-bold text-foreground">
                  {exp.role}
                </h3>
                <p className="text-xs font-semibold text-foreground/75">
                  {exp.organization}
                </p>
                <p className="text-xs text-foreground/60 leading-relaxed mt-1">
                  {exp.description}
                </p>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openEditModal(exp)}
                  className="h-8 px-2.5 text-xs"
                >
                  <Edit2 className="h-3 w-3" />
                  <span>Edit</span>
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleDelete(exp.id)}
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
                <Briefcase className="h-5 w-5 text-accent-ember" />
                <h2 className="font-display text-lg font-bold text-foreground">
                  {editingExp ? "Edit Experience" : "Add Experience"}
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
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-mono text-foreground/70 uppercase">Role / Title</label>
                  <input
                    type="text"
                    required
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    placeholder="Junior Software Engineer"
                    className="w-full px-3 py-2 rounded-xl bg-warm-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-foreground text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-foreground/70 uppercase">Company / Organization</label>
                  <input
                    type="text"
                    required
                    value={form.organization}
                    onChange={(e) => setForm({ ...form, organization: e.target.value })}
                    placeholder="Archgig"
                    className="w-full px-3 py-2 rounded-xl bg-warm-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-foreground text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-mono text-foreground/70 uppercase">Start Date</label>
                  <input
                    type="text"
                    required
                    value={form.startDate}
                    onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                    placeholder="e.g. 2024"
                    className="w-full px-3 py-2 rounded-xl bg-warm-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-foreground text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-foreground/70 uppercase">End Date</label>
                  <input
                    type="text"
                    disabled={form.isCurrent}
                    value={form.endDate}
                    onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                    placeholder="Present or Year"
                    className="w-full px-3 py-2 rounded-xl bg-warm-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-foreground text-xs disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="currentRole"
                  checked={form.isCurrent}
                  onChange={(e) => setForm({ ...form, isCurrent: e.target.checked })}
                  className="h-4 w-4 rounded accent-accent-ember"
                />
                <label htmlFor="currentRole" className="font-medium text-foreground cursor-pointer">
                  Currently Working in this Position
                </label>
              </div>

              <div className="space-y-1">
                <label className="font-mono text-foreground/70 uppercase">Description</label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Key accomplishments and technologies used..."
                  className="w-full px-3 py-2 rounded-xl bg-warm-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-foreground text-xs resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-200 dark:border-neutral-800">
                <Button variant="secondary" size="sm" type="button" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit">
                  <Check className="h-4 w-4" />
                  <span>{editingExp ? "Update" : "Save"}</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
