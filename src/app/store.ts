import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/slices/authSlice";
import bukuReducer from "@/features/buku/slices/bukuSlice";
import jenisBukuReducer from "@/features/jenisBuku/slices/jenisBukuSlice";
import penulisBukuReducer from "@/features/penulisBuku/slices/penulisBukuSlice";
import penerbitBukuReducer from "@/features/penerbitBuku/slices/penerbitBukuSlice";
import peminjamanReducer from "@/features/peminjaman/slices/peminjamanSlice";
import dendaReducer from "@/features/denda/slices/dendaSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    buku: bukuReducer,
    jenisBuku: jenisBukuReducer,
    penulisBuku: penulisBukuReducer,
    penerbitBuku: penerbitBukuReducer,
    peminjaman: peminjamanReducer,
    denda: dendaReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
