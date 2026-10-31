"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  Check,
  X,
  FolderGit2,
  Sparkles,
  Upload,
  Copy,
  Eye,
  EyeOff,
  Star,
  ArrowUp,
  ArrowDown,
  Image as ImageIcon,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { BannerGeneratorModal } from "@/components/admin/BannerGeneratorModal";
import { ProjectCardBanner } from "@/components/projects/ProjectCardBanner";

interface ProjectItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  shortDesc: string;
  fullDesc: string;
  technologies: string[];
  features: string[];
  status: string;
  liveDemoUrl: string | null;
  githubUrl: string | null;
  coverImageUrl: string | null;
  galleryUrls: string[];
  isFeatured: boolean;
  isPublished: boolean;
  order: number;
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [bannerStudioOpen, setBannerStudioOpen] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    category: "Software Development",
    shortDesc: "",
    fullDesc: "",
    technologies: "React, Next.js, TypeScript",
    features: "Feature 1\nFeature 2",
    status: "Completed",
    liveDemoUrl: "",
    githubUrl: "",
    coverImageUrl: "",
    galleryUrls: "",
    isFeatured: false,
    isPublished: true,
    order: 0,
  });

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/projects");
      const data = await res.json();
      if (data.success) {
        setProjects(data.projects);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const openCreateModal = () => {
    setEditingProject(null);
    setForm({
      title: "",
      slug: "",
      category: "Software Development",
      shortDesc: "",
      fullDesc: "",
      technologies: "React, TypeScript, Node.js",
      features: "Feature 1\nFeature 2",
      status: "Completed",
      liveDemoUrl: "",
      githubUrl: "",
      coverImageUrl: "",
      galleryUrls: "",
      isFeatured: false,
      isPublished: true,
      order: projects.length,
    });
    setModalOpen(true);
  };

  const openEditModal = (p: ProjectItem) => {
    setEditingProject(p);
    setForm({
      title: p.title,
      slug: p.slug,
      category: p.category,
      shortDesc: p.shortDesc,
      fullDesc: p.fullDesc,
      technologies: Array.isArray(p.technologies) ? p.technologies.join(", ") : "",
      features: Array.isArray(p.features) ? p.features.join("\n") : "",
      status: p.status,
      liveDemoUrl: p.liveDemoUrl || "",
      githubUrl: p.githubUrl || "",
      coverImageUrl: p.coverImageUrl || "",
      galleryUrls: Array.isArray(p.galleryUrls) ? p.galleryUrls.join(", ") : "",
      isFeatured: p.isFeatured,
      isPublished: p.isPublished,
      order: p.order,
    });
    setModalOpen(true);
  };

  const handleTitleChange = (val: string) => {
    setForm((prev) => ({
      ...prev,
      title: val,
      slug: editingProject
        ? prev.slug
        : val
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, ""),
    }));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("altText", `${form.title || "Project"} Banner`);

      const res = await fetch("/api/admin/media/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.media?.url) {
        setForm((prev) => ({ ...prev, coverImageUrl: data.media.url }));
      } else {
        alert(data.message || "Failed to upload image");
      }
    } catch {
      alert("Error uploading image");
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = editingProject ? "PUT" : "POST";
      const payload = {
        ...(editingProject ? { id: editingProject.id } : {}),
        ...form,
        technologies: form.technologies.split(",").map((s) => s.trim()).filter(Boolean),
        features: form.features.split("\n").map((s) => s.trim()).filter(Boolean),
        galleryUrls: form.galleryUrls.split(",").map((s) => s.trim()).filter(Boolean),
        order: Number(form.order),
      };

      const res = await fetch("/api/admin/projects", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        setModalOpen(false);
        fetchProjects();
      } else {
        alert(data.message || "Failed to save project");
      }
    } catch {
      alert("Error saving project");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      const res = await fetch("/api/admin/projects", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        setProjects((prev) => prev.filter((p) => p.id !== id));
      }
    } catch {
      alert("Failed to delete project");
    }
  };

  const handleDuplicate = async (proj: ProjectItem) => {
    try {
      const payload = {
        title: `${proj.title} (Copy)`,
        slug: `${proj.slug}-copy-${Date.now().toString().slice(-4)}`,
        category: proj.category,
        shortDesc: proj.shortDesc,
        fullDesc: proj.fullDesc,
        technologies: proj.technologies,
        features: proj.features,
        status: proj.status,
        liveDemoUrl: proj.liveDemoUrl,
        githubUrl: proj.githubUrl,
        coverImageUrl: proj.coverImageUrl,
        galleryUrls: proj.galleryUrls,
        isFeatured: false,
        isPublished: false,
        order: projects.length,
      };

      const res = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        fetchProjects();
      } else {
        alert(data.message || "Failed to duplicate project");
      }
    } catch {
      alert("Error duplicating project");
    }
  };

  const handleTogglePublish = async (proj: ProjectItem) => {
    try {
      const res = await fetch("/api/admin/projects", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: proj.id, isPublished: !proj.isPublished }),
      });
      const data = await res.json();
      if (data.success) {
        setProjects((prev) =>
          prev.map((p) => (p.id === proj.id ? { ...p, isPublished: !p.isPublished } : p))
        );
      }
    } catch {
      alert("Failed to toggle publish status");
    }
  };

  const handleToggleFeatured = async (proj: ProjectItem) => {
    try {
      const res = await fetch("/api/admin/projects", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: proj.id, isFeatured: !proj.isFeatured }),
      });
      const data = await res.json();
      if (data.success) {
        setProjects((prev) =>
          prev.map((p) => (p.id === proj.id ? { ...p, isFeatured: !p.isFeatured } : p))
        );
      }
    } catch {
      alert("Failed to toggle featured status");
    }
  };

  const handleReorder = async (proj: ProjectItem, direction: "up" | "down") => {
    const currentIndex = projects.findIndex((p) => p.id === proj.id);
    const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex < 0 || targetIndex >= projects.length) return;

    const targetProj = projects[targetIndex];
    const newCurrentOrder = targetProj.order;
    const newTargetOrder = proj.order;

    try {
      await Promise.all([
        fetch("/api/admin/projects", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: proj.id, order: newCurrentOrder }),
        }),
        fetch("/api/admin/projects", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: targetProj.id, order: newTargetOrder }),
        }),
      ]);
      fetchProjects();
    } catch {
      alert("Failed to reorder projects");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Badge variant="peach">Engineering Portfolio CMS</Badge>
          <h1 className="font-display text-2xl font-bold text-foreground mt-1">
            Projects Showcase ({projects.length})
          </h1>
          <p className="text-xs text-foreground/60">
            Database-driven project management with live banner editing, AI generation, and instant ordering.
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={openCreateModal}>
          <Plus className="h-4 w-4" />
          <span>Add Project</span>
        </Button>
      </div>

      {/* Projects Grid */}
      {loading ? (
        <Card variant="glass" className="p-8 text-center text-xs text-foreground/50">
          Loading projects from database...
        </Card>
      ) : projects.length === 0 ? (
        <Card variant="glass" className="p-12 text-center space-y-4 border border-dashed border-neutral-300 dark:border-neutral-700">
          <FolderGit2 className="h-10 w-10 text-foreground/40 mx-auto" />
          <p className="text-sm text-foreground/70">No projects found in database.</p>
          <Button variant="primary" size="sm" onClick={openCreateModal}>
            Create First Project
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj, idx) => (
            <Card
              key={proj.id}
              variant="glass"
              className={`p-5 flex flex-col justify-between space-y-4 border transition-all duration-300 ${
                proj.isPublished
                  ? "border-neutral-200/80 dark:border-neutral-800"
                  : "border-dashed border-neutral-300 dark:border-neutral-700 opacity-75"
              }`}
            >
              <div className="space-y-3">
                {/* Visual Card Banner Preview */}
                <div className="relative">
                  <ProjectCardBanner
                    title={proj.title}
                    category={proj.category}
                    technologies={proj.technologies}
                    coverImageUrl={proj.coverImageUrl}
                  />

                  {/* Quick Status Floating Badges */}
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-white font-semibold border border-white/20">
                      {proj.category}
                    </span>
                  </div>

                  <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
                    <button
                      onClick={() => handleToggleFeatured(proj)}
                      title={proj.isFeatured ? "Unmark Featured" : "Mark Featured"}
                      className={`p-1.5 rounded-md backdrop-blur-md transition-colors ${
                        proj.isFeatured
                          ? "bg-amber-500 text-white shadow-md"
                          : "bg-black/60 text-white/70 hover:text-white"
                      }`}
                    >
                      <Star className={`h-3 w-3 ${proj.isFeatured ? "fill-current" : ""}`} />
                    </button>
                    <button
                      onClick={() => handleTogglePublish(proj)}
                      title={proj.isPublished ? "Click to Unpublish" : "Click to Publish"}
                      className={`p-1.5 rounded-md backdrop-blur-md transition-colors ${
                        proj.isPublished
                          ? "bg-emerald-500 text-white shadow-md"
                          : "bg-rose-500 text-white"
                      }`}
                    >
                      {proj.isPublished ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                    </button>
                  </div>
                </div>

                {/* Title & Short Description */}
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-display text-base font-bold text-foreground">
                      {proj.title}
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-peach-100 text-canvas-dark dark:bg-peach-500/20 dark:text-peach-200">
                      {proj.status}
                    </span>
                  </div>
                  <p className="text-xs text-foreground/65 line-clamp-2 leading-relaxed mt-1">
                    {proj.shortDesc}
                  </p>
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {(proj.technologies || []).slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-warm-100 dark:bg-neutral-800 text-foreground/70"
                    >
                      {tech}
                    </span>
                  ))}
                  {(proj.technologies || []).length > 3 && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 text-foreground/40">
                      +{(proj.technologies || []).length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom Actions Bar */}
              <div className="pt-3 border-t border-neutral-200/60 dark:border-neutral-800/60 flex items-center justify-between">
                {/* Reorder and External Links */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleReorder(proj, "up")}
                    disabled={idx === 0}
                    className="p-1 rounded text-foreground/40 hover:text-foreground disabled:opacity-20"
                    title="Move Up"
                  >
                    <ArrowUp className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => handleReorder(proj, "down")}
                    disabled={idx === projects.length - 1}
                    className="p-1 rounded text-foreground/40 hover:text-foreground disabled:opacity-20"
                    title="Move Down"
                  >
                    <ArrowDown className="h-3.5 w-3.5" />
                  </button>
                  {proj.liveDemoUrl && (
                    <a
                      href={proj.liveDemoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-lg text-foreground/50 hover:text-accent-ember transition-colors"
                      title="Live Demo"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>

                {/* Edit, Duplicate, Delete */}
                <div className="flex items-center gap-1.5">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDuplicate(proj)}
                    className="h-8 px-2 text-xs"
                    title="Duplicate Project"
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditModal(proj)}
                    className="h-8 px-2.5 text-xs"
                  >
                    <Edit2 className="h-3 w-3" />
                    <span>Edit</span>
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleDelete(proj.id)}
                    className="h-8 px-2 text-red-500 hover:text-red-600 hover:bg-red-500/10"
                    title="Delete Project"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Modal Form for Create / Edit */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-white dark:bg-canvas-charcoal rounded-3xl p-6 sm:p-8 shadow-2xl border border-neutral-200 dark:border-neutral-800 space-y-5 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center gap-2">
                <FolderGit2 className="h-5 w-5 text-accent-ember" />
                <h2 className="font-display text-lg font-bold text-foreground">
                  {editingProject ? "Edit Project" : "Add New Project"}
                </h2>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-xl text-foreground/50 hover:text-foreground hover:bg-warm-100 dark:hover:bg-neutral-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              {/* BANNER / COVER IMAGE SECTION */}
              <div className="p-4 rounded-2xl bg-warm-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="font-mono text-foreground font-semibold uppercase flex items-center gap-2">
                    <ImageIcon className="h-4 w-4 text-accent-ember" />
                    Project Banner / Cover
                  </label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setBannerStudioOpen(true)}
                    className="h-7 text-xs gap-1 border-peach-400 text-peach-600 dark:text-peach-300"
                  >
                    <Sparkles className="h-3 w-3" />
                    Auto Graphic Studio
                  </Button>
                </div>

                {/* Banner Preview or Placeholder */}
                {form.coverImageUrl ? (
                  <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-neutral-300 dark:border-neutral-700 bg-neutral-950 group">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={form.coverImageUrl}
                      alt="Banner Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        Replace Image
                      </Button>
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        className="text-red-400 hover:text-red-500"
                        onClick={() => setForm((prev) => ({ ...prev, coverImageUrl: "" }))}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="border border-dashed border-neutral-300 dark:border-neutral-700 rounded-xl p-5 text-center space-y-2">
                    <p className="text-xs text-foreground/60">
                      No banner attached. You can upload an image or generate an automatic graphic banner.
                    </p>
                    <div className="flex items-center justify-center gap-3 pt-1">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        disabled={uploadingImage}
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Upload className="h-3.5 w-3.5" />
                        {uploadingImage ? "Uploading..." : "Upload Image"}
                      </Button>
                      <Button
                        type="button"
                        variant="primary"
                        size="sm"
                        onClick={() => setBannerStudioOpen(true)}
                      >
                        <Sparkles className="h-3.5 w-3.5" />
                        Generate Graphic Banner
                      </Button>
                    </div>
                  </div>
                )}

                {/* Hidden File Input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/svg+xml"
                  onChange={handleFileUpload}
                  className="hidden"
                />

                {/* Direct Image URL input fallback */}
                <div className="space-y-1 pt-1">
                  <span className="text-[10px] text-foreground/50 font-mono">
                    Direct Image or SVG URL:
                  </span>
                  <input
                    type="text"
                    value={form.coverImageUrl}
                    onChange={(e) => setForm({ ...form, coverImageUrl: e.target.value })}
                    placeholder="/uploads/... or https://..."
                    className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-canvas-charcoal border border-neutral-200 dark:border-neutral-800 text-foreground text-xs font-mono"
                  />
                </div>
              </div>

              {/* Title & Slug */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-mono text-foreground/70 uppercase">Title</label>
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g. Smart Voice-to-Text"
                    className="w-full px-3.5 py-2 rounded-xl bg-warm-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-foreground text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-foreground/70 uppercase">Slug</label>
                  <input
                    type="text"
                    required
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    placeholder="smart-voice-to-text"
                    className="w-full px-3.5 py-2 rounded-xl bg-warm-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-foreground text-sm font-mono"
                  />
                </div>
              </div>

              {/* Category, Status, Sort Order */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="font-mono text-foreground/70 uppercase">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-warm-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-foreground text-sm"
                  >
                    <option value="Software Development">Software Development</option>
                    <option value="Web Development">Web Development</option>
                    <option value="E-commerce">E-commerce</option>
                    <option value="Android">Android</option>
                    <option value="IoT">IoT</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-foreground/70 uppercase">Status</label>
                  <input
                    type="text"
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    placeholder="Completed / v1.1.2 Production"
                    className="w-full px-3.5 py-2 rounded-xl bg-warm-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-foreground text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-foreground/70 uppercase">Sort Order</label>
                  <input
                    type="number"
                    value={form.order}
                    onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 rounded-xl bg-warm-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-foreground text-sm"
                  />
                </div>
              </div>

              {/* Descriptions */}
              <div className="space-y-1">
                <label className="font-mono text-foreground/70 uppercase">Short Description</label>
                <input
                  type="text"
                  required
                  value={form.shortDesc}
                  onChange={(e) => setForm({ ...form, shortDesc: e.target.value })}
                  placeholder="One sentence summary of the project"
                  className="w-full px-3.5 py-2 rounded-xl bg-warm-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-foreground text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="font-mono text-foreground/70 uppercase">Full Description</label>
                <textarea
                  rows={3}
                  value={form.fullDesc}
                  onChange={(e) => setForm({ ...form, fullDesc: e.target.value })}
                  placeholder="Detailed breakdown of problem solved, architecture, and results"
                  className="w-full px-3.5 py-2 rounded-xl bg-warm-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-foreground text-sm resize-none"
                />
              </div>

              {/* Technologies & Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-mono text-foreground/70 uppercase">
                    Technologies (comma separated)
                  </label>
                  <input
                    type="text"
                    value={form.technologies}
                    onChange={(e) => setForm({ ...form, technologies: e.target.value })}
                    placeholder="React, TypeScript, Tailwind, Node.js"
                    className="w-full px-3.5 py-2 rounded-xl bg-warm-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-foreground text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-foreground/70 uppercase">
                    Features (one per line)
                  </label>
                  <textarea
                    rows={2}
                    value={form.features}
                    onChange={(e) => setForm({ ...form, features: e.target.value })}
                    placeholder="Audio Waveform Visualization&#10;Export to SRT and TXT"
                    className="w-full px-3.5 py-2 rounded-xl bg-warm-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-foreground text-sm resize-none"
                  />
                </div>
              </div>

              {/* URLs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-mono text-foreground/70 uppercase">Live Demo URL</label>
                  <input
                    type="text"
                    value={form.liveDemoUrl}
                    onChange={(e) => setForm({ ...form, liveDemoUrl: e.target.value })}
                    placeholder="https://example.com"
                    className="w-full px-3.5 py-2 rounded-xl bg-warm-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-foreground text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-foreground/70 uppercase">GitHub Repo URL</label>
                  <input
                    type="text"
                    value={form.githubUrl}
                    onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
                    placeholder="https://github.com/..."
                    className="w-full px-3.5 py-2 rounded-xl bg-warm-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-foreground text-sm"
                  />
                </div>
              </div>

              {/* Optional Gallery URLs */}
              <div className="space-y-1">
                <label className="font-mono text-foreground/70 uppercase">
                  Additional Gallery Image URLs (comma separated)
                </label>
                <input
                  type="text"
                  value={form.galleryUrls}
                  onChange={(e) => setForm({ ...form, galleryUrls: e.target.value })}
                  placeholder="/uploads/screenshot1.png, /uploads/screenshot2.png"
                  className="w-full px-3.5 py-2 rounded-xl bg-warm-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-foreground text-sm"
                />
              </div>

              {/* Featured & Published Controls */}
              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.isFeatured}
                    onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
                    className="h-4 w-4 rounded accent-accent-ember"
                  />
                  <span className="font-medium text-foreground">Featured on Homepage</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.isPublished}
                    onChange={(e) => setForm({ ...form, isPublished: e.target.checked })}
                    className="h-4 w-4 rounded accent-accent-ember"
                  />
                  <span className="font-medium text-foreground">Published (Visible to Visitors)</span>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-200 dark:border-neutral-800">
                <Button variant="secondary" size="sm" type="button" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit">
                  <Check className="h-4 w-4" />
                  <span>{editingProject ? "Update Project" : "Create Project"}</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* BANNER GENERATOR STUDIO MODAL */}
      <BannerGeneratorModal
        isOpen={bannerStudioOpen}
        onClose={() => setBannerStudioOpen(false)}
        title={form.title}
        category={form.category}
        technologies={form.technologies.split(",").map((s) => s.trim()).filter(Boolean)}
        onApplyBanner={(bannerUrl) => setForm((prev) => ({ ...prev, coverImageUrl: bannerUrl }))}
      />
    </div>
  );
}
