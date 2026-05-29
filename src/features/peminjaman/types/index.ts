export interface DetailPinjam {
  id_detailpinjam: string;
  id_buku: string;
  kondisi: string;
}

export interface PeminjamanAnggota {
  id_anggota: string;
  nama: string;
}

export interface Peminjaman {
  id: string;
  id_anggota: string;
  tgl_pinjam: string;
  tgl_hrs_kembali: string;
  jaminan: string;
  created_at: string;
  updated_at: string;
}

export interface PeminjamanDetail extends Omit<Peminjaman, "id_anggota"> {
  anggota: PeminjamanAnggota;
  details: DetailPinjam[];
}

export interface CreatePeminjamanRequest {
  id_anggota: string;
  tgl_pinjam: string;
  tgl_hrs_kembali: string;
  jaminan: string;
}

export interface UpdatePeminjamanRequest extends CreatePeminjamanRequest {
  id_peminjaman: string;
}

export interface DeletePeminjamanRequest {
  id_peminjaman: string;
}

export interface PeminjamanState {
  items: Peminjaman[];
  selected: Peminjaman | null;
  selectedDetail: PeminjamanDetail | null;
  isLoading: boolean;
  error: string | null;
}
