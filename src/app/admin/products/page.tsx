"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Plus, Edit2, Trash2, ShoppingBag, Check, X } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface ProductItem {
  id: string;
  name: string;
  slug: string;
  category: string;
  status: string;
  price: string | null;
  shortDesc: string;
  order: number;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPrd, setEditingPrd] = useState<ProductItem | null>(null);

  const [form, setForm] = useState({
    name: "",
    slug: "",
    category: "Developer Starter Kit",
    status: "Coming Soon",
    price: "",
    shortDesc: "",
    order: 0,
  });

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/products");
      const data = await res.json();
      if (data.success) {
        setProducts(data.products);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const openCreateModal = () => {
    setEditingPrd(null);
    setForm({
      name: "",
      slug: "",
      category: "Developer Starter Kit",
      status: "Coming Soon",
      price: "",
      shortDesc: "",
      order: products.length,
    });
    setModalOpen(true);
  };

  const openEditModal = (p: ProductItem) => {
    setEditingPrd(p);
    setForm({
      name: p.name,
      slug: p.slug,
      category: p.category,
      status: p.status,
      price: p.price || "",
      shortDesc: p.shortDesc,
      order: p.order,
    });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = editingPrd ? "PUT" : "POST";
      const payload = {
        ...(editingPrd ? { id: editingPrd.id } : {}),
        ...form,
        order: Number(form.order),
      };

      const res = await fetch("/api/admin/products", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        setModalOpen(false);
        fetchProducts();
      } else {
        alert(data.message || "Failed to save product");
      }
    } catch {
      alert("Error saving product");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await fetch("/api/admin/products", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
      }
    } catch {
      alert("Failed to delete product");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Badge variant="peach">Digital Goods</Badge>
          <h1 className="font-display text-2xl font-bold text-foreground mt-1">
            Products & Templates ({products.length})
          </h1>
          <p className="text-xs text-foreground/60">
            Next.js kits, creator presets, and future digital asset releases.
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={openCreateModal}>
          <Plus className="h-4 w-4" />
          <span>Add Product</span>
        </Button>
      </div>

      {loading ? (
        <Card variant="glass" className="p-8 text-center text-xs text-foreground/50">
          Loading products...
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {products.map((prd) => (
            <Card
              key={prd.id}
              variant="glass"
              className="p-5 flex flex-col justify-between space-y-4 border border-neutral-200/80 dark:border-neutral-800"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-peach-100 dark:bg-peach-900/40 text-accent-ember font-semibold">
                    {prd.category}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-foreground/50">
                    {prd.status}
                  </span>
                </div>
                <h3 className="font-display text-base font-bold text-foreground">
                  {prd.name}
                </h3>
                <p className="text-xs text-foreground/60 line-clamp-2">
                  {prd.shortDesc}
                </p>
              </div>

              <div className="pt-3 border-t border-neutral-200/60 dark:border-neutral-800/60 flex items-center justify-between">
                <span className="text-xs font-mono font-semibold text-foreground">
                  {prd.price || "Free / Planned"}
                </span>

                <div className="flex items-center gap-1.5">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditModal(prd)}
                    className="h-8 px-2.5 text-xs"
                  >
                    <Edit2 className="h-3 w-3" />
                    <span>Edit</span>
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleDelete(prd.id)}
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
                <ShoppingBag className="h-5 w-5 text-accent-ember" />
                <h2 className="font-display text-lg font-bold text-foreground">
                  {editingPrd ? "Edit Product" : "Add Product"}
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
                <label className="font-mono text-foreground/70 uppercase">Product Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value, slug: editingPrd ? form.slug : e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-") })}
                  placeholder="MERN SaaS Starter Kit"
                  className="w-full px-3 py-2 rounded-xl bg-warm-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-foreground text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-mono text-foreground/70 uppercase">Category</label>
                  <input
                    type="text"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    placeholder="Developer Tool"
                    className="w-full px-3 py-2 rounded-xl bg-warm-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-foreground text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-foreground/70 uppercase">Status</label>
                  <input
                    type="text"
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    placeholder="Coming Soon / Available"
                    className="w-full px-3 py-2 rounded-xl bg-warm-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-foreground text-xs"
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
                  placeholder="Key features and who it is built for..."
                  className="w-full px-3 py-2 rounded-xl bg-warm-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-foreground text-xs resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-200 dark:border-neutral-800">
                <Button variant="secondary" size="sm" type="button" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit">
                  <Check className="h-4 w-4" />
                  <span>{editingPrd ? "Update" : "Save"}</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
