import { useState, useEffect } from "react";
import { Pencil, Trash2, Plus, Eye } from "lucide-react";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  loadPeminjaman,
  addPeminjaman,
  editPeminjaman,
  removePeminjaman,
  loadPeminjamanDetail,
} from "@/features/peminjaman/slices/peminjamanSlice";
import type { Peminjaman } from "@/features/peminjaman/types";
import { PeminjamanForm } from "@/features/peminjaman/components/PeminjamanForm";
import { PeminjamanDetailView } from "@/features/peminjaman/components/PeminjamanDetailView";
import { DataTable } from "@/shared/components/DataTable";
import { FormModal } from "@/shared/components/FormModal";
import { ConfirmDialog } from "@/shared/components/ConfirmDialog";
import { PageHeader } from "@/shared/components/PageHeader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const PeminjamanPage = () => {
  const dispatch = useAppDispatch();
  const { items, isLoading, selectedDetail } = useAppSelector(
    (s) => s.peminjaman,
  );

  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Peminjaman | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Peminjaman | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    dispatch(loadPeminjaman());
  }, [dispatch]);

  const filtered = items.filter((p) =>
    p.id_anggota.toLowerCase().includes(search.toLowerCase()),
  );

  const handleViewDetail = async (item: Peminjaman) => {
    await dispatch(loadPeminjamanDetail(item.id));
    setDetailOpen(true);
  };

  const handleSubmit = async (values: {
    id_anggota: string;
    tgl_pinjam: string;
    tgl_hrs_kembali: string;
    jaminan: string;
  }) => {
    setSaving(true);
    try {
      if (editTarget) {
        const result = await dispatch(
          editPeminjaman({ id_peminjaman: editTarget.id, ...values }),
        );
        if (editPeminjaman.fulfilled.match(result)) {
          toast.success("Peminjaman berhasil diubah! 🎉");
          setModalOpen(false);
          setEditTarget(null);
        } else {
          toast.error("Gagal mengubah peminjaman 😢");
        }
      } else {
        const result = await dispatch(addPeminjaman(values));
        if (addPeminjaman.fulfilled.match(result)) {
          toast.success("Peminjaman berhasil ditambah! 🎉");
          setModalOpen(false);
        } else {
          toast.error("Gagal menambah peminjaman 😢");
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
        removePeminjaman({ id_peminjaman: deleteTarget.id }),
      );
      if (removePeminjaman.fulfilled.match(result)) {
        toast.success("Peminjaman berhasil dihapus! 🗑️");
      } else {
        toast.error("Gagal menghapus peminjaman 😢");
      }
    } finally {
      setSaving(false);
      setDeleteTarget(null);
    }
  };

  const columns = [
    { key: "id_anggota", header: "ID Anggota" },
    { key: "tgl_pinjam", header: "Tgl Pinjam" },
    { key: "tgl_hrs_kembali", header: "Harus Kembali" },
    { key: "jaminan", header: "Jaminan" },
  ];

  return (
    <div className="space-y-4">
      <PageHeader
        title="Peminjaman"
        subtitle="Kelola data peminjaman buku"
        emoji="📋"
        action={
          <Button
            onClick={() => {
              setEditTarget(null);
              setModalOpen(true);
            }}
            className="rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 gap-2"
          >
            <Plus className="w-4 h-4" />
            Tambah Peminjaman
          </Button>
        }
      />

      <DataTable
        data={filtered as unknown as Record<string, unknown>[]}
        columns={columns as Parameters<typeof DataTable>[0]["columns"]}
        isLoading={isLoading}
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Cari ID anggota..."
        actions={(row) => {
          const item = row as unknown as Peminjaman;
          return (
            <div className="flex items-center justify-end gap-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleViewDetail(item)}
                className="rounded-lg hover:bg-teal-50 hover:text-teal-600"
              >
                <Eye className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  setEditTarget(item);
                  setModalOpen(true);
                }}
                className="rounded-lg hover:bg-blue-50 hover:text-blue-600"
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
        title={editTarget ? "✏️ Edit Peminjaman" : "➕ Tambah Peminjaman"}
      >
        <PeminjamanForm
          key={editTarget?.id ?? "new"}
          defaultValues={editTarget ?? undefined}
          onSubmit={handleSubmit}
          isLoading={saving}
        />
      </FormModal>

      <Dialog
        open={detailOpen}
        onOpenChange={(open) => {
          if (!open) setDetailOpen(false);
        }}
      >
        <DialogContent className="rounded-2xl max-w-md">
          <DialogHeader>
            <DialogTitle>📋 Detail Peminjaman</DialogTitle>
          </DialogHeader>
          {selectedDetail && <PeminjamanDetailView detail={selectedDetail} />}
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        isLoading={saving}
        description={`Hapus peminjaman anggota "${deleteTarget?.id_anggota}"?`}
      />
    </div>
  );
};
