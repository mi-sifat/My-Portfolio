"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import {
  UploadCloud,
  Trash2,
  Copy,
  Check,
  ExternalLink,
  Search,
  Image as ImageIcon,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface MediaItem {
  id: string;
  fileName: string;
  storageKey: string;
  url: string;
  mimeType: string;
  sizeBytes: number;
  width: number | null;
  height: number | null;
  altText: string | null;
  createdAt: string;
}

export default function AdminMediaLibraryPage() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchMedia = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/media");
      const data = await res.json();
      if (data.success) {
        setMedia(data.media);
        if (data.media.length > 0 && !selectedItem) {
          setSelectedItem(data.media[0]);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [selectedItem]);

  useEffect(() => {
    fetchMedia();
  }, [fetchMedia]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const file = files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("altText", file.name);

    try {
      const res = await fetch("/api/admin/media/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success && data.media) {
        setMedia((prev) => [data.media, ...prev]);
        setSelectedItem(data.media);
      } else {
        alert(data.message || "Upload failed");
      }
    } catch {
      alert("Error uploading image");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this image?")) return;
    try {
      const res = await fetch("/api/admin/media", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        const remaining = media.filter((m) => m.id !== id);
        setMedia(remaining);
        if (selectedItem?.id === id) {
          setSelectedItem(remaining[0] || null);
        }
      } else {
        alert(data.message || "Failed to delete");
      }
    } catch {
      alert("Error deleting media");
    }
  };

  const copyToClipboard = (url: string, id: string) => {
    const fullUrl = window.location.origin + url;
    navigator.clipboard.writeText(fullUrl);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const filteredMedia = media.filter((m) =>
    m.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (m.altText && m.altText.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const totalStorageBytes = media.reduce((acc, cur) => acc + cur.sizeBytes, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="peach">Asset Pipeline</Badge>
            <span className="text-xs font-mono text-foreground/50">
              {media.length} files • {formatFileSize(totalStorageBytes)}
            </span>
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground mt-1">
            Media & Visual Assets Library
          </h1>
          <p className="text-xs text-foreground/60">
            Upload, optimize, and organize high-resolution portraits, project covers, and screenshots.
          </p>
        </div>

        <div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
            className="hidden"
          />
          <Button
            variant="primary"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
          >
            <UploadCloud className="h-4 w-4" />
            <span>{uploading ? "Uploading Image..." : "Upload New Image"}</span>
          </Button>
        </div>
      </div>

      {/* Upload Dropzone Banner */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className="p-6 rounded-3xl border-2 border-dashed border-neutral-300 dark:border-neutral-800 bg-white/40 dark:bg-canvas-charcoal/40 hover:bg-warm-100/40 dark:hover:bg-neutral-800/40 transition-all text-center cursor-pointer group"
      >
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-peach-100 dark:bg-peach-900/40 text-accent-ember mx-auto group-hover:scale-110 transition-transform">
          <UploadCloud className="h-6 w-6" />
        </div>
        <p className="font-display text-sm font-bold text-foreground mt-3">
          Drop your image here, or browse files
        </p>
        <p className="text-xs text-foreground/50 mt-1 font-mono">
          Supports PNG, WEBP, JPEG, SVG up to 15MB • Automatic dimensions parsing
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search assets by file name..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/80 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-peach-500/50"
          />
        </div>
      </div>

      {/* Main Grid & Details Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Media Grid (8 cols) */}
        <div className="lg:col-span-8">
          {loading ? (
            <Card variant="glass" className="p-12 text-center text-xs text-foreground/50">
              Loading media library...
            </Card>
          ) : filteredMedia.length === 0 ? (
            <Card variant="glass" className="p-12 text-center space-y-2">
              <ImageIcon className="h-8 w-8 text-neutral-400 mx-auto" />
              <p className="text-sm font-semibold text-foreground">No media assets found</p>
              <p className="text-xs text-foreground/50">Upload your first image to populate the library.</p>
            </Card>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {filteredMedia.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className={`group relative rounded-2xl overflow-hidden border cursor-pointer transition-all ${
                    selectedItem?.id === item.id
                      ? "ring-2 ring-accent-ember border-transparent shadow-lg"
                      : "border-neutral-200/80 dark:border-neutral-800 hover:border-neutral-400"
                  }`}
                >
                  <div className="aspect-square relative bg-neutral-100 dark:bg-neutral-900">
                    <Image
                      src={item.url}
                      alt={item.altText || item.fileName}
                      fill
                      unoptimized
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="p-2.5 bg-white/95 dark:bg-canvas-charcoal/95 backdrop-blur-sm border-t border-neutral-200/60 dark:border-neutral-800/60 space-y-0.5">
                    <p className="font-display text-[11px] font-bold text-foreground truncate">
                      {item.fileName}
                    </p>
                    <div className="flex items-center justify-between text-[10px] font-mono text-foreground/50">
                      <span>{formatFileSize(item.sizeBytes)}</span>
                      {item.width && item.height && (
                        <span>{item.width}×{item.height}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Selected Image Detail Sidebar (4 cols) */}
        <div className="lg:col-span-4">
          {selectedItem ? (
            <Card variant="glass" className="p-5 space-y-5 border border-neutral-200/80 dark:border-neutral-800">
              <div className="aspect-square relative rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800">
                <Image
                  src={selectedItem.url}
                  alt={selectedItem.altText || selectedItem.fileName}
                  fill
                  unoptimized
                  className="object-contain"
                />
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-mono text-foreground/50 uppercase text-[10px]">File Name</label>
                  <p className="font-display font-bold text-foreground truncate mt-0.5">
                    {selectedItem.fileName}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-foreground/75 font-mono text-[11px]">
                  <div>
                    <span className="text-foreground/45 block text-[10px]">Dimensions:</span>
                    <span>{selectedItem.width && selectedItem.height ? `${selectedItem.width} × ${selectedItem.height} px` : "Dynamic / SVG"}</span>
                  </div>
                  <div>
                    <span className="text-foreground/45 block text-[10px]">File Size:</span>
                    <span>{formatFileSize(selectedItem.sizeBytes)}</span>
                  </div>
                </div>

                <div>
                  <span className="text-foreground/45 block text-[10px] font-mono">Public URL:</span>
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      type="text"
                      readOnly
                      value={selectedItem.url}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-warm-100 dark:bg-neutral-800 text-[11px] font-mono text-foreground/80 truncate border border-neutral-200 dark:border-neutral-700 select-all"
                    />
                    <button
                      onClick={() => copyToClipboard(selectedItem.url, selectedItem.id)}
                      className="p-1.5 rounded-lg bg-warm-200 dark:bg-neutral-700 text-foreground hover:bg-accent-ember hover:text-white transition-colors shrink-0"
                      title="Copy URL"
                    >
                      {copiedId === selectedItem.id ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-neutral-200/70 dark:border-neutral-800/70">
                  <a
                    href={selectedItem.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-accent-ember hover:underline"
                  >
                    <span>Full Resolution</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>

                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleDelete(selectedItem.id)}
                    className="h-8 px-2 text-red-500 hover:text-red-600 hover:bg-red-500/10"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>Delete</span>
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            <Card variant="glass" className="p-8 text-center text-xs text-foreground/50 border border-neutral-200 dark:border-neutral-800">
              Select an image from the library to view details and copy URL.
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
