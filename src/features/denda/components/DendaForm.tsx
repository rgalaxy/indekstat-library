import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { Denda } from "@/features/denda/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const schema = z.object({
  id_peminjaman: z.string().min(1, "ID peminjaman wajib diisi"),
  id_anggota: z.string().min(1, "ID anggota wajib diisi"),
  jumlah_denda: z.number().min(0, "Jumlah denda tidak boleh negatif"),
  tgl_pinjam: z.string().min(1, "Tanggal pinjam wajib diisi"),
  tgl_hrs_kembali: z.string().min(1, "Tanggal harus kembali wajib diisi"),
  tgl_kembali: z.string().min(1, "Tanggal kembali wajib diisi"),
});

type FormValues = z.infer<typeof schema>;

interface DendaFormProps {
  defaultValues?: Denda;
  onSubmit: (values: FormValues) => void;
  isLoading?: boolean;
}

export const DendaForm = ({
  defaultValues,
  onSubmit,
  isLoading,
}: DendaFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues
      ? {
          id_peminjaman: defaultValues.id_peminjaman,
          id_anggota: defaultValues.id_anggota,
          jumlah_denda: defaultValues.jumlah_denda,
          tgl_pinjam: defaultValues.tgl_pinjam.slice(0, 10),
          tgl_hrs_kembali: defaultValues.tgl_hrs_kembali.slice(0, 10),
          tgl_kembali: defaultValues.tgl_kembali.slice(0, 10),
        }
      : undefined,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <Label htmlFor="id_peminjaman">ID Peminjaman 📋</Label>
          <Input
            id="id_peminjaman"
            {...register("id_peminjaman")}
            placeholder="ID peminjaman"
            className="rounded-xl"
          />
          {errors.id_peminjaman && (
            <p className="text-red-500 text-xs">
              {errors.id_peminjaman.message}
            </p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="id_anggota">ID Anggota 👤</Label>
          <Input
            id="id_anggota"
            {...register("id_anggota")}
            placeholder="ID anggota"
            className="rounded-xl"
          />
          {errors.id_anggota && (
            <p className="text-red-500 text-xs">{errors.id_anggota.message}</p>
          )}
        </div>
        <div className="space-y-1 col-span-2">
          <Label htmlFor="jumlah_denda">Jumlah Denda (Rp) 💰</Label>
          <Input
            id="jumlah_denda"
            type="number"
            min={0}
            {...register("jumlah_denda", { valueAsNumber: true })}
            placeholder="0"
            className="rounded-xl"
          />
          {errors.jumlah_denda && (
            <p className="text-red-500 text-xs">
              {errors.jumlah_denda.message}
            </p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="tgl_pinjam">Tanggal Pinjam 📅</Label>
          <Input
            id="tgl_pinjam"
            type="date"
            {...register("tgl_pinjam")}
            className="rounded-xl"
          />
          {errors.tgl_pinjam && (
            <p className="text-red-500 text-xs">{errors.tgl_pinjam.message}</p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="tgl_hrs_kembali">Harus Kembali 📅</Label>
          <Input
            id="tgl_hrs_kembali"
            type="date"
            {...register("tgl_hrs_kembali")}
            className="rounded-xl"
          />
          {errors.tgl_hrs_kembali && (
            <p className="text-red-500 text-xs">
              {errors.tgl_hrs_kembali.message}
            </p>
          )}
        </div>
        <div className="space-y-1 col-span-2">
          <Label htmlFor="tgl_kembali">Tanggal Kembali 📅</Label>
          <Input
            id="tgl_kembali"
            type="date"
            {...register("tgl_kembali")}
            className="rounded-xl"
          />
          {errors.tgl_kembali && (
            <p className="text-red-500 text-xs">{errors.tgl_kembali.message}</p>
          )}
        </div>
      </div>
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-xl bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
      >
        {isLoading ? "Menyimpan..." : "💾 Simpan"}
      </Button>
    </form>
  );
};
