import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type {
  PenerbitBukuState,
  CreatePenerbitBukuRequest,
  UpdatePenerbitBukuRequest,
  DeletePenerbitBukuRequest,
} from "../types";
import {
  fetchAllPenerbit,
  createPenerbit,
  updatePenerbit,
  deletePenerbit,
} from "../api/penerbitBukuApi";

const initialState: PenerbitBukuState = {
  items: [],
  selected: null,
  isLoading: false,
  error: null,
};

export const loadPenerbit = createAsyncThunk(
  "penerbitBuku/loadAll",
  async (q: string | undefined, { rejectWithValue }) => {
    try {
      const res = await fetchAllPenerbit(q);
      return res.data;
    } catch {
      return rejectWithValue("Gagal memuat penerbit");
    }
  },
);

export const addPenerbit = createAsyncThunk(
  "penerbitBuku/add",
  async (body: CreatePenerbitBukuRequest, { rejectWithValue }) => {
    try {
      await createPenerbit(body);
      const res = await fetchAllPenerbit();
      return res.data;
    } catch {
      return rejectWithValue("Gagal menambah penerbit");
    }
  },
);

export const editPenerbit = createAsyncThunk(
  "penerbitBuku/edit",
  async (body: UpdatePenerbitBukuRequest, { rejectWithValue }) => {
    try {
      await updatePenerbit(body);
      const res = await fetchAllPenerbit();
      return res.data;
    } catch {
      return rejectWithValue("Gagal mengubah penerbit");
    }
  },
);

export const removePenerbit = createAsyncThunk(
  "penerbitBuku/remove",
  async (body: DeletePenerbitBukuRequest, { rejectWithValue }) => {
    try {
      await deletePenerbit(body);
      const res = await fetchAllPenerbit();
      return res.data;
    } catch {
      return rejectWithValue("Gagal menghapus penerbit");
    }
  },
);

const penerbitBukuSlice = createSlice({
  name: "penerbitBuku",
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
    const pending = (state: PenerbitBukuState) => {
      state.isLoading = true;
      state.error = null;
    };
    const rejected = (
      state: PenerbitBukuState,
      action: { payload: unknown },
    ) => {
      state.isLoading = false;
      state.error = action.payload as string;
    };
    builder
      .addCase(loadPenerbit.pending, pending)
      .addCase(loadPenerbit.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(loadPenerbit.rejected, rejected)
      .addCase(addPenerbit.pending, pending)
      .addCase(addPenerbit.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(addPenerbit.rejected, rejected)
      .addCase(editPenerbit.pending, pending)
      .addCase(editPenerbit.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(editPenerbit.rejected, rejected)
      .addCase(removePenerbit.pending, pending)
      .addCase(removePenerbit.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(removePenerbit.rejected, rejected);
  },
});

export const { setSelected, clearSelected, clearError } =
  penerbitBukuSlice.actions;
export default penerbitBukuSlice.reducer;
