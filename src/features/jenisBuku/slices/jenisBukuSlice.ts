import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type {
  JenisBukuState,
  CreateJenisBukuRequest,
  UpdateJenisBukuRequest,
  DeleteJenisBukuRequest,
} from "../types";
import {
  fetchAllJenisBuku,
  createJenisBuku,
  updateJenisBuku,
  deleteJenisBuku,
} from "../api/jenisBukuApi";

const initialState: JenisBukuState = {
  items: [],
  selected: null,
  isLoading: false,
  error: null,
};

export const loadJenisBuku = createAsyncThunk(
  "jenisBuku/loadAll",
  async (q: string | undefined, { rejectWithValue }) => {
    try {
      const res = await fetchAllJenisBuku(q);
      return res.data;
    } catch {
      return rejectWithValue("Gagal memuat jenis buku");
    }
  },
);

export const addJenisBuku = createAsyncThunk(
  "jenisBuku/add",
  async (body: CreateJenisBukuRequest, { rejectWithValue }) => {
    try {
      await createJenisBuku(body);
      const res = await fetchAllJenisBuku();
      return res.data;
    } catch {
      return rejectWithValue("Gagal menambah jenis buku");
    }
  },
);

export const editJenisBuku = createAsyncThunk(
  "jenisBuku/edit",
  async (body: UpdateJenisBukuRequest, { rejectWithValue }) => {
    try {
      await updateJenisBuku(body);
      const res = await fetchAllJenisBuku();
      return res.data;
    } catch {
      return rejectWithValue("Gagal mengubah jenis buku");
    }
  },
);

export const removeJenisBuku = createAsyncThunk(
  "jenisBuku/remove",
  async (body: DeleteJenisBukuRequest, { rejectWithValue }) => {
    try {
      await deleteJenisBuku(body);
      const res = await fetchAllJenisBuku();
      return res.data;
    } catch {
      return rejectWithValue("Gagal menghapus jenis buku");
    }
  },
);

const jenisBukuSlice = createSlice({
  name: "jenisBuku",
  initialState,
  reducers: {
    setSelected: (state, action) => {
      state.selected = action.payload;
    },
    clearSelected: (state) => {
      state.selected = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    const pending = (state: JenisBukuState) => {
      state.isLoading = true;
      state.error = null;
    };
    const rejected = (state: JenisBukuState, action: { payload: unknown }) => {
      state.isLoading = false;
      state.error = action.payload as string;
    };
    builder
      .addCase(loadJenisBuku.pending, pending)
      .addCase(loadJenisBuku.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(loadJenisBuku.rejected, rejected)
      .addCase(addJenisBuku.pending, pending)
      .addCase(addJenisBuku.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(addJenisBuku.rejected, rejected)
      .addCase(editJenisBuku.pending, pending)
      .addCase(editJenisBuku.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(editJenisBuku.rejected, rejected)
      .addCase(removeJenisBuku.pending, pending)
      .addCase(removeJenisBuku.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(removeJenisBuku.rejected, rejected);
  },
});

export const { setSelected, clearSelected, clearError } =
  jenisBukuSlice.actions;
export default jenisBukuSlice.reducer;
