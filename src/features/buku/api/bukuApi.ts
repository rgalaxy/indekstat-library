import { apiClient } from "@/shared/lib/apiClient";
import { API_ENDPOINTS } from "@/shared/constants/endpoints";
import type { ApiListResponse, ApiResponse } from "@/shared/types/api";
import type {
  Buku,
  CreateBukuRequest,
  UpdateBukuRequest,
  DeleteBukuRequest,
} from "../types";

export const fetchAllBuku = () =>
  apiClient
    .get<ApiListResponse<Buku>>(API_ENDPOINTS.PUBLIC.BUKU_LIST)
    .then((r) => r.data);

export const fetchBukuById = (id: string) =>
  apiClient
    .get<ApiResponse<Buku>>(API_ENDPOINTS.PUBLIC.BUKU_DETAIL(id))
    .then((r) => r.data);

export const createBuku = (body: CreateBukuRequest) =>
  apiClient
    .post<ApiResponse<Buku>>(API_ENDPOINTS.ADMIN.BUKU.CREATE, body)
    .then((r) => r.data);

export const updateBuku = (body: UpdateBukuRequest) =>
  apiClient
    .put<ApiResponse<Buku>>(API_ENDPOINTS.ADMIN.BUKU.UPDATE, body)
    .then((r) => r.data);

export const deleteBuku = (body: DeleteBukuRequest) =>
  apiClient
    .delete<ApiResponse<null>>(API_ENDPOINTS.ADMIN.BUKU.DELETE, { data: body })
    .then((r) => r.data);
