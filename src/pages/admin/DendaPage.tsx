import { useState, useEffect } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  loadDenda,
  addDenda,
  editDenda,
  removeDenda,
} from "@/features/denda/slices/dendaSlice";
import type { Denda } from "@/features/denda/types";
import { DendaForm } from "@/features/denda/components/DendaForm";
import { DataTable } from "@/shared/components/DataTable";
import { FormModal } from "@/shared/components/FormModal";
import { ConfirmDialog } from "@/shared/components/ConfirmDialog";
import { PageHeader } from "@/shared/components/PageHeader";
import { Button } from "@/components/ui/button";

export const DendaPage = () => {
  const dispatch = useAppDispatch();
  const { items, isLoading } = useAppSelector((s) => s.denda);

  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Denda | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Denda | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    dispatch(loadDenda());
  }, [dispatch]);

  const filtered = items.filter(
    (d) =>
      d.id_anggota.toLowerCase().includes(search.toLowerCase()) ||
      d.id_peminjaman.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSubmit = async (values: {
    id_peminjaman: string;
    id_anggota: string;
    jumlah_denda: number;
    tgl_pinjam: string;
    tgl_hrs_kembali: string;
    tgl_kembali: string;
  }) => {
    setSaving(true);
    try {
      if (editTarget) {
        const result = await dispatch(
          editDenda({ id_denda: editTarget.id_denda, ...values }),
        );
        if (editDenda.fulfilled.match(result)) {
          toast.success("Denda berhasil diubah! 🎉");
          setModalOpen(false);
          setEditTarget(null);
        } else {
          toast.error("Gagal mengubah denda 😢");
        }
      } else {
        const result = await dispatch(addDenda(values));
        if (addDenda.fulfilled.match(result)) {
          toast.success("Denda berhasil ditambah! 🎉");
          setModalOpen(false);
        } else {
          toast.error("Gagal menambah denda 😢");
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
        removeDenda({ id_denda: deleteTarget.id_denda }),
      );
      if (removeDenda.fulfilled.match(result)) {
        toast.success("Denda berhasil dihapus! 🗑️");
      } else {
        toast.error("Gagal menghapus denda 😢");
      }
    } finally {
      setSaving(false);
      setDeleteTarget(null);
    }
  };

  const columns = [
    { key: "id_peminjaman", header: "ID Peminjaman" },
    { key: "id_anggota", header: "ID Anggota" },
    {
      key: "jumlah_denda",
      header: "Jumlah Denda",
      render: (row: Denda) =>
        new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          maximumFractionDigits: 0,
        }).format(row.jumlah_denda),
    },
    { key: "tgl_kembali", header: "Tgl Kembali" },
  ];

  return (
    <div className="space-y-4">
      <PageHeader
        title="Denda"
        subtitle="Kelola data denda keterlambatan pengembalian"
        emoji="⚠️"
        action={
          <Button
            onClick={() => {
              setEditTarget(null);
              setModalOpen(true);
            }}
            className="rounded-xl bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 gap-2"
          >
            <Plus className="w-4 h-4" />
            Tambah Denda
          </Button>
        }
      />

      <DataTable
        data={filtered as unknown as Record<string, unknown>[]}
        columns={columns as Parameters<typeof DataTable>[0]["columns"]}
        isLoading={isLoading}
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Cari ID anggota atau peminjaman..."
        actions={(row) => {
          const item = row as unknown as Denda;
          return (
            <div className="flex items-center justify-end gap-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  setEditTarget(item);
                  setModalOpen(true);
                }}
                className="rounded-lg hover:bg-red-50 hover:text-red-600"
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
        title={editTarget ? "✏️ Edit Denda" : "➕ Tambah Denda"}
      >
        <DendaForm
          key={editTarget?.id_denda ?? "new"}
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
        description={`Hapus denda untuk anggota "${deleteTarget?.id_anggota}"?`}
      />
    </div>
  );
};
