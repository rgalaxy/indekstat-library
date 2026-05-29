import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { JenisBuku } from "@/features/jenisBuku/types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const schema = z.object({
  jenis_buku: z.string().min(1, "Nama jenis wajib diisi"),
  deskripsi: z.string().min(1, "Deskripsi wajib diisi"),
});

type FormValues = z.infer<typeof schema>;

interface JenisBukuFormProps {
  defaultValues?: JenisBuku;
  onSubmit: (values: FormValues) => void;
  isLoading?: boolean;
}

export const JenisBukuForm = ({
  defaultValues,
  onSubmit,
  isLoading,
}: JenisBukuFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues
      ? {
          jenis_buku: defaultValues.jenis_buku,
          deskripsi: defaultValues.deskripsi,
        }
      : undefined,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="jenis_buku">Nama Jenis 🏷️</Label>
        <Input
          id="jenis_buku"
          {...register("jenis_buku")}
          placeholder="Contoh: Fiksi, Non-Fiksi..."
          className="rounded-xl"
        />
        {errors.jenis_buku && (
          <p className="text-red-500 text-xs">{errors.jenis_buku.message}</p>
        )}
      </div>
      <div className="space-y-1">
        <Label htmlFor="deskripsi">Deskripsi 📝</Label>
        <Textarea
          id="deskripsi"
          {...register("deskripsi")}
          placeholder="Tulis deskripsi jenis buku..."
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
        className="w-full rounded-xl bg-gradient-to-r from-violet-500 to-pink-500 hover:from-violet-600 hover:to-pink-600"
      >
        {isLoading ? "Menyimpan..." : "💾 Simpan"}
      </Button>
    </form>
  );
};
