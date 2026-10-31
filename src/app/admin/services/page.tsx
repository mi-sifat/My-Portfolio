"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Layers,
  Check,
  X,
  Upload,
  Eye,
  EyeOff,
  Star,
  ArrowUp,
  ArrowDown,
  Sparkles,
  Image as ImageIcon,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ServiceCardBanner } from "@/components/services/ServiceCardBanner";
import { BannerGeneratorModal } from "@/components/admin/BannerGeneratorModal";

interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  icon: string;
  shortDesc: string;
  fullDesc: string;
  pricing: string | null;
  deliveryTime: string | null;
  coverImageUrl: string | null;
  galleryUrls: string[];
  features: string[];
  deliverables: string[];
  isFeatured: boolean;
  isPublished: boolean;
  order: number;
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSrv, setEditingSrv] = useState<ServiceItem | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [bannerStudioOpen, setBannerStudioOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    category: "Web Development",
    icon: "Layers",
    shortDesc: "",
    fullDesc: "",
    pricing: "Custom Scope",
    deliveryTime: "1-2 Weeks",
    coverImageUrl: "",
    galleryUrls: "",
    features: "",
    deliverables: "",
    isFeatured: false,
    isPublished: true,
    order: 0,
  });

  const fetchServices = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/services");
      const data = await res.json();
      if (data.success) {
        setServices(data.services);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const openCreateModal = () => {
    setEditingSrv(null);
    setForm({
      title: "",
      slug: "",
      category: "Web Development",
      icon: "Layers",
      shortDesc: "",
      fullDesc: "",
      pricing: "Custom Scope",
      deliveryTime: "1-2 Weeks",
      coverImageUrl: "",
      galleryUrls: "",
      features: "Responsive Mobile-First UI\nFast Loading Architecture\nSEO & OpenGraph Integration",
      deliverables: "Full Source Code\nDeployment on Vercel/Cloud",
      isFeatured: false,
      isPublished: true,
      order: services.length,
    });
    setModalOpen(true);
  };

  const openEditModal = (s: ServiceItem) => {
    setEditingSrv(s);
    setForm({
      title: s.title,
      slug: s.slug,
      category: s.category || "Web Development",
      icon: s.icon || "Layers",
      shortDesc: s.shortDesc,
      fullDesc: s.fullDesc || s.shortDesc,
      pricing: s.pricing || "Custom Scope",
      deliveryTime: s.deliveryTime || "1-2 Weeks",
      coverImageUrl: s.coverImageUrl || "",
      galleryUrls: Array.isArray(s.galleryUrls) ? s.galleryUrls.join(", ") : "",
      features: Array.isArray(s.features) ? s.features.join("\n") : "",
      deliverables: Array.isArray(s.deliverables) ? s.deliverables.join("\n") : "",
      isFeatured: s.isFeatured,
      isPublished: s.isPublished,
      order: s.order,
    });
    setModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("altText", `${form.title || "Service"} Banner`);

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
      const method = editingSrv ? "PUT" : "POST";
      const payload = {
        ...(editingSrv ? { id: editingSrv.id } : {}),
        ...form,
        features: form.features.split("\n").map((s) => s.trim()).filter(Boolean),
        deliverables: form.deliverables.split("\n").map((s) => s.trim()).filter(Boolean),
        galleryUrls: form.galleryUrls.split(",").map((s) => s.trim()).filter(Boolean),
        order: Number(form.order),
      };

      const res = await fetch("/api/admin/services", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        setModalOpen(false);
        fetchServices();
      } else {
        alert(data.message || "Failed to save service");
      }
    } catch {
      alert("Error saving service");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    try {
      const res = await fetch("/api/admin/services", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        setServices((prev) => prev.filter((s) => s.id !== id));
      }
    } catch {
      alert("Failed to delete service");
    }
  };

  const handleTogglePublish = async (s: ServiceItem) => {
    try {
      const res = await fetch("/api/admin/services", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: s.id, isPublished: !s.isPublished }),
      });
      const data = await res.json();
      if (data.success) {
        setServices((prev) =>
          prev.map((item) => (item.id === s.id ? { ...item, isPublished: !item.isPublished } : item))
        );
      }
    } catch {
      alert("Failed to update status");
    }
  };

  const handleToggleFeatured = async (s: ServiceItem) => {
    try {
      const res = await fetch("/api/admin/services", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: s.id, isFeatured: !s.isFeatured }),
      });
      const data = await res.json();
      if (data.success) {
        setServices((prev) =>
          prev.map((item) => (item.id === s.id ? { ...item, isFeatured: !item.isFeatured } : item))
        );
      }
    } catch {
      alert("Failed to update featured status");
    }
  };

  const handleReorder = async (s: ServiceItem, direction: "up" | "down") => {
    const currentIndex = services.findIndex((item) => item.id === s.id);
    const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex < 0 || targetIndex >= services.length) return;

    const targetSrv = services[targetIndex];
    const newCurrentOrder = targetSrv.order;
    const newTargetOrder = s.order;

    try {
      await Promise.all([
        fetch("/api/admin/services", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: s.id, order: newCurrentOrder }),
        }),
        fetch("/api/admin/services", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: targetSrv.id, order: newTargetOrder }),
        }),
      ]);
      fetchServices();
    } catch {
      alert("Failed to reorder services");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Badge variant="peach">Client Offerings CMS</Badge>
          <h1 className="font-display text-2xl font-bold text-foreground mt-1">
            Services &amp; Solutions ({services.length})
          </h1>
          <p className="text-xs text-foreground/60">
            Manage your service offerings, custom scopes, visual banners, and client deliverables.
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={openCreateModal}>
          <Plus className="h-4 w-4" />
          <span>Add Service</span>
        </Button>
      </div>

      {/* Services Grid */}
      {loading ? (
        <Card variant="glass" className="p-8 text-center text-xs text-foreground/50">
          Loading services...
        </Card>
      ) : services.length === 0 ? (
        <Card variant="glass" className="p-12 text-center space-y-4 border border-dashed border-neutral-300 dark:border-neutral-700">
          <Layers className="h-10 w-10 text-foreground/40 mx-auto" />
          <p className="text-sm text-foreground/70">No services configured yet.</p>
          <Button variant="primary" size="sm" onClick={openCreateModal}>
            Add First Service
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((srv, idx) => (
            <Card
              key={srv.id}
              variant="glass"
              className={`p-5 flex flex-col justify-between space-y-4 border transition-all duration-300 ${
                srv.isPublished
                  ? "border-neutral-200/80 dark:border-neutral-800"
                  : "border-dashed border-neutral-300 dark:border-neutral-700 opacity-75"
              }`}
            >
              <div className="space-y-3">
                {/* Visual Service Banner */}
                <div className="relative">
                  <ServiceCardBanner
                    title={srv.title}
                    category={srv.category}
                    coverImageUrl={srv.coverImageUrl}
                  />

                  {/* Top Badges */}
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-white font-semibold border border-white/20">
                      {srv.category || "Service"}
                    </span>
                  </div>

                  <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
                    <button
                      onClick={() => handleToggleFeatured(srv)}
                      title={srv.isFeatured ? "Unmark Featured" : "Mark Featured"}
                      className={`p-1.5 rounded-md backdrop-blur-md transition-colors ${
                        srv.isFeatured
                          ? "bg-amber-500 text-white shadow-md"
                          : "bg-black/60 text-white/70 hover:text-white"
                      }`}
                    >
                      <Star className={`h-3 w-3 ${srv.isFeatured ? "fill-current" : ""}`} />
                    </button>
                    <button
                      onClick={() => handleTogglePublish(srv)}
                      title={srv.isPublished ? "Click to Unpublish" : "Click to Publish"}
                      className={`p-1.5 rounded-md backdrop-blur-md transition-colors ${
                        srv.isPublished
                          ? "bg-emerald-500 text-white shadow-md"
                          : "bg-rose-500 text-white"
                      }`}
                    >
                      {srv.isPublished ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                    </button>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-accent-ember font-semibold">
                      {srv.pricing}
                    </span>
                    <span className="text-[10px] font-mono text-foreground/50">
                      {srv.deliveryTime}
                    </span>
                  </div>
                  <h3 className="font-display text-base font-bold text-foreground mt-1">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-foreground/60 line-clamp-2 mt-1">
                    {srv.shortDesc}
                  </p>
                </div>

                {/* Features Preview */}
                <div className="space-y-1 pt-1">
                  {(srv.features || []).slice(0, 2).map((f) => (
                    <div key={f} className="flex items-center gap-1.5 text-[11px] text-foreground/75">
                      <span className="h-1.5 w-1.5 rounded-full bg-peach-500 shrink-0" />
                      <span className="truncate">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-3 border-t border-neutral-200/60 dark:border-neutral-800/60 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleReorder(srv, "up")}
                    disabled={idx === 0}
                    className="p-1 rounded text-foreground/40 hover:text-foreground disabled:opacity-20"
                    title="Move Up"
                  >
                    <ArrowUp className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => handleReorder(srv, "down")}
                    disabled={idx === services.length - 1}
                    className="p-1 rounded text-foreground/40 hover:text-foreground disabled:opacity-20"
                    title="Move Down"
                  >
                    <ArrowDown className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div className="flex items-center gap-1.5">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditModal(srv)}
                    className="h-8 px-2.5 text-xs"
                  >
                    <Edit2 className="h-3 w-3" />
                    <span>Edit</span>
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleDelete(srv.id)}
                    className="h-8 px-2 text-red-500 hover:text-red-600 hover:bg-red-500/10"
                    title="Delete Service"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Modal Form */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-xl bg-white dark:bg-canvas-charcoal rounded-3xl p-6 sm:p-8 shadow-2xl border border-neutral-200 dark:border-neutral-800 space-y-5 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center gap-2">
                <Layers className="h-5 w-5 text-accent-ember" />
                <h2 className="font-display text-lg font-bold text-foreground">
                  {editingSrv ? "Edit Service" : "Add New Service"}
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
              {/* Cover Banner Upload / Preview */}
              <div className="p-4 rounded-2xl bg-warm-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="font-mono text-foreground font-semibold uppercase flex items-center gap-2">
                    <ImageIcon className="h-4 w-4 text-accent-ember" />
                    Service Banner
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
                  <div className="border border-dashed border-neutral-300 dark:border-neutral-700 rounded-xl p-4 text-center space-y-2">
                    <p className="text-xs text-foreground/60">
                      Add a visual banner to display on your public services card.
                    </p>
                    <div className="flex items-center justify-center gap-2 pt-1">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        disabled={uploadingImage}
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Upload className="h-3.5 w-3.5" />
                        {uploadingImage ? "Uploading..." : "Upload Banner"}
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

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/svg+xml"
                  onChange={handleFileUpload}
                  className="hidden"
                />

                <input
                  type="text"
                  value={form.coverImageUrl}
                  onChange={(e) => setForm({ ...form, coverImageUrl: e.target.value })}
                  placeholder="/uploads/... or https://..."
                  className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-canvas-charcoal border border-neutral-200 dark:border-neutral-800 text-foreground text-xs font-mono"
                />
              </div>

              {/* Title, Category & Slug */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-mono text-foreground/70 uppercase">Title</label>
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={(e) => {
                      const t = e.target.value;
                      setForm((prev) => ({
                        ...prev,
                        title: t,
                        slug: editingSrv ? prev.slug : t.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
                      }));
                    }}
                    placeholder="Full-Stack Web Development"
                    className="w-full px-3.5 py-2 rounded-xl bg-warm-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-foreground text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-foreground/70 uppercase">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-warm-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-foreground text-sm"
                  >
                    <option value="Web Development">Web Development</option>
                    <option value="E-commerce Store">E-commerce Store</option>
                    <option value="Multimedia & Video">Multimedia &amp; Video</option>
                    <option value="Software Engineering">Software Engineering</option>
                    <option value="Technical Consultation">Technical Consultation</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-mono text-foreground/70 uppercase">Pricing / Scope</label>
                  <input
                    type="text"
                    value={form.pricing}
                    onChange={(e) => setForm({ ...form, pricing: e.target.value })}
                    placeholder="Custom Scope / Starting at $300"
                    className="w-full px-3.5 py-2 rounded-xl bg-warm-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-foreground text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-foreground/70 uppercase">Estimated Delivery</label>
                  <input
                    type="text"
                    value={form.deliveryTime}
                    onChange={(e) => setForm({ ...form, deliveryTime: e.target.value })}
                    placeholder="1-2 Weeks"
                    className="w-full px-3.5 py-2 rounded-xl bg-warm-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-foreground text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-mono text-foreground/70 uppercase">Short Description</label>
                <textarea
                  rows={2}
                  required
                  value={form.shortDesc}
                  onChange={(e) => setForm({ ...form, shortDesc: e.target.value })}
                  placeholder="Summary of service value proposition"
                  className="w-full px-3.5 py-2 rounded-xl bg-warm-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-foreground text-sm resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-mono text-foreground/70 uppercase">Features (one per line)</label>
                  <textarea
                    rows={3}
                    value={form.features}
                    onChange={(e) => setForm({ ...form, features: e.target.value })}
                    placeholder="Responsive Mobile-First UI&#10;Fast Loading Architecture"
                    className="w-full px-3.5 py-2 rounded-xl bg-warm-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-foreground text-sm resize-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-foreground/70 uppercase">Deliverables (one per line)</label>
                  <textarea
                    rows={3}
                    value={form.deliverables}
                    onChange={(e) => setForm({ ...form, deliverables: e.target.value })}
                    placeholder="Full Source Code&#10;Deployment on Vercel"
                    className="w-full px-3.5 py-2 rounded-xl bg-warm-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-foreground text-sm resize-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.isFeatured}
                    onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
                    className="h-4 w-4 rounded accent-accent-ember"
                  />
                  <span className="font-medium text-foreground">Featured Service</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.isPublished}
                    onChange={(e) => setForm({ ...form, isPublished: e.target.checked })}
                    className="h-4 w-4 rounded accent-accent-ember"
                  />
                  <span className="font-medium text-foreground">Published</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-200 dark:border-neutral-800">
                <Button variant="secondary" size="sm" type="button" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit">
                  <Check className="h-4 w-4" />
                  <span>{editingSrv ? "Update Service" : "Create Service"}</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Banner Studio Modal */}
      <BannerGeneratorModal
        isOpen={bannerStudioOpen}
        onClose={() => setBannerStudioOpen(false)}
        title={form.title}
        category={form.category}
        technologies={form.features.split("\n").filter(Boolean).slice(0, 3)}
        onApplyBanner={(bannerUrl) => setForm((prev) => ({ ...prev, coverImageUrl: bannerUrl }))}
      />
    </div>
  );
}
