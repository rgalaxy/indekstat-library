import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { loadBuku } from "@/features/buku/slices/bukuSlice";
import type { Buku } from "@/features/buku/types";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LoadingSpinner } from "@/shared/components/LoadingSpinner";

const BookCard = ({ buku, onClick }: { buku: Buku; onClick: () => void }) => (
  <button
    onClick={onClick}
    className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 text-left hover:shadow-md hover:scale-[1.02] transition-all flex flex-col gap-2"
  >
    <div className="bg-gradient-to-br from-violet-100 to-pink-100 rounded-xl h-32 flex items-center justify-center text-5xl">
      📚
    </div>
    <div className="font-semibold text-gray-800 text-sm leading-tight line-clamp-2">
      {buku.judul_buku}
    </div>
    <div className="text-gray-400 text-xs">{buku.tahun_terbit}</div>
    <div className="flex flex-wrap gap-1 mt-auto">
      <Badge
        variant="secondary"
        className="text-xs bg-violet-100 text-violet-700"
      >
        Stok: {buku.stok_buku}
      </Badge>
      <Badge variant="secondary" className="text-xs bg-pink-100 text-pink-700">
        Rak: {buku.rak_buku}
      </Badge>
    </div>
  </button>
);

export const BukuPage = () => {
  const dispatch = useAppDispatch();
  const { items, isLoading } = useAppSelector((s) => s.buku);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Buku | null>(null);

  useEffect(() => {
    dispatch(loadBuku());
  }, [dispatch]);

  const filtered = items.filter((b) =>
    b.judul_buku.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800">
          📚 Koleksi Buku
        </h1>
        <p className="text-gray-500">Temukan buku favoritmu di sini!</p>
      </div>

      <div className="max-w-md mx-auto">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔍 Cari judul buku..."
          className="rounded-2xl border-gray-200"
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center py-16">
          <LoadingSpinner />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <div className="text-5xl mb-3">🔍</div>
          <p>Buku tidak ditemukan</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((buku) => (
            <BookCard
              key={buku.id_buku}
              buku={buku}
              onClick={() => setSelected(buku)}
            />
          ))}
        </div>
      )}

      <Dialog
        open={!!selected}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
      >
        <DialogContent className="rounded-2xl max-w-md">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-gray-800">
                  {selected.judul_buku}
                </DialogTitle>
              </DialogHeader>
              <div className="bg-gradient-to-br from-violet-100 to-pink-100 rounded-xl h-40 flex items-center justify-center text-6xl mb-4">
                📚
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">ISBN</span>
                  <span className="font-medium">{selected.isbn}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Tahun</span>
                  <span className="font-medium">{selected.tahun_terbit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Stok</span>
                  <span className="font-medium">{selected.stok_buku}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Rak</span>
                  <span className="font-medium">{selected.rak_buku}</span>
                </div>
                {selected.kondisi_buku && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Kondisi</span>
                    <span className="font-medium">{selected.kondisi_buku}</span>
                  </div>
                )}
                {selected.deskripsi_buku && (
                  <div className="pt-2 border-t border-gray-100">
                    <p className="text-gray-500 mb-1">Deskripsi</p>
                    <p className="text-gray-700">{selected.deskripsi_buku}</p>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
