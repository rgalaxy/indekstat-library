import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type {
  DendaState,
  CreateDendaRequest,
  UpdateDendaRequest,
  DeleteDendaRequest,
} from "../types";
import {
  fetchAllDenda,
  createDenda,
  updateDenda,
  deleteDenda,
} from "../api/dendaApi";

const initialState: DendaState = {
  items: [],
  selected: null,
  isLoading: false,
  error: null,
};

export const loadDenda = createAsyncThunk(
  "denda/loadAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetchAllDenda();
      return res.data;
    } catch {
      return rejectWithValue("Gagal memuat denda");
    }
  },
);

export const addDenda = createAsyncThunk(
  "denda/add",
  async (body: CreateDendaRequest, { rejectWithValue }) => {
    try {
      await createDenda(body);
      const res = await fetchAllDenda();
      return res.data;
    } catch {
      return rejectWithValue("Gagal menambah denda");
    }
  },
);

export const editDenda = createAsyncThunk(
  "denda/edit",
  async (body: UpdateDendaRequest, { rejectWithValue }) => {
    try {
      await updateDenda(body);
      const res = await fetchAllDenda();
      return res.data;
    } catch {
      return rejectWithValue("Gagal mengubah denda");
    }
  },
);

export const removeDenda = createAsyncThunk(
  "denda/remove",
  async (body: DeleteDendaRequest, { rejectWithValue }) => {
    try {
      await deleteDenda(body);
      const res = await fetchAllDenda();
      return res.data;
    } catch {
      return rejectWithValue("Gagal menghapus denda");
    }
  },
);

const dendaSlice = createSlice({
  name: "denda",
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
    const pending = (state: DendaState) => {
      state.isLoading = true;
      state.error = null;
    };
    const rejected = (state: DendaState, action: { payload: unknown }) => {
      state.isLoading = false;
      state.error = action.payload as string;
    };
    builder
      .addCase(loadDenda.pending, pending)
      .addCase(loadDenda.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(loadDenda.rejected, rejected)
      .addCase(addDenda.pending, pending)
      .addCase(addDenda.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(addDenda.rejected, rejected)
      .addCase(editDenda.pending, pending)
      .addCase(editDenda.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(editDenda.rejected, rejected)
      .addCase(removeDenda.pending, pending)
      .addCase(removeDenda.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(removeDenda.rejected, rejected);
  },
});

export const { setSelected, clearSelected, clearError } = dendaSlice.actions;
export default dendaSlice.reducer;
