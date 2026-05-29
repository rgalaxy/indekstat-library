import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type {
  PeminjamanState,
  CreatePeminjamanRequest,
  UpdatePeminjamanRequest,
  DeletePeminjamanRequest,
} from "../types";
import {
  fetchAllPeminjaman,
  fetchPeminjamanDetail,
  createPeminjaman,
  updatePeminjaman,
  deletePeminjaman,
} from "../api/peminjamanApi";

const initialState: PeminjamanState = {
  items: [],
  selected: null,
  selectedDetail: null,
  isLoading: false,
  error: null,
};

export const loadPeminjaman = createAsyncThunk(
  "peminjaman/loadAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetchAllPeminjaman();
      return res.data;
    } catch {
      return rejectWithValue("Gagal memuat peminjaman");
    }
  },
);

export const loadPeminjamanDetail = createAsyncThunk(
  "peminjaman/loadDetail",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await fetchPeminjamanDetail(id);
      return res.data;
    } catch {
      return rejectWithValue("Gagal memuat detail peminjaman");
    }
  },
);

export const addPeminjaman = createAsyncThunk(
  "peminjaman/add",
  async (body: CreatePeminjamanRequest, { rejectWithValue }) => {
    try {
      await createPeminjaman(body);
      const res = await fetchAllPeminjaman();
      return res.data;
    } catch {
      return rejectWithValue("Gagal menambah peminjaman");
    }
  },
);

export const editPeminjaman = createAsyncThunk(
  "peminjaman/edit",
  async (body: UpdatePeminjamanRequest, { rejectWithValue }) => {
    try {
      await updatePeminjaman(body);
      const res = await fetchAllPeminjaman();
      return res.data;
    } catch {
      return rejectWithValue("Gagal mengubah peminjaman");
    }
  },
);

export const removePeminjaman = createAsyncThunk(
  "peminjaman/remove",
  async (body: DeletePeminjamanRequest, { rejectWithValue }) => {
    try {
      await deletePeminjaman(body);
      const res = await fetchAllPeminjaman();
      return res.data;
    } catch {
      return rejectWithValue("Gagal menghapus peminjaman");
    }
  },
);

const peminjamanSlice = createSlice({
  name: "peminjaman",
  initialState,
  reducers: {
    setSelected: (state, action) => {
      state.selected = action.payload;
    },
    clearSelected: (state) => {
      state.selected = null;
      state.selectedDetail = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    const pending = (state: PeminjamanState) => {
      state.isLoading = true;
      state.error = null;
    };
    const rejected = (state: PeminjamanState, action: { payload: unknown }) => {
      state.isLoading = false;
      state.error = action.payload as string;
    };
    builder
      .addCase(loadPeminjaman.pending, pending)
      .addCase(loadPeminjaman.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(loadPeminjaman.rejected, rejected)
      .addCase(loadPeminjamanDetail.pending, pending)
      .addCase(loadPeminjamanDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedDetail = action.payload;
      })
      .addCase(loadPeminjamanDetail.rejected, rejected)
      .addCase(addPeminjaman.pending, pending)
      .addCase(addPeminjaman.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(addPeminjaman.rejected, rejected)
      .addCase(editPeminjaman.pending, pending)
      .addCase(editPeminjaman.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(editPeminjaman.rejected, rejected)
      .addCase(removePeminjaman.pending, pending)
      .addCase(removePeminjaman.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(removePeminjaman.rejected, rejected);
  },
});

export const { setSelected, clearSelected, clearError } =
  peminjamanSlice.actions;
export default peminjamanSlice.reducer;
