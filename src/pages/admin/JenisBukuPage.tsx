import { useState, useEffect } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  loadJenisBuku,
  addJenisBuku,
  editJenisBuku,
  removeJenisBuku,
} from "@/features/jenisBuku/slices/jenisBukuSlice";
import type { JenisBuku } from "@/features/jenisBuku/types";
import { JenisBukuForm } from "@/features/jenisBuku/components/JenisBukuForm";
import { DataTable } from "@/shared/components/DataTable";
import { FormModal } from "@/shared/components/FormModal";
import { ConfirmDialog } from "@/shared/components/ConfirmDialog";
import { PageHeader } from "@/shared/components/PageHeader";
import { Button } from "@/components/ui/button";

export const JenisBukuPage = () => {
  const dispatch = useAppDispatch();
  const { items, isLoading } = useAppSelector((s) => s.jenisBuku);

  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<JenisBuku | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<JenisBuku | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    dispatch(loadJenisBuku(undefined));
  }, [dispatch]);

  const filtered = items.filter((j) =>
    j.jenis_buku.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSubmit = async (values: {
    jenis_buku: string;
    deskripsi: string;
  }) => {
    setSaving(true);
    try {
      if (editTarget) {
        const result = await dispatch(
          editJenisBuku({ id: editTarget.id, ...values }),
        );
        if (editJenisBuku.fulfilled.match(result)) {
          toast.success("Jenis buku berhasil diubah! 🎉");
          setModalOpen(false);
          setEditTarget(null);
        } else {
          toast.error("Gagal mengubah jenis buku 😢");
        }
      } else {
        const result = await dispatch(addJenisBuku(values));
        if (addJenisBuku.fulfilled.match(result)) {
          toast.success("Jenis buku berhasil ditambah! 🎉");
          setModalOpen(false);
        } else {
          toast.error("Gagal menambah jenis buku 😢");
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
      const result = await dispatch(removeJenisBuku({ id: deleteTarget.id }));
      if (removeJenisBuku.fulfilled.match(result)) {
        toast.success("Jenis buku berhasil dihapus! 🗑️");
      } else {
        toast.error("Gagal menghapus jenis buku 😢");
      }
    } finally {
      setSaving(false);
      setDeleteTarget(null);
    }
  };

  const columns = [
    { key: "jenis_buku", header: "Nama Jenis" },
    { key: "deskripsi", header: "Deskripsi", className: "max-w-xs truncate" },
    {
      key: "updated_at",
      header: "Diperbarui",
      render: (row: JenisBuku) =>
        new Date(row.updated_at).toLocaleDateString("id-ID"),
    },
  ];

  return (
    <div className="space-y-4">
      <PageHeader
        title="Jenis Buku"
        subtitle="Kelola kategori jenis buku perpustakaan"
        emoji="🏷️"
        action={
          <Button
            onClick={() => {
              setEditTarget(null);
              setModalOpen(true);
            }}
            className="rounded-xl bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 gap-2"
          >
            <Plus className="w-4 h-4" />
            Tambah Jenis Buku
          </Button>
        }
      />

      <DataTable
        data={filtered as unknown as Record<string, unknown>[]}
        columns={columns as Parameters<typeof DataTable>[0]["columns"]}
        isLoading={isLoading}
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Cari jenis buku..."
        actions={(row) => {
          const item = row as unknown as JenisBuku;
          return (
            <div className="flex items-center justify-end gap-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  setEditTarget(item);
                  setModalOpen(true);
                }}
                className="rounded-lg hover:bg-violet-50 hover:text-violet-600"
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
        title={editTarget ? "✏️ Edit Jenis Buku" : "➕ Tambah Jenis Buku"}
      >
        <JenisBukuForm
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
        description={`Hapus jenis buku "${deleteTarget?.jenis_buku}"?`}
      />
    </div>
  );
};
