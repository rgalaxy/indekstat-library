export interface JenisBuku {
  id: string;
  jenis_buku: string;
  deskripsi: string;
  updated_at: string;
}

export interface CreateJenisBukuRequest {
  jenis_buku: string;
  deskripsi: string;
}

export interface UpdateJenisBukuRequest extends CreateJenisBukuRequest {
  id: string;
}

export interface DeleteJenisBukuRequest {
  id: string;
}

export interface JenisBukuState {
  items: JenisBuku[];
  selected: JenisBuku | null;
  isLoading: boolean;
  error: string | null;
}
