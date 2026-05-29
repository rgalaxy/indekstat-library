import { apiClient } from "@/shared/lib/apiClient";
import { API_ENDPOINTS } from "@/shared/constants/endpoints";
import type { ApiListResponse, ApiResponse } from "@/shared/types/api";
import type {
  Peminjaman,
  PeminjamanDetail,
  CreatePeminjamanRequest,
  UpdatePeminjamanRequest,
  DeletePeminjamanRequest,
} from "../types";

export const fetchAllPeminjaman = () =>
  apiClient
    .get<ApiListResponse<Peminjaman>>(API_ENDPOINTS.ADMIN.PEMINJAMAN.LIST)
    .then((r) => r.data);

export const fetchPeminjamanById = (id: string) =>
  apiClient
    .get<ApiResponse<Peminjaman>>(API_ENDPOINTS.ADMIN.PEMINJAMAN.DETAIL(id))
    .then((r) => r.data);

export const fetchPeminjamanDetail = (id: string) =>
  apiClient
    .get<
      ApiResponse<PeminjamanDetail>
    >(API_ENDPOINTS.ADMIN.PEMINJAMAN.DETAIL_FULL(id))
    .then((r) => r.data);

export const createPeminjaman = (body: CreatePeminjamanRequest) =>
  apiClient
    .post<ApiResponse<null>>(API_ENDPOINTS.ADMIN.PEMINJAMAN.CREATE, body)
    .then((r) => r.data);

export const updatePeminjaman = (body: UpdatePeminjamanRequest) =>
  apiClient
    .put<ApiResponse<null>>(API_ENDPOINTS.ADMIN.PEMINJAMAN.UPDATE, body)
    .then((r) => r.data);

export const deletePeminjaman = (body: DeletePeminjamanRequest) =>
  apiClient
    .delete<
      ApiResponse<null>
    >(API_ENDPOINTS.ADMIN.PEMINJAMAN.DELETE, { data: body })
    .then((r) => r.data);
