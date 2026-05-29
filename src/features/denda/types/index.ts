export interface Denda {
  id_denda: string;
  jumlah_denda: number;
  tgl_pinjam: string;
  tgl_hrs_kembali: string;
  tgl_kembali: string;
  id_peminjaman: string;
  id_anggota: string;
  created_at: string;
  updated_at: string;
}

export interface CreateDendaRequest {
  jumlah_denda: number;
  tgl_pinjam: string;
  tgl_hrs_kembali: string;
  tgl_kembali: string;
  id_peminjaman: string;
  id_anggota: string;
}

export interface UpdateDendaRequest extends CreateDendaRequest {
  id_denda: string;
}

export interface DeleteDendaRequest {
  id_denda: string;
}

export interface DendaState {
  items: Denda[];
  selected: Denda | null;
  isLoading: boolean;
  error: string | null;
}
