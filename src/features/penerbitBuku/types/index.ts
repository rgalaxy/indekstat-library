export interface PenerbitBuku {
  id: string;
  penerbit_buku: string;
  alamat_penerbit: string;
  telp_penerbit: string | null;
  email_penerbit: string;
  deskripsi: string | null;
  updated_at: string;
}

export interface CreatePenerbitBukuRequest {
  penerbit_buku: string;
  alamat_penerbit: string;
  telp_penerbit: string;
  email_penerbit: string;
  deskripsi: string;
}

export interface UpdatePenerbitBukuRequest extends CreatePenerbitBukuRequest {
  id: string;
}

export interface DeletePenerbitBukuRequest {
  id: string;
}

export interface PenerbitBukuState {
  items: PenerbitBuku[];
  selected: PenerbitBuku | null;
  isLoading: boolean;
  error: string | null;
}
