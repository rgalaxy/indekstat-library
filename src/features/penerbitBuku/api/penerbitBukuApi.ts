import { apiClient } from "@/shared/lib/apiClient";
import { API_ENDPOINTS } from "@/shared/constants/endpoints";
import type { ApiListResponse, ApiResponse } from "@/shared/types/api";
import type {
  PenerbitBuku,
  CreatePenerbitBukuRequest,
  UpdatePenerbitBukuRequest,
  DeletePenerbitBukuRequest,
} from "../types";

export const fetchAllPenerbit = (q?: string) =>
  apiClient
    .get<
      ApiListResponse<PenerbitBuku>
    >(API_ENDPOINTS.ADMIN.PENERBIT.LIST, { params: q ? { q } : {} })
    .then((r) => r.data);

export const fetchPenerbitById = (id: string) =>
  apiClient
    .get<ApiResponse<PenerbitBuku>>(API_ENDPOINTS.ADMIN.PENERBIT.DETAIL(id))
    .then((r) => r.data);

export const createPenerbit = (body: CreatePenerbitBukuRequest) =>
  apiClient
    .post<ApiResponse<PenerbitBuku>>(API_ENDPOINTS.ADMIN.PENERBIT.CREATE, body)
    .then((r) => r.data);

export const updatePenerbit = (body: UpdatePenerbitBukuRequest) =>
  apiClient
    .put<ApiResponse<PenerbitBuku>>(API_ENDPOINTS.ADMIN.PENERBIT.UPDATE, body)
    .then((r) => r.data);

export const deletePenerbit = (body: DeletePenerbitBukuRequest) =>
  apiClient
    .delete<
      ApiResponse<null>
    >(API_ENDPOINTS.ADMIN.PENERBIT.DELETE, { data: body })
    .then((r) => r.data);
