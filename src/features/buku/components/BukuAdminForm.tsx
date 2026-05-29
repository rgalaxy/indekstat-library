import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { Buku } from "@/features/buku/types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const schema = z.object({
  isbn: z.string().min(1, "ISBN wajib diisi"),
  judul_buku: z.string().min(1, "Judul wajib diisi"),
  id_kategori_buku: z.string().min(1, "Kategori wajib diisi"),
  id_penulis_buku: z.string().min(1, "Penulis wajib diisi"),
  id_penerbit_buku: z.string().min(1, "Penerbit wajib diisi"),
  tahun_terbit: z.string().min(4, "Tahun wajib diisi"),
  stok_buku: z.number().min(0, "Stok tidak boleh negatif"),
  rak_buku: z.string().min(1, "Rak wajib diisi"),
  deskripsi_buku: z.string().min(1, "Deskripsi wajib diisi"),
  kondisi_buku: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

interface BukuAdminFormProps {
  defaultValues?: Buku;
  onSubmit: (values: FormValues) => void;
  isLoading?: boolean;
}

export const BukuAdminForm = ({
  defaultValues,
  onSubmit,
  isLoading,
}: BukuAdminFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues
      ? {
          isbn: defaultValues.isbn,
          judul_buku: defaultValues.judul_buku,
          id_kategori_buku: defaultValues.id_kategori_buku,
          id_penulis_buku: defaultValues.id_penulis_buku,
          id_penerbit_buku: defaultValues.id_penerbit_buku,
          tahun_terbit: defaultValues.tahun_terbit,
          stok_buku: defaultValues.stok_buku,
          rak_buku: defaultValues.rak_buku,
          deskripsi_buku: defaultValues.deskripsi_buku,
          kondisi_buku: defaultValues.kondisi_buku ?? "",
        }
      : undefined,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1 col-span-2">
          <Label htmlFor="judul_buku">Judul Buku 📖</Label>
          <Input
            id="judul_buku"
            {...register("judul_buku")}
            placeholder="Judul buku"
            className="rounded-xl"
          />
          {errors.judul_buku && (
            <p className="text-red-500 text-xs">{errors.judul_buku.message}</p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="isbn">ISBN</Label>
          <Input
            id="isbn"
            {...register("isbn")}
            placeholder="978-xxx"
            className="rounded-xl"
          />
          {errors.isbn && (
            <p className="text-red-500 text-xs">{errors.isbn.message}</p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="tahun_terbit">Tahun Terbit 📅</Label>
          <Input
            id="tahun_terbit"
            {...register("tahun_terbit")}
            placeholder="2024"
            className="rounded-xl"
          />
          {errors.tahun_terbit && (
            <p className="text-red-500 text-xs">
              {errors.tahun_terbit.message}
            </p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="id_kategori_buku">ID Kategori</Label>
          <Input
            id="id_kategori_buku"
            {...register("id_kategori_buku")}
            placeholder="ID kategori"
            className="rounded-xl"
          />
          {errors.id_kategori_buku && (
            <p className="text-red-500 text-xs">
              {errors.id_kategori_buku.message}
            </p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="id_penulis_buku">ID Penulis ✍️</Label>
          <Input
            id="id_penulis_buku"
            {...register("id_penulis_buku")}
            placeholder="ID penulis"
            className="rounded-xl"
          />
          {errors.id_penulis_buku && (
            <p className="text-red-500 text-xs">
              {errors.id_penulis_buku.message}
            </p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="id_penerbit_buku">ID Penerbit 🏢</Label>
          <Input
            id="id_penerbit_buku"
            {...register("id_penerbit_buku")}
            placeholder="ID penerbit"
            className="rounded-xl"
          />
          {errors.id_penerbit_buku && (
            <p className="text-red-500 text-xs">
              {errors.id_penerbit_buku.message}
            </p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="stok_buku">Stok 📦</Label>
          <Input
            id="stok_buku"
            type="number"
            min={0}
            {...register("stok_buku", { valueAsNumber: true })}
            placeholder="0"
            className="rounded-xl"
          />
          {errors.stok_buku && (
            <p className="text-red-500 text-xs">{errors.stok_buku.message}</p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="rak_buku">Rak 🗄️</Label>
          <Input
            id="rak_buku"
            {...register("rak_buku")}
            placeholder="A1, B2..."
            className="rounded-xl"
          />
          {errors.rak_buku && (
            <p className="text-red-500 text-xs">{errors.rak_buku.message}</p>
          )}
        </div>
        <div className="space-y-1 col-span-2">
          <Label htmlFor="kondisi_buku">Kondisi</Label>
          <Input
            id="kondisi_buku"
            {...register("kondisi_buku")}
            placeholder="Baik, Rusak..."
            className="rounded-xl"
          />
        </div>
        <div className="space-y-1 col-span-2">
          <Label htmlFor="deskripsi_buku">Deskripsi 📝</Label>
          <Textarea
            id="deskripsi_buku"
            {...register("deskripsi_buku")}
            placeholder="Tentang buku ini..."
            className="rounded-xl"
            rows={3}
          />
          {errors.deskripsi_buku && (
            <p className="text-red-500 text-xs">
              {errors.deskripsi_buku.message}
            </p>
          )}
        </div>
      </div>
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
      >
        {isLoading ? "Menyimpan..." : "💾 Simpan"}
      </Button>
    </form>
  );
};
