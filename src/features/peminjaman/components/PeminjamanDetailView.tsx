import type { PeminjamanDetail } from "@/features/peminjaman/types";
import { Badge } from "@/components/ui/badge";

interface PeminjamanDetailViewProps {
  detail: PeminjamanDetail;
}

export const PeminjamanDetailView = ({ detail }: PeminjamanDetailViewProps) => (
  <div className="space-y-4">
    <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-4 space-y-2">
      <h3 className="font-semibold text-teal-800">👤 Info Anggota</h3>
      <div className="text-sm space-y-1">
        <div className="flex justify-between">
          <span className="text-gray-500">ID Anggota</span>
          <span className="font-medium">{detail.anggota.id_anggota}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Nama</span>
          <span className="font-medium">{detail.anggota.nama}</span>
        </div>
      </div>
    </div>

    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 space-y-2">
      <h3 className="font-semibold text-blue-800">📅 Informasi Peminjaman</h3>
      <div className="text-sm space-y-1">
        <div className="flex justify-between">
          <span className="text-gray-500">Tanggal Pinjam</span>
          <span className="font-medium">{detail.tgl_pinjam}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Harus Kembali</span>
          <span className="font-medium">{detail.tgl_hrs_kembali}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Jaminan</span>
          <span className="font-medium">{detail.jaminan}</span>
        </div>
      </div>
    </div>

    {detail.details.length > 0 && (
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4 space-y-2">
        <h3 className="font-semibold text-purple-800">📚 Buku yang Dipinjam</h3>
        <div className="space-y-2">
          {detail.details.map((d) => (
            <div
              key={d.id_detailpinjam}
              className="flex items-center justify-between text-sm bg-white rounded-xl px-3 py-2"
            >
              <span className="text-gray-700 font-medium">{d.id_buku}</span>
              <Badge
                variant="secondary"
                className="bg-purple-100 text-purple-700"
              >
                {d.kondisi}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);
