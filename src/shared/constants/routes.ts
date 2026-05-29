export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  ADMIN: "/admin",
  ADMIN_DASHBOARD: "/admin/dashboard",
  ADMIN_BUKU: "/admin/buku",
  ADMIN_JENIS_BUKU: "/admin/jenis-buku",
  ADMIN_PENULIS: "/admin/penulis",
  ADMIN_PENERBIT: "/admin/penerbit",
  ADMIN_PEMINJAMAN: "/admin/peminjaman",
  ADMIN_DENDA: "/admin/denda",
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];
