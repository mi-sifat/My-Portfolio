"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Plus, Edit2, Trash2, Cpu, Check, X } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface SkillItem {
  id: string;
  name: string;
  category: "DEVELOPMENT" | "CREATIVE" | "TOOLS";
  level: string;
  order: number;
  isPublished: boolean;
}

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState<SkillItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string>("ALL");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<SkillItem | null>(null);

  const [form, setForm] = useState({
    name: "",
    category: "DEVELOPMENT" as "DEVELOPMENT" | "CREATIVE" | "TOOLS",
    level: "Proficient",
    order: 0,
    isPublished: true,
  });

  const fetchSkills = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/skills");
      const data = await res.json();
      if (data.success) {
        setSkills(data.skills);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  const openCreateModal = () => {
    setEditingSkill(null);
    setForm({
      name: "",
      category: "DEVELOPMENT",
      level: "Proficient",
      order: skills.length,
      isPublished: true,
    });
    setModalOpen(true);
  };

  const openEditModal = (skill: SkillItem) => {
    setEditingSkill(skill);
    setForm({
      name: skill.name,
      category: skill.category,
      level: skill.level,
      order: skill.order,
      isPublished: skill.isPublished,
    });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = editingSkill ? "PUT" : "POST";
      const payload = {
        ...(editingSkill ? { id: editingSkill.id } : {}),
        ...form,
        order: Number(form.order),
      };

      const res = await fetch("/api/admin/skills", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        setModalOpen(false);
        fetchSkills();
      } else {
        alert(data.message || "Failed to save skill");
      }
    } catch {
      alert("Error saving skill");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this skill?")) return;
    try {
      const res = await fetch("/api/admin/skills", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        setSkills((prev) => prev.filter((s) => s.id !== id));
      }
    } catch {
      alert("Failed to delete skill");
    }
  };

  const filteredSkills =
    activeFilter === "ALL"
      ? skills
      : skills.filter((s) => s.category === activeFilter);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Badge variant="peach">Stack Inventory</Badge>
          <h1 className="font-display text-2xl font-bold text-foreground mt-1">
            Technical & Creative Skills ({skills.length})
          </h1>
          <p className="text-xs text-foreground/60">
            Organize languages, frameworks, developer tools, and video editing proficiencies.
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={openCreateModal}>
          <Plus className="h-4 w-4" />
          <span>Add Skill</span>
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-2">
        {["ALL", "DEVELOPMENT", "CREATIVE", "TOOLS"].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-colors ${
              activeFilter === cat
                ? "bg-accent-ember text-white font-semibold shadow-sm"
                : "text-foreground/60 hover:text-foreground hover:bg-warm-100 dark:hover:bg-neutral-800"
            }`}
          >
            {cat === "ALL" ? `All (${skills.length})` : cat}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      {loading ? (
        <Card variant="glass" className="p-8 text-center text-xs text-foreground/50">
          Loading skills...
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredSkills.map((skill) => (
            <Card
              key={skill.id}
              variant="glass"
              className="p-4 flex flex-col justify-between space-y-3 border border-neutral-200/80 dark:border-neutral-800"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-warm-100 dark:bg-neutral-800 text-foreground/60">
                    {skill.category}
                  </span>
                  <span className="text-[10px] font-mono text-accent-ember font-bold">
                    {skill.level}
                  </span>
                </div>
                <h3 className="font-display text-base font-bold text-foreground mt-2">
                  {skill.name}
                </h3>
              </div>

              <div className="pt-2 border-t border-neutral-200/60 dark:border-neutral-800/60 flex items-center justify-between">
                <span className="text-[10px] font-mono text-foreground/40">
                  Order: {skill.order}
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => openEditModal(skill)}
                    className="p-1 rounded-md text-foreground/50 hover:text-accent-ember hover:bg-warm-100 dark:hover:bg-neutral-800"
                    title="Edit"
                  >
                    <Edit2 className="h-3 w-3" />
                  </button>
                  <button
                    onClick={() => handleDelete(skill.id)}
                    className="p-1 rounded-md text-red-500 hover:text-red-600 hover:bg-red-500/10"
                    title="Delete"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Modal Form for Create / Edit */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-canvas-charcoal rounded-3xl p-6 sm:p-8 shadow-2xl border border-neutral-200 dark:border-neutral-800 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center gap-2">
                <Cpu className="h-5 w-5 text-accent-ember" />
                <h2 className="font-display text-lg font-bold text-foreground">
                  {editingSkill ? "Edit Skill" : "Add New Skill"}
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
                <label className="font-mono text-foreground/70 uppercase">Skill Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Next.js, Prisma, Premiere Pro"
                  className="w-full px-3.5 py-2 rounded-xl bg-warm-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-foreground text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-mono text-foreground/70 uppercase">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value as "DEVELOPMENT" | "CREATIVE" | "TOOLS" })}
                    className="w-full px-3 py-2 rounded-xl bg-warm-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-foreground text-xs"
                  >
                    <option value="DEVELOPMENT">DEVELOPMENT</option>
                    <option value="CREATIVE">CREATIVE</option>
                    <option value="TOOLS">TOOLS</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-foreground/70 uppercase">Proficiency Level</label>
                  <input
                    type="text"
                    value={form.level}
                    onChange={(e) => setForm({ ...form, level: e.target.value })}
                    placeholder="Proficient / Intermediate"
                    className="w-full px-3 py-2 rounded-xl bg-warm-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-foreground text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-mono text-foreground/70 uppercase">Order Position</label>
                <input
                  type="number"
                  value={form.order}
                  onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
                  className="w-full px-3.5 py-2 rounded-xl bg-warm-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-foreground text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-200 dark:border-neutral-800">
                <Button variant="secondary" size="sm" type="button" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit">
                  <Check className="h-4 w-4" />
                  <span>{editingSkill ? "Update" : "Create"}</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
