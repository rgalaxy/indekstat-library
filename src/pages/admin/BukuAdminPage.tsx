import { useState, useEffect } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  loadBuku,
  addBuku,
  editBuku,
  removeBuku,
} from "@/features/buku/slices/bukuSlice";
import type { Buku } from "@/features/buku/types";
import { BukuAdminForm } from "@/features/buku/components/BukuAdminForm";
import { DataTable } from "@/shared/components/DataTable";
import { FormModal } from "@/shared/components/FormModal";
import { ConfirmDialog } from "@/shared/components/ConfirmDialog";
import { PageHeader } from "@/shared/components/PageHeader";
import { Button } from "@/components/ui/button";

export const BukuAdminPage = () => {
  const dispatch = useAppDispatch();
  const { items, isLoading } = useAppSelector((s) => s.buku);

  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Buku | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Buku | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    dispatch(loadBuku());
  }, [dispatch]);

  const filtered = items.filter(
    (b) =>
      b.judul_buku.toLowerCase().includes(search.toLowerCase()) ||
      b.isbn.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSubmit = async (values: {
    isbn: string;
    judul_buku: string;
    id_kategori_buku: string;
    id_penulis_buku: string;
    id_penerbit_buku: string;
    tahun_terbit: string;
    stok_buku: number;
    rak_buku: string;
    deskripsi_buku: string;
    kondisi_buku?: string;
  }) => {
    setSaving(true);
    try {
      if (editTarget) {
        const result = await dispatch(
          editBuku({ id_buku: editTarget.id_buku, ...values }),
        );
        if (editBuku.fulfilled.match(result)) {
          toast.success("Buku berhasil diubah! 🎉");
          setModalOpen(false);
          setEditTarget(null);
        } else {
          toast.error("Gagal mengubah buku 😢");
        }
      } else {
        const result = await dispatch(addBuku(values));
        if (addBuku.fulfilled.match(result)) {
          toast.success("Buku berhasil ditambah! 🎉");
          setModalOpen(false);
        } else {
          toast.error("Gagal menambah buku 😢");
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
      const result = await dispatch(
        removeBuku({ id_buku: deleteTarget.id_buku }),
      );
      if (removeBuku.fulfilled.match(result)) {
        toast.success("Buku berhasil dihapus! 🗑️");
      } else {
        toast.error("Gagal menghapus buku 😢");
      }
    } finally {
      setSaving(false);
      setDeleteTarget(null);
    }
  };

  const columns = [
    { key: "isbn", header: "ISBN" },
    { key: "judul_buku", header: "Judul", className: "max-w-xs" },
    { key: "stok_buku", header: "Stok" },
    { key: "rak_buku", header: "Rak" },
    { key: "tahun_terbit", header: "Tahun" },
  ];

  return (
    <div className="space-y-4">
      <PageHeader
        title="Kelola Buku"
        subtitle="Tambah, ubah, dan hapus data buku"
        emoji="📖"
        action={
          <Button
            onClick={() => {
              setEditTarget(null);
              setModalOpen(true);
            }}
            className="rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 gap-2"
          >
            <Plus className="w-4 h-4" />
            Tambah Buku
          </Button>
        }
      />

      <DataTable
        data={filtered as unknown as Record<string, unknown>[]}
        columns={columns as Parameters<typeof DataTable>[0]["columns"]}
        isLoading={isLoading}
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Cari judul atau ISBN..."
        actions={(row) => {
          const item = row as unknown as Buku;
          return (
            <div className="flex items-center justify-end gap-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  setEditTarget(item);
                  setModalOpen(true);
                }}
                className="rounded-lg hover:bg-indigo-50 hover:text-indigo-600"
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
        title={editTarget ? "✏️ Edit Buku" : "➕ Tambah Buku"}
      >
        <BukuAdminForm
          key={editTarget?.id_buku ?? "new"}
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
        description={`Hapus buku "${deleteTarget?.judul_buku}"?`}
      />
    </div>
  );
};
