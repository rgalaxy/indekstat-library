import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { PenulisBuku } from "@/features/penulisBuku/types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const schema = z.object({
  penulis_buku: z.string().min(1, "Nama penulis wajib diisi"),
  alamat_penulis: z.string().min(1, "Alamat wajib diisi"),
  email_penulis: z.string().email("Email tidak valid"),
  deskripsi: z.string().min(1, "Deskripsi wajib diisi"),
});

type FormValues = z.infer<typeof schema>;

interface PenulisFormProps {
  defaultValues?: PenulisBuku;
  onSubmit: (values: FormValues) => void;
  isLoading?: boolean;
}

export const PenulisForm = ({
  defaultValues,
  onSubmit,
  isLoading,
}: PenulisFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues
      ? {
          penulis_buku: defaultValues.penulis_buku,
          alamat_penulis: defaultValues.alamat,
          email_penulis: defaultValues.email_penulis,
          deskripsi: defaultValues.deskripsi,
        }
      : undefined,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="penulis_buku">Nama Penulis ✍️</Label>
        <Input
          id="penulis_buku"
          {...register("penulis_buku")}
          placeholder="Nama lengkap penulis"
          className="rounded-xl"
        />
        {errors.penulis_buku && (
          <p className="text-red-500 text-xs">{errors.penulis_buku.message}</p>
        )}
      </div>
      <div className="space-y-1">
        <Label htmlFor="alamat_penulis">Alamat 📍</Label>
        <Input
          id="alamat_penulis"
          {...register("alamat_penulis")}
          placeholder="Alamat penulis"
          className="rounded-xl"
        />
        {errors.alamat_penulis && (
          <p className="text-red-500 text-xs">
            {errors.alamat_penulis.message}
          </p>
        )}
      </div>
      <div className="space-y-1">
        <Label htmlFor="email_penulis">Email 📧</Label>
        <Input
          id="email_penulis"
          type="email"
          {...register("email_penulis")}
          placeholder="email@contoh.com"
          className="rounded-xl"
        />
        {errors.email_penulis && (
          <p className="text-red-500 text-xs">{errors.email_penulis.message}</p>
        )}
      </div>
      <div className="space-y-1">
        <Label htmlFor="deskripsi">Deskripsi 📝</Label>
        <Textarea
          id="deskripsi"
          {...register("deskripsi")}
          placeholder="Tentang penulis..."
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
        className="w-full rounded-xl bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600"
      >
        {isLoading ? "Menyimpan..." : "💾 Simpan"}
      </Button>
    </form>
  );
};
