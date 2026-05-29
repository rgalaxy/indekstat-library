import { useState, useEffect } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  loadPenulis,
  addPenulis,
  editPenulis,
  removePenulis,
} from "@/features/penulisBuku/slices/penulisBukuSlice";
import type { PenulisBuku } from "@/features/penulisBuku/types";
import { PenulisForm } from "@/features/penulisBuku/components/PenulisForm";
import { DataTable } from "@/shared/components/DataTable";
import { FormModal } from "@/shared/components/FormModal";
import { ConfirmDialog } from "@/shared/components/ConfirmDialog";
import { PageHeader } from "@/shared/components/PageHeader";
import { Button } from "@/components/ui/button";

export const PenulisPage = () => {
  const dispatch = useAppDispatch();
  const { items, isLoading } = useAppSelector((s) => s.penulisBuku);

  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<PenulisBuku | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<PenulisBuku | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    dispatch(loadPenulis(undefined));
  }, [dispatch]);

  const filtered = items.filter((p) =>
    p.penulis_buku.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSubmit = async (values: {
    penulis_buku: string;
    alamat_penulis: string;
    email_penulis: string;
    deskripsi: string;
  }) => {
    setSaving(true);
    try {
      if (editTarget) {
        const result = await dispatch(
          editPenulis({ id: editTarget.id, ...values }),
        );
        if (editPenulis.fulfilled.match(result)) {
          toast.success("Penulis berhasil diubah! 🎉");
          setModalOpen(false);
          setEditTarget(null);
        } else {
          toast.error("Gagal mengubah penulis 😢");
        }
      } else {
        const result = await dispatch(addPenulis(values));
        if (addPenulis.fulfilled.match(result)) {
          toast.success("Penulis berhasil ditambah! 🎉");
          setModalOpen(false);
        } else {
          toast.error("Gagal menambah penulis 😢");
        }
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setSaving(true);
    try {
      const result = await dispatch(removePenulis({ id: deleteTarget.id }));
      if (removePenulis.fulfilled.match(result)) {
        toast.success("Penulis berhasil dihapus! 🗑️");
      } else {
        toast.error("Gagal menghapus penulis 😢");
      }
    } finally {
      setSaving(false);
      setDeleteTarget(null);
    }
  };

  const columns = [
    { key: "penulis_buku", header: "Nama Penulis" },
    { key: "alamat", header: "Alamat", className: "max-w-xs truncate" },
    { key: "email_penulis", header: "Email" },
  ];

  return (
    <div className="space-y-4">
      <PageHeader
        title="Penulis Buku"
        subtitle="Kelola data penulis buku perpustakaan"
        emoji="✍️"
        action={
          <Button
            onClick={() => {
              setEditTarget(null);
              setModalOpen(true);
            }}
            className="rounded-xl bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 gap-2"
          >
            <Plus className="w-4 h-4" />
            Tambah Penulis
          </Button>
        }
      />

      <DataTable
        data={filtered as unknown as Record<string, unknown>[]}
        columns={columns as Parameters<typeof DataTable>[0]["columns"]}
        isLoading={isLoading}
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Cari penulis..."
        actions={(row) => {
          const item = row as unknown as PenulisBuku;
          return (
            <div className="flex items-center justify-end gap-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  setEditTarget(item);
                  setModalOpen(true);
                }}
                className="rounded-lg hover:bg-green-50 hover:text-green-600"
              >
                <Pencil className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setDeleteTarget(item)}
                className="rounded-lg hover:bg-red-50 hover:text-red-600"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          );
        }}
      />

      <FormModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditTarget(null);
        }}
        title={editTarget ? "✏️ Edit Penulis" : "➕ Tambah Penulis"}
      >
        <PenulisForm
          key={editTarget?.id ?? "new"}
          defaultValues={editTarget ?? undefined}
          onSubmit={handleSubmit}
          isLoading={saving}
        />
      </FormModal>

      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        isLoading={saving}
        description={`Hapus penulis "${deleteTarget?.penulis_buku}"?`}
      />
    </div>
  );
};
