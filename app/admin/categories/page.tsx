"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useAdmin, type AdminCategory } from "@/store/admin";
import { useMounted } from "@/hooks/use-mounted";
import { AdminPageHeader } from "@/components/admin/widgets";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { slugify } from "@/lib/utils";

const emptyForm = { name: "", slug: "", icon: "🛒", productCount: 0 };

export default function AdminCategoriesPage() {
  const mounted = useMounted();
  const { categories, products, addCategory, updateCategory, deleteCategory } =
    useAdmin();

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<AdminCategory | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [confirmDelete, setConfirmDelete] = useState<AdminCategory | null>(null);

  function openAdd() {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  }
  function openEdit(c: AdminCategory) {
    setEditing(c);
    setForm({ name: c.name, slug: c.slug, icon: c.icon, productCount: c.productCount });
    setModalOpen(true);
  }
  function save() {
    if (!form.name.trim()) {
      toast.error("Category name is required");
      return;
    }
    const payload = { ...form, slug: form.slug || slugify(form.name) };
    if (editing) {
      updateCategory(editing.id, payload);
      toast.success("Category updated");
    } else {
      addCategory(payload);
      toast.success("Category added");
    }
    setModalOpen(false);
  }

  const liveCount = (slug: string) =>
    mounted ? products.filter((p) => p.category === slug).length : 0;

  return (
    <div>
      <AdminPageHeader
        title="Categories"
        subtitle={mounted ? `${categories.length} categories` : "Loading…"}
        action={
          <Button onClick={openAdd}>
            <Plus className="h-4 w-4" /> Add Category
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <AnimatePresence initial={false}>
          {(mounted ? categories : []).map((c) => (
            <motion.div
              key={c.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="group rounded-2xl border border-border bg-card p-5 shadow-soft"
            >
              <div className="flex items-start justify-between">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary text-2xl">
                  {c.icon}
                </span>
                <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                  <button
                    onClick={() => openEdit(c)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-primary"
                    aria-label="Edit"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setConfirmDelete(c)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                    aria-label="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <h3 className="mt-4 font-display text-lg font-bold">{c.name}</h3>
              <p className="text-sm text-muted-foreground">/{c.slug}</p>
              <p className="mt-3 inline-flex rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                {liveCount(c.slug)} live products
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? "Edit Category" : "Add Category"}
      >
        <div className="space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Name
            </span>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. Frozen Foods"
              className={inputCls}
            />
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Slug (optional)
              </span>
              <input
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                placeholder="auto from name"
                className={inputCls}
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Icon (emoji)
              </span>
              <input
                value={form.icon}
                onChange={(e) => setForm({ ...form, icon: e.target.value })}
                className={inputCls}
              />
            </label>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={save}>{editing ? "Save" : "Add"}</Button>
          </div>
        </div>
      </Modal>

      <Modal
        open={!!confirmDelete}
        onClose={() => setConfirmDelete(null)}
        title="Delete category?"
        description="Products in it won't be deleted."
      >
        <p className="text-sm text-muted-foreground">
          Delete{" "}
          <span className="font-semibold text-foreground">
            {confirmDelete?.name}
          </span>
          ?
        </p>
        <div className="mt-5 flex justify-end gap-2">
          <Button variant="outline" onClick={() => setConfirmDelete(null)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              if (confirmDelete) {
                deleteCategory(confirmDelete.id);
                toast.success("Category deleted");
              }
              setConfirmDelete(null);
            }}
          >
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
}

const inputCls =
  "h-11 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20";
