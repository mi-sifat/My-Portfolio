"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Plus, Edit2, Trash2, Video, Check, X, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface VideoItem {
  id: string;
  title: string;
  videoUrl: string;
  youtubeId: string;
  category: string;
  thumbnailUrl: string;
  description: string | null;
  isFeatured: boolean;
  order: number;
}

export default function AdminYouTubePage() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState<VideoItem | null>(null);

  const [form, setForm] = useState({
    title: "",
    videoUrl: "",
    youtubeId: "",
    category: "Food Blogging",
    thumbnailUrl: "",
    description: "",
    isFeatured: false,
    order: 0,
  });

  const fetchVideos = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/youtube");
      const data = await res.json();
      if (data.success) {
        setVideos(data.videos);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  const openCreateModal = () => {
    setEditingVideo(null);
    setForm({
      title: "",
      videoUrl: "",
      youtubeId: "",
      category: "Food Blogging",
      thumbnailUrl: "",
      description: "",
      isFeatured: false,
      order: videos.length,
    });
    setModalOpen(true);
  };

  const openEditModal = (v: VideoItem) => {
    setEditingVideo(v);
    setForm({
      title: v.title,
      videoUrl: v.videoUrl,
      youtubeId: v.youtubeId,
      category: v.category,
      thumbnailUrl: v.thumbnailUrl,
      description: v.description || "",
      isFeatured: v.isFeatured,
      order: v.order,
    });
    setModalOpen(true);
  };

  const handleUrlChange = (url: string) => {
    let id = "";
    try {
      if (url.includes("youtu.be/")) {
        id = url.split("youtu.be/")[1]?.split("?")[0] || "";
      } else if (url.includes("watch?v=")) {
        id = url.split("watch?v=")[1]?.split("&")[0] || "";
      }
    } catch {}
    setForm((prev) => ({
      ...prev,
      videoUrl: url,
      youtubeId: id || prev.youtubeId,
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = editingVideo ? "PUT" : "POST";
      const payload = {
        ...(editingVideo ? { id: editingVideo.id } : {}),
        ...form,
        order: Number(form.order),
      };

      const res = await fetch("/api/admin/youtube", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        setModalOpen(false);
        fetchVideos();
      } else {
        alert(data.message || "Failed to save video");
      }
    } catch {
      alert("Error saving video");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this video log?")) return;
    try {
      const res = await fetch("/api/admin/youtube", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        setVideos((prev) => prev.filter((v) => v.id !== id));
      }
    } catch {
      alert("Failed to delete video");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Badge variant="peach">Creator Space</Badge>
          <h1 className="font-display text-2xl font-bold text-foreground mt-1">
            YouTube Video Logs ({videos.length})
          </h1>
          <p className="text-xs text-foreground/60">
            Publish food reviews, travel expeditions, and lifestyle vlog entries.
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={openCreateModal}>
          <Plus className="h-4 w-4" />
          <span>Add Vlog Entry</span>
        </Button>
      </div>

      {/* Videos Grid */}
      {loading ? (
        <Card variant="glass" className="p-8 text-center text-xs text-foreground/50">
          Loading videos...
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {videos.map((vid) => (
            <Card
              key={vid.id}
              variant="glass"
              className="p-5 flex flex-col justify-between space-y-4 border border-neutral-200/80 dark:border-neutral-800"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-peach-100 dark:bg-peach-900/40 text-accent-ember font-semibold">
                    {vid.category}
                  </span>
                  {vid.isFeatured && (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600">
                      Featured
                    </span>
                  )}
                </div>

                <h3 className="font-display text-sm font-bold text-foreground line-clamp-2">
                  {vid.title}
                </h3>
                <p className="text-[11px] font-mono text-foreground/45">
                  ID: {vid.youtubeId}
                </p>
              </div>

              <div className="pt-3 border-t border-neutral-200/60 dark:border-neutral-800/60 flex items-center justify-between">
                <a
                  href={vid.videoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-red-500 hover:underline"
                >
                  <span>YouTube</span>
                  <ExternalLink className="h-3 w-3" />
                </a>

                <div className="flex items-center gap-1.5">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditModal(vid)}
                    className="h-8 px-2.5 text-xs"
                  >
                    <Edit2 className="h-3 w-3" />
                    <span>Edit</span>
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleDelete(vid.id)}
                    className="h-8 px-2 text-red-500 hover:text-red-600 hover:bg-red-500/10"
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
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-canvas-charcoal rounded-3xl p-6 sm:p-8 shadow-2xl border border-neutral-200 dark:border-neutral-800 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center gap-2">
                <Video className="h-5 w-5 text-accent-ember" />
                <h2 className="font-display text-lg font-bold text-foreground">
                  {editingVideo ? "Edit Video Entry" : "Add YouTube Vlog"}
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
                <label className="font-mono text-foreground/70 uppercase">Video Title</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Best Buffet in Dhaka | Food Vlog"
                  className="w-full px-3.5 py-2 rounded-xl bg-warm-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-foreground text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="font-mono text-foreground/70 uppercase">YouTube Link</label>
                <input
                  type="text"
                  required
                  value={form.videoUrl}
                  onChange={(e) => handleUrlChange(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full px-3.5 py-2 rounded-xl bg-warm-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-foreground text-xs font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-mono text-foreground/70 uppercase">YouTube ID</label>
                  <input
                    type="text"
                    required
                    value={form.youtubeId}
                    onChange={(e) => setForm({ ...form, youtubeId: e.target.value })}
                    placeholder="e.g. dQw4w9WgXcQ"
                    className="w-full px-3.5 py-2 rounded-xl bg-warm-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-foreground text-xs font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-foreground/70 uppercase">Category</label>
                  <input
                    type="text"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    placeholder="Food Blogging / Tour"
                    className="w-full px-3.5 py-2 rounded-xl bg-warm-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-foreground text-xs"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featuredVid"
                  checked={form.isFeatured}
                  onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
                  className="h-4 w-4 rounded accent-accent-ember"
                />
                <label htmlFor="featuredVid" className="font-medium text-foreground cursor-pointer">
                  Feature on Public Homepage
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-200 dark:border-neutral-800">
                <Button variant="secondary" size="sm" type="button" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit">
                  <Check className="h-4 w-4" />
                  <span>{editingVideo ? "Update" : "Publish"}</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
