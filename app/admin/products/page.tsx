"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, Pencil, Trash2, Package } from "lucide-react";
import { toast } from "sonner";
import { useAdmin, type AdminProduct } from "@/store/admin";
import { useMounted } from "@/hooks/use-mounted";
import { AdminPageHeader, Panel } from "@/components/admin/widgets";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Badge } from "@/components/ui/badge";
import { formatPrice, cn } from "@/lib/utils";

const emptyForm: Omit<AdminProduct, "id"> = {
  name: "",
  category: "fruits",
  price: 0,
  salePrice: undefined,
  unit: "per kg",
  stockCount: 0,
  inStock: true,
  image:
    "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=900&q=80&auto=format&fit=crop",
  rating: 4.5,
  organic: false,
};

export default function AdminProductsPage() {
  const mounted = useMounted();
  const { products, categories, addProduct, updateProduct, deleteProduct } =
    useAdmin();

  const [query, setQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<AdminProduct | null>(null);
  const [form, setForm] = useState<Omit<AdminProduct, "id">>(emptyForm);
  const [confirmDelete, setConfirmDelete] = useState<AdminProduct | null>(null);

  const filtered = useMemo(() => {
    if (!mounted) return [];
    return products.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase()),
    );
  }, [products, query, mounted]);

  function openAdd() {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  }

  function openEdit(p: AdminProduct) {
    setEditing(p);
    const { id, ...rest } = p;
    setForm(rest);
    setModalOpen(true);
  }

  function save() {
    if (!form.name.trim()) {
      toast.error("Product name is required");
      return;
    }
    if (editing) {
      updateProduct(editing.id, form);
      toast.success("Product updated");
    } else {
      addProduct(form);
      toast.success("Product added");
    }
    setModalOpen(false);
  }

  return (
    <div>
      <AdminPageHeader
        title="Products"
        subtitle={mounted ? `${products.length} products in your catalogue` : "Loading…"}
        action={
          <Button onClick={openAdd}>
            <Plus className="h-4 w-4" /> Add Product
          </Button>
        }
      />

      <Panel>
        <div className="flex items-center justify-between gap-3 border-b border-border p-4">
          <div className="relative w-full max-w-sm">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products…"
              className="h-10 w-full rounded-full border border-border bg-secondary/50 pl-11 pr-4 text-sm outline-none focus:border-primary focus:bg-background"
            />
          </div>
          <span className="hidden text-sm text-muted-foreground sm:block">
            {filtered.length} shown
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted-foreground">
                <th className="px-5 py-3 font-medium">Product</th>
                <th className="px-5 py-3 font-medium">Category</th>
                <th className="px-5 py-3 font-medium">Price</th>
                <th className="px-5 py-3 font-medium">Stock</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence initial={false}>
                {filtered.map((p) => (
                  <motion.tr
                    key={p.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, backgroundColor: "rgba(255,0,0,0.05)" }}
                    className="border-b border-border last:border-0 hover:bg-secondary/40"
                  >
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-border">
                          <Image src={p.image} alt={p.name} fill sizes="40px" className="object-cover" />
                        </div>
                        <span className="line-clamp-1 font-medium">{p.name}</span>
                        {p.organic && <span title="Organic">🌿</span>}
                      </div>
                    </td>
                    <td className="px-5 py-3 capitalize text-muted-foreground">
                      {p.category.replace("-", " ")}
                    </td>
                    <td className="px-5 py-3">
                      <span className="font-semibold">
                        {formatPrice(p.salePrice ?? p.price)}
                      </span>
                      {p.salePrice && (
                        <span className="ml-1 text-xs text-muted-foreground line-through">
                          {formatPrice(p.price)}
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={cn(
                          "font-medium",
                          p.stockCount < 90 && "text-amber-600",
                        )}
                      >
                        {p.stockCount}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <Badge variant={p.inStock ? "success" : "outline"}>
                        {p.inStock ? "In stock" : "Out"}
                      </Badge>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => openEdit(p)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-primary"
                          aria-label="Edit"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setConfirmDelete(p)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                          aria-label="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>

          {mounted && filtered.length === 0 && (
            <div className="flex flex-col items-center gap-2 py-16 text-center">
              <Package className="h-9 w-9 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">No products found.</p>
            </div>
          )}
        </div>
      </Panel>

      {/* Add / Edit modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? "Edit Product" : "Add Product"}
        description={editing ? `Editing ${editing.name}` : "Create a new catalogue item"}
      >
        <div className="space-y-4">
          <Field label="Product name">
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. Organic Royal Gala Apples"
              className={inputCls}
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Category">
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value as AdminProduct["category"] })}
                className={inputCls}
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Unit">
              <input
                value={form.unit}
                onChange={(e) => setForm({ ...form, unit: e.target.value })}
                placeholder="per kg / 500 g"
                className={inputCls}
              />
            </Field>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Field label="Price (₹)">
              <input
                type="number"
                value={form.price || ""}
                onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                className={inputCls}
              />
            </Field>
            <Field label="Sale price (₹)">
              <input
                type="number"
                value={form.salePrice ?? ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    salePrice: e.target.value ? Number(e.target.value) : undefined,
                  })
                }
                className={inputCls}
              />
            </Field>
            <Field label="Stock">
              <input
                type="number"
                value={form.stockCount || ""}
                onChange={(e) => setForm({ ...form, stockCount: Number(e.target.value) })}
                className={inputCls}
              />
            </Field>
          </div>

          <Field label="Image URL">
            <input
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              className={inputCls}
            />
          </Field>

          <div className="flex gap-6">
            <label className="flex items-center gap-2 text-sm font-medium">
              <input
                type="checkbox"
                checked={form.inStock}
                onChange={(e) => setForm({ ...form, inStock: e.target.checked })}
                className="h-4 w-4 accent-primary"
              />
              In stock
            </label>
            <label className="flex items-center gap-2 text-sm font-medium">
              <input
                type="checkbox"
                checked={form.organic}
                onChange={(e) => setForm({ ...form, organic: e.target.checked })}
                className="h-4 w-4 accent-primary"
              />
              Organic 🌿
            </label>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={save}>
              {editing ? "Save changes" : "Add product"}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete confirm */}
      <Modal
        open={!!confirmDelete}
        onClose={() => setConfirmDelete(null)}
        title="Delete product?"
        description="This action cannot be undone."
      >
        <p className="text-sm text-muted-foreground">
          Are you sure you want to delete{" "}
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
                deleteProduct(confirmDelete.id);
                toast.success("Product deleted");
              }
              setConfirmDelete(null);
            }}
          >
            <Trash2 className="h-4 w-4" /> Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
}

const inputCls =
  "h-11 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}
