import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { loadBuku } from "@/features/buku/slices/bukuSlice";
import { ROUTES } from "@/shared/constants/routes";

const statCards = [
  {
    label: "Total Buku",
    emoji: "📚",
    gradient: "from-violet-400 to-purple-500",
    key: "buku",
  },
  {
    label: "Peminjaman",
    emoji: "📋",
    gradient: "from-blue-400 to-indigo-500",
    key: "peminjaman",
  },
  {
    label: "Denda",
    emoji: "⚠️",
    gradient: "from-red-400 to-pink-500",
    key: "denda",
  },
  {
    label: "Penulis",
    emoji: "✍️",
    gradient: "from-green-400 to-teal-500",
    key: "penulis",
  },
];

const quickLinks = [
  {
    label: "Kelola Buku",
    emoji: "📖",
    path: ROUTES.ADMIN_BUKU,
    bg: "bg-indigo-50 hover:bg-indigo-100 text-indigo-700",
  },
  {
    label: "Jenis Buku",
    emoji: "🏷️",
    path: ROUTES.ADMIN_JENIS_BUKU,
    bg: "bg-pink-50 hover:bg-pink-100 text-pink-700",
  },
  {
    label: "Peminjaman",
    emoji: "📋",
    path: ROUTES.ADMIN_PEMINJAMAN,
    bg: "bg-teal-50 hover:bg-teal-100 text-teal-700",
  },
  {
    label: "Denda",
    emoji: "⚠️",
    path: ROUTES.ADMIN_DENDA,
    bg: "bg-red-50 hover:bg-red-100 text-red-700",
  },
];

export const DashboardPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const bukuCount = useAppSelector((s) => s.buku.items.length);
  const peminjamanCount = useAppSelector((s) => s.peminjaman.items.length);
  const dendaCount = useAppSelector((s) => s.denda.items.length);
  const penulisCount = useAppSelector((s) => s.penulisBuku.items.length);

  useEffect(() => {
    dispatch(loadBuku());
  }, [dispatch]);

  const counts: Record<string, number> = {
    buku: bukuCount,
    peminjaman: peminjamanCount,
    denda: dendaCount,
    penulis: penulisCount,
  };

  return (
    <div className="space-y-8">
      <div className="text-center py-8 rounded-3xl bg-gradient-to-br from-violet-500 via-purple-500 to-pink-500 text-white shadow-lg">
        <div className="text-6xl mb-3 animate-bounce">📚</div>
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-2">
          Selamat Datang!
        </h1>
        <p className="text-purple-100 text-lg">
          Perpustakaan Digital Indekstat 🌟
        </p>
      </div>

      <div>
        <h2 className="text-xl font-bold text-gray-700 mb-4">
          📊 Statistik Perpustakaan
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((card) => (
            <div
              key={card.key}
              className={`bg-gradient-to-br ${card.gradient} rounded-2xl p-5 text-white shadow-md hover:scale-105 transition-transform cursor-default`}
            >
              <div className="text-3xl mb-2">{card.emoji}</div>
              <div className="text-3xl font-extrabold">{counts[card.key]}</div>
              <div className="text-white/80 text-sm font-medium mt-1">
                {card.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-gray-700 mb-4">⚡ Akses Cepat</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {quickLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => navigate(link.path)}
              className={`${link.bg} rounded-2xl p-4 text-center font-semibold transition-colors`}
            >
              <div className="text-2xl mb-1">{link.emoji}</div>
              <div className="text-sm">{link.label}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
