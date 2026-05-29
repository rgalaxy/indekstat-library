export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
  },
  PUBLIC: {
    BUKU_LIST: "/v1/buku",
    BUKU_DETAIL: (id: string) => `/v1/buku/${id}`,
  },
  ADMIN: {
    JENIS_BUKU: {
      LIST: "/admin/buku/jenbuk",
      DETAIL: (id: string) => `/admin/buku/jenbuk/${id}`,
      CREATE: "/admin/buku/jenbuk/create",
      UPDATE: "/admin/buku/jenbuk/update",
      DELETE: "/admin/buku/jenbuk/delete",
    },
    PENULIS: {
      LIST: "/admin/buku/author",
      DETAIL: (id: string) => `/admin/buku/author/${id}`,
      CREATE: "/admin/buku/author/create",
      UPDATE: "/admin/buku/author/update",
      DELETE: "/admin/buku/author/delete",
    },
    PENERBIT: {
      LIST: "/admin/buku/penbuk",
      DETAIL: (id: string) => `/admin/buku/penbuk/${id}`,
      CREATE: "/admin/buku/penbuk/create",
      UPDATE: "/admin/buku/penbuk/update",
      DELETE: "/admin/buku/penbuk/delete",
    },
    BUKU: {
      LIST: "/admin/buku",
      DETAIL: (id: string) => `/admin/buku/${id}`,
      CREATE: "/admin/buku/create",
      UPDATE: "/admin/buku/update",
      DELETE: "/admin/buku/delete",
    },
    PEMINJAMAN: {
      LIST: "/admin/peminjaman",
      DETAIL: (id: string) => `/admin/peminjaman/${id}`,
      DETAIL_FULL: (id: string) => `/admin/peminjaman/detail/${id}`,
      CREATE: "/admin/peminjaman/create",
      UPDATE: "/admin/peminjaman/update",
      DELETE: "/admin/peminjaman/delete",
    },
    DENDA: {
      LIST: "/admin/denda",
      DETAIL: (id: string) => `/admin/denda/${id}`,
      CREATE: "/admin/denda/create",
      UPDATE: "/admin/denda/update",
      DELETE: "/admin/denda/delete",
    },
  },
} as const;
