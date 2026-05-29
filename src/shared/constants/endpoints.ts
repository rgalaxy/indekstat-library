export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/v1/login",
  },
  PUBLIC: {
    BUKU_LIST: "/v1/buku",
    BUKU_DETAIL: (id: string) => `/v1/buku/${id}`,
  },
  ADMIN: {
    JENIS_BUKU: {
      LIST: "/v1/admin/buku/jenbuk",
      DETAIL: (id: string) => `/v1/admin/buku/jenbuk/${id}`,
      CREATE: "/v1/admin/buku/jenbuk/create",
      UPDATE: "/v1/admin/buku/jenbuk/update",
      DELETE: "/v1/admin/buku/jenbuk/delete",
    },
    PENULIS: {
      LIST: "/v1/admin/buku/author",
      DETAIL: (id: string) => `/v1/admin/buku/author/${id}`,
      CREATE: "/v1/admin/buku/author/create",
      UPDATE: "/v1/admin/buku/author/update",
      DELETE: "/v1/admin/buku/author/delete",
    },
    PENERBIT: {
      LIST: "/v1/admin/buku/penbuk",
      DETAIL: (id: string) => `/v1/admin/buku/penbuk/${id}`,
      CREATE: "/v1/admin/buku/penbuk/create",
      UPDATE: "/v1/admin/buku/penbuk/update",
      DELETE: "/v1/admin/buku/penbuk/delete",
    },
    BUKU: {
      LIST: "/v1/admin/buku",
      DETAIL: (id: string) => `/v1/admin/buku/${id}`,
      CREATE: "/v1/admin/buku/create",
      UPDATE: "/v1/admin/buku/update",
      DELETE: "/v1/admin/buku/delete",
    },
    PEMINJAMAN: {
      LIST: "/v1/admin/peminjaman",
      DETAIL: (id: string) => `/v1/admin/peminjaman/${id}`,
      DETAIL_FULL: (id: string) => `/v1/admin/peminjaman/detail/${id}`,
      CREATE: "/v1/admin/peminjaman/create",
      UPDATE: "/v1/admin/peminjaman/update",
      DELETE: "/v1/admin/peminjaman/delete",
    },
    DENDA: {
      LIST: "/v1/admin/denda",
      DETAIL: (id: string) => `/v1/admin/denda/${id}`,
      CREATE: "/v1/admin/denda/create",
      UPDATE: "/v1/admin/denda/update",
      DELETE: "/v1/admin/denda/delete",
    },
  },
} as const;
