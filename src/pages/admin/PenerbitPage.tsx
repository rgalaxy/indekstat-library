import { useState, useEffect } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  loadPenerbit,
  addPenerbit,
  editPenerbit,
  removePenerbit,
} from "@/features/penerbitBuku/slices/penerbitBukuSlice";
import type { PenerbitBuku } from "@/features/penerbitBuku/types";
import { PenerbitForm } from "@/features/penerbitBuku/components/PenerbitForm";
import { DataTable } from "@/shared/components/DataTable";
import { FormModal } from "@/shared/components/FormModal";
import { ConfirmDialog } from "@/shared/components/ConfirmDialog";
import { PageHeader } from "@/shared/components/PageHeader";
import { Button } from "@/components/ui/button";

export const PenerbitPage = () => {
  const dispatch = useAppDispatch();
  const { items, isLoading } = useAppSelector((s) => s.penerbitBuku);

  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<PenerbitBuku | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<PenerbitBuku | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    dispatch(loadPenerbit(undefined));
  }, [dispatch]);

  const filtered = items.filter((p) =>
    p.penerbit_buku.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSubmit = async (values: {
    penerbit_buku: string;
    alamat_penerbit: string;
    telp_penerbit: string;
    email_penerbit: string;
    deskripsi: string;
  }) => {
    setSaving(true);
    try {
      if (editTarget) {
        const result = await dispatch(
          editPenerbit({ id: editTarget.id, ...values }),
        );
        if (editPenerbit.fulfilled.match(result)) {
          toast.success("Penerbit berhasil diubah! 🎉");
          setModalOpen(false);
          setEditTarget(null);
        } else {
          toast.error("Gagal mengubah penerbit 😢");
        }
      } else {
        const result = await dispatch(addPenerbit(values));
        if (addPenerbit.fulfilled.match(result)) {
          toast.success("Penerbit berhasil ditambah! 🎉");
          setModalOpen(false);
        } else {
          toast.error("Gagal menambah penerbit 😢");
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
      const result = await dispatch(removePenerbit({ id: deleteTarget.id }));
      if (removePenerbit.fulfilled.match(result)) {
        toast.success("Penerbit berhasil dihapus! 🗑️");
      } else {
        toast.error("Gagal menghapus penerbit 😢");
      }
    } finally {
      setSaving(false);
      setDeleteTarget(null);
    }
  };

  const columns = [
    { key: "penerbit_buku", header: "Nama Penerbit" },
    {
      key: "alamat_penerbit",
      header: "Alamat",
      className: "max-w-xs truncate",
    },
    { key: "telp_penerbit", header: "Telepon" },
    { key: "email_penerbit", header: "Email" },
  ];

  return (
    <div className="space-y-4">
      <PageHeader
        title="Penerbit Buku"
        subtitle="Kelola data penerbit buku perpustakaan"
        emoji="🏢"
        action={
          <Button
            onClick={() => {
              setEditTarget(null);
              setModalOpen(true);
            }}
            className="rounded-xl bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 gap-2"
          >
            <Plus className="w-4 h-4" />
            Tambah Penerbit
          </Button>
        }
      />

      <DataTable
        data={filtered as unknown as Record<string, unknown>[]}
        columns={columns as Parameters<typeof DataTable>[0]["columns"]}
        isLoading={isLoading}
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Cari penerbit..."
        actions={(row) => {
          const item = row as unknown as PenerbitBuku;
          return (
            <div className="flex items-center justify-end gap-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  setEditTarget(item);
                  setModalOpen(true);
                }}
                className="rounded-lg hover:bg-orange-50 hover:text-orange-600"
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
        title={editTarget ? "✏️ Edit Penerbit" : "➕ Tambah Penerbit"}
      >
        <PenerbitForm
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
        description={`Hapus penerbit "${deleteTarget?.penerbit_buku}"?`}
      />
    </div>
  );
};
