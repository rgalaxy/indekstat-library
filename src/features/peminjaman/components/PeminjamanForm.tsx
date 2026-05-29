import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { Peminjaman } from "@/features/peminjaman/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const schema = z.object({
  id_anggota: z.string().min(1, "ID anggota wajib diisi"),
  tgl_pinjam: z.string().min(1, "Tanggal pinjam wajib diisi"),
  tgl_hrs_kembali: z.string().min(1, "Tanggal harus kembali wajib diisi"),
  jaminan: z.string().min(1, "Jaminan wajib diisi"),
});

type FormValues = z.infer<typeof schema>;

interface PeminjamanFormProps {
  defaultValues?: Peminjaman;
  onSubmit: (values: FormValues) => void;
  isLoading?: boolean;
}

export const PeminjamanForm = ({
  defaultValues,
  onSubmit,
  isLoading,
}: PeminjamanFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues
      ? {
          id_anggota: defaultValues.id_anggota,
          tgl_pinjam: defaultValues.tgl_pinjam.slice(0, 10),
          tgl_hrs_kembali: defaultValues.tgl_hrs_kembali.slice(0, 10),
          jaminan: defaultValues.jaminan,
        }
      : undefined,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
      <div className="space-y-1">
        <Label htmlFor="jaminan">Jaminan 🪙</Label>
        <Input
          id="jaminan"
          {...register("jaminan")}
          placeholder="Jaminan yang diserahkan"
          className="rounded-xl"
        />
        {errors.jaminan && (
          <p className="text-red-500 text-xs">{errors.jaminan.message}</p>
        )}
      </div>
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600"
      >
        {isLoading ? "Menyimpan..." : "💾 Simpan"}
      </Button>
    </form>
  );
};
