import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type {
  PenulisBukuState,
  CreatePenulisBukuRequest,
  UpdatePenulisBukuRequest,
  DeletePenulisBukuRequest,
} from "../types";
import {
  fetchAllPenulis,
  createPenulis,
  updatePenulis,
  deletePenulis,
} from "../api/penulisBukuApi";

const initialState: PenulisBukuState = {
  items: [],
  selected: null,
  isLoading: false,
  error: null,
};

export const loadPenulis = createAsyncThunk(
  "penulisBuku/loadAll",
  async (q: string | undefined, { rejectWithValue }) => {
    try {
      const res = await fetchAllPenulis(q);
      return res.data;
    } catch {
      return rejectWithValue("Gagal memuat penulis");
    }
  },
);

export const addPenulis = createAsyncThunk(
  "penulisBuku/add",
  async (body: CreatePenulisBukuRequest, { rejectWithValue }) => {
    try {
      await createPenulis(body);
      const res = await fetchAllPenulis();
      return res.data;
    } catch {
      return rejectWithValue("Gagal menambah penulis");
    }
  },
);

export const editPenulis = createAsyncThunk(
  "penulisBuku/edit",
  async (body: UpdatePenulisBukuRequest, { rejectWithValue }) => {
    try {
      await updatePenulis(body);
      const res = await fetchAllPenulis();
      return res.data;
    } catch {
      return rejectWithValue("Gagal mengubah penulis");
    }
  },
);

export const removePenulis = createAsyncThunk(
  "penulisBuku/remove",
  async (body: DeletePenulisBukuRequest, { rejectWithValue }) => {
    try {
      await deletePenulis(body);
      const res = await fetchAllPenulis();
      return res.data;
    } catch {
      return rejectWithValue("Gagal menghapus penulis");
    }
  },
);

const penulisBukuSlice = createSlice({
  name: "penulisBuku",
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
    const pending = (state: PenulisBukuState) => {
      state.isLoading = true;
      state.error = null;
    };
    const rejected = (
      state: PenulisBukuState,
      action: { payload: unknown },
    ) => {
      state.isLoading = false;
      state.error = action.payload as string;
    };
    builder
      .addCase(loadPenulis.pending, pending)
      .addCase(loadPenulis.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(loadPenulis.rejected, rejected)
      .addCase(addPenulis.pending, pending)
      .addCase(addPenulis.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(addPenulis.rejected, rejected)
      .addCase(editPenulis.pending, pending)
      .addCase(editPenulis.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(editPenulis.rejected, rejected)
      .addCase(removePenulis.pending, pending)
      .addCase(removePenulis.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(removePenulis.rejected, rejected);
  },
});

export const { setSelected, clearSelected, clearError } =
  penulisBukuSlice.actions;
export default penulisBukuSlice.reducer;
