"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Plus, Edit2, Trash2, GraduationCap, Check, X } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface EduItem {
  id: string;
  institution: string;
  degree: string;
  department: string | null;
  board: string | null;
  gpa: string | null;
  duration: string;
  description: string | null;
  order: number;
}

export default function AdminEducationPage() {
  const [education, setEducation] = useState<EduItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEdu, setEditingEdu] = useState<EduItem | null>(null);

  const [form, setForm] = useState({
    institution: "",
    degree: "",
    department: "",
    board: "",
    gpa: "",
    duration: "",
    description: "",
    order: 0,
  });

  const fetchEducation = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/education");
      const data = await res.json();
      if (data.success) {
        setEducation(data.education);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEducation();
  }, [fetchEducation]);

  const openCreateModal = () => {
    setEditingEdu(null);
    setForm({
      institution: "",
      degree: "",
      department: "Computer Science & Technology",
      board: "BTEB",
      gpa: "",
      duration: "2021 – Present",
      description: "",
      order: education.length,
    });
    setModalOpen(true);
  };

  const openEditModal = (edu: EduItem) => {
    setEditingEdu(edu);
    setForm({
      institution: edu.institution,
      degree: edu.degree,
      department: edu.department || "",
      board: edu.board || "",
      gpa: edu.gpa || "",
      duration: edu.duration,
      description: edu.description || "",
      order: edu.order,
    });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = editingEdu ? "PUT" : "POST";
      const payload = {
        ...(editingEdu ? { id: editingEdu.id } : {}),
        ...form,
        order: Number(form.order),
      };

      const res = await fetch("/api/admin/education", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        setModalOpen(false);
        fetchEducation();
      } else {
        alert(data.message || "Failed to save education record");
      }
    } catch {
      alert("Error saving education");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this educational record?")) return;
    try {
      const res = await fetch("/api/admin/education", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        setEducation((prev) => prev.filter((e) => e.id !== id));
      }
    } catch {
      alert("Failed to delete record");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Badge variant="peach">Academic Qualifications</Badge>
          <h1 className="font-display text-2xl font-bold text-foreground mt-1">
            Education History ({education.length})
          </h1>
          <p className="text-xs text-foreground/60">
            Diplomas, degrees, technical boards, and graduation milestones.
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={openCreateModal}>
          <Plus className="h-4 w-4" />
          <span>Add Degree</span>
        </Button>
      </div>

      {loading ? (
        <Card variant="glass" className="p-8 text-center text-xs text-foreground/50">
          Loading education history...
        </Card>
      ) : (
        <div className="space-y-4">
          {education.map((edu) => (
            <Card
              key={edu.id}
              variant="glass"
              className="p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4 border border-neutral-200/80 dark:border-neutral-800"
            >
              <div className="space-y-1.5 max-w-2xl">
                <span className="text-xs font-mono text-accent-ember font-bold">
                  {edu.duration}
                </span>
                <h3 className="font-display text-base font-bold text-foreground">
                  {edu.degree}
                </h3>
                <p className="text-xs font-semibold text-foreground/75">
                  {edu.institution} {edu.board && `• ${edu.board}`}
                </p>
                {edu.department && (
                  <p className="text-xs text-foreground/60 font-mono">
                    Department: {edu.department}
                  </p>
                )}
                {edu.description && (
                  <p className="text-xs text-foreground/60 leading-relaxed mt-1">
                    {edu.description}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openEditModal(edu)}
                  className="h-8 px-2.5 text-xs"
                >
                  <Edit2 className="h-3 w-3" />
                  <span>Edit</span>
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleDelete(edu.id)}
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
                <GraduationCap className="h-5 w-5 text-accent-ember" />
                <h2 className="font-display text-lg font-bold text-foreground">
                  {editingEdu ? "Edit Degree" : "Add Degree"}
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
                  <label className="font-mono text-foreground/70 uppercase">Degree / Diploma</label>
                  <input
                    type="text"
                    required
                    value={form.degree}
                    onChange={(e) => setForm({ ...form, degree: e.target.value })}
                    placeholder="Diploma in Engineering"
                    className="w-full px-3 py-2 rounded-xl bg-warm-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-foreground text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-foreground/70 uppercase">Institution</label>
                  <input
                    type="text"
                    required
                    value={form.institution}
                    onChange={(e) => setForm({ ...form, institution: e.target.value })}
                    placeholder="Polytechnic Institute"
                    className="w-full px-3 py-2 rounded-xl bg-warm-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-foreground text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-mono text-foreground/70 uppercase">Department</label>
                  <input
                    type="text"
                    value={form.department}
                    onChange={(e) => setForm({ ...form, department: e.target.value })}
                    placeholder="Computer Science & Technology"
                    className="w-full px-3 py-2 rounded-xl bg-warm-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-foreground text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-foreground/70 uppercase">Duration</label>
                  <input
                    type="text"
                    required
                    value={form.duration}
                    onChange={(e) => setForm({ ...form, duration: e.target.value })}
                    placeholder="2021 – Present"
                    className="w-full px-3 py-2 rounded-xl bg-warm-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-foreground text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-mono text-foreground/70 uppercase">Description / Achievements</label>
                <textarea
                  rows={2}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Key coursework or academic honors..."
                  className="w-full px-3 py-2 rounded-xl bg-warm-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-foreground text-xs resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-200 dark:border-neutral-800">
                <Button variant="secondary" size="sm" type="button" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit">
                  <Check className="h-4 w-4" />
                  <span>{editingEdu ? "Update" : "Save"}</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
