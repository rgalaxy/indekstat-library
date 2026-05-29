import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type {
  BukuState,
  CreateBukuRequest,
  UpdateBukuRequest,
  DeleteBukuRequest,
} from "../types";
import {
  fetchAllBuku,
  fetchBukuById,
  createBuku,
  updateBuku,
  deleteBuku,
} from "../api/bukuApi";

const initialState: BukuState = {
  items: [],
  selected: null,
  isLoading: false,
  error: null,
};

export const loadBuku = createAsyncThunk(
  "buku/loadAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetchAllBuku();
      return res.data;
    } catch {
      return rejectWithValue("Gagal memuat data buku");
    }
  },
);

export const loadBukuById = createAsyncThunk(
  "buku/loadById",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await fetchBukuById(id);
      return res.data;
    } catch {
      return rejectWithValue("Gagal memuat detail buku");
    }
  },
);

export const addBuku = createAsyncThunk(
  "buku/add",
  async (body: CreateBukuRequest, { rejectWithValue }) => {
    try {
      await createBuku(body);
      const res = await fetchAllBuku();
      return res.data;
    } catch {
      return rejectWithValue("Gagal menambah buku");
    }
  },
);

export const editBuku = createAsyncThunk(
  "buku/edit",
  async (body: UpdateBukuRequest, { rejectWithValue }) => {
    try {
      await updateBuku(body);
      const res = await fetchAllBuku();
      return res.data;
    } catch {
      return rejectWithValue("Gagal mengubah buku");
    }
  },
);

export const removeBuku = createAsyncThunk(
  "buku/remove",
  async (body: DeleteBukuRequest, { rejectWithValue }) => {
    try {
      await deleteBuku(body);
      const res = await fetchAllBuku();
      return res.data;
    } catch {
      return rejectWithValue("Gagal menghapus buku");
    }
  },
);

const bukuSlice = createSlice({
  name: "buku",
  initialState,
  reducers: {
    clearSelected: (state) => {
      state.selected = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    const pending = (state: BukuState) => {
      state.isLoading = true;
      state.error = null;
    };
    const rejected = (state: BukuState, action: { payload: unknown }) => {
      state.isLoading = false;
      state.error = action.payload as string;
    };

    builder
      .addCase(loadBuku.pending, pending)
      .addCase(loadBuku.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(loadBuku.rejected, rejected)

      .addCase(loadBukuById.pending, pending)
      .addCase(loadBukuById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selected = action.payload;
      })
      .addCase(loadBukuById.rejected, rejected)

      .addCase(addBuku.pending, pending)
      .addCase(addBuku.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(addBuku.rejected, rejected)

      .addCase(editBuku.pending, pending)
      .addCase(editBuku.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(editBuku.rejected, rejected)

      .addCase(removeBuku.pending, pending)
      .addCase(removeBuku.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(removeBuku.rejected, rejected);
  },
});

export const { clearSelected, clearError } = bukuSlice.actions;
export default bukuSlice.reducer;
