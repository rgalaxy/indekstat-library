export interface Buku {
  id_buku: string;
  isbn: string;
  id_kategori_buku: string;
  judul_buku: string;
  id_penulis_buku: string;
  id_penerbit_buku: string;
  tahun_terbit: string;
  stok_buku: number;
  rak_buku: string;
  deskripsi_buku: string;
  gambar_buku: string | null;
  kondisi_buku: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateBukuRequest {
  isbn: string;
  id_kategori_buku: string;
  judul_buku: string;
  id_penulis_buku: string;
  id_penerbit_buku: string;
  tahun_terbit: string;
  stok_buku: number;
  rak_buku: string;
  deskripsi_buku: string;
  gambar_buku?: string | null;
  kondisi_buku?: string | null;
}

export interface UpdateBukuRequest extends CreateBukuRequest {
  id_buku: string;
}

export interface DeleteBukuRequest {
  id_buku: string;
}

export interface BukuState {
  items: Buku[];
  selected: Buku | null;
  isLoading: boolean;
  error: string | null;
}
