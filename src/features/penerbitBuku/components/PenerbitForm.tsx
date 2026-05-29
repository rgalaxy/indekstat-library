import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { PenerbitBuku } from "@/features/penerbitBuku/types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const schema = z.object({
  penerbit_buku: z.string().min(1, "Nama penerbit wajib diisi"),
  alamat_penerbit: z.string().min(1, "Alamat wajib diisi"),
  telp_penerbit: z.string().min(1, "Telepon wajib diisi"),
  email_penerbit: z.string().email("Email tidak valid"),
  deskripsi: z.string().min(1, "Deskripsi wajib diisi"),
});

type FormValues = z.infer<typeof schema>;

interface PenerbitFormProps {
  defaultValues?: PenerbitBuku;
  onSubmit: (values: FormValues) => void;
  isLoading?: boolean;
}

export const PenerbitForm = ({
  defaultValues,
  onSubmit,
  isLoading,
}: PenerbitFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues
      ? {
          penerbit_buku: defaultValues.penerbit_buku,
          alamat_penerbit: defaultValues.alamat_penerbit,
          telp_penerbit: defaultValues.telp_penerbit ?? "",
          email_penerbit: defaultValues.email_penerbit,
          deskripsi: defaultValues.deskripsi ?? "",
        }
      : undefined,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="penerbit_buku">Nama Penerbit 🏢</Label>
        <Input
          id="penerbit_buku"
          {...register("penerbit_buku")}
          placeholder="Nama penerbit"
          className="rounded-xl"
        />
        {errors.penerbit_buku && (
          <p className="text-red-500 text-xs">{errors.penerbit_buku.message}</p>
        )}
      </div>
      <div className="space-y-1">
        <Label htmlFor="alamat_penerbit">Alamat 📍</Label>
        <Input
          id="alamat_penerbit"
          {...register("alamat_penerbit")}
          placeholder="Alamat penerbit"
          className="rounded-xl"
        />
        {errors.alamat_penerbit && (
          <p className="text-red-500 text-xs">
            {errors.alamat_penerbit.message}
          </p>
        )}
      </div>
      <div className="space-y-1">
        <Label htmlFor="telp_penerbit">Telepon 📞</Label>
        <Input
          id="telp_penerbit"
          {...register("telp_penerbit")}
          placeholder="08xx-xxxx-xxxx"
          className="rounded-xl"
        />
        {errors.telp_penerbit && (
          <p className="text-red-500 text-xs">{errors.telp_penerbit.message}</p>
        )}
      </div>
      <div className="space-y-1">
        <Label htmlFor="email_penerbit">Email 📧</Label>
        <Input
          id="email_penerbit"
          type="email"
          {...register("email_penerbit")}
          placeholder="email@penerbit.com"
          className="rounded-xl"
        />
        {errors.email_penerbit && (
          <p className="text-red-500 text-xs">
            {errors.email_penerbit.message}
          </p>
        )}
      </div>
      <div className="space-y-1">
        <Label htmlFor="deskripsi">Deskripsi 📝</Label>
        <Textarea
          id="deskripsi"
          {...register("deskripsi")}
          placeholder="Tentang penerbit..."
          className="rounded-xl"
          rows={3}
        />
        {errors.deskripsi && (
          <p className="text-red-500 text-xs">{errors.deskripsi.message}</p>
        )}
      </div>
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600"
      >
        {isLoading ? "Menyimpan..." : "💾 Simpan"}
      </Button>
    </form>
  );
};
