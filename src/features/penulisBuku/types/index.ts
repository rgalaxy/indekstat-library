export interface PenulisBuku {
  id: string;
  penulis_buku: string;
  alamat: string;
  email_penulis: string;
  deskripsi: string;
  updated_at: string;
}

export interface CreatePenulisBukuRequest {
  penulis_buku: string;
  alamat_penulis: string;
  email_penulis: string;
  deskripsi: string;
}

export interface UpdatePenulisBukuRequest extends CreatePenulisBukuRequest {
  id: string;
}

export interface DeletePenulisBukuRequest {
  id: string;
}

export interface PenulisBukuState {
  items: PenulisBuku[];
  selected: PenulisBuku | null;
  isLoading: boolean;
  error: string | null;
}
