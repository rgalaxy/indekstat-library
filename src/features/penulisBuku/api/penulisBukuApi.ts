import { apiClient } from "@/shared/lib/apiClient";
import { API_ENDPOINTS } from "@/shared/constants/endpoints";
import type { ApiListResponse, ApiResponse } from "@/shared/types/api";
import type {
  PenulisBuku,
  CreatePenulisBukuRequest,
  UpdatePenulisBukuRequest,
  DeletePenulisBukuRequest,
} from "../types";

export const fetchAllPenulis = (q?: string) =>
  apiClient
    .get<
      ApiListResponse<PenulisBuku>
    >(API_ENDPOINTS.ADMIN.PENULIS.LIST, { params: q ? { q } : {} })
    .then((r) => r.data);

export const fetchPenulisById = (id: string) =>
  apiClient
    .get<ApiResponse<PenulisBuku>>(API_ENDPOINTS.ADMIN.PENULIS.DETAIL(id))
    .then((r) => r.data);

export const createPenulis = (body: CreatePenulisBukuRequest) =>
  apiClient
    .post<ApiResponse<PenulisBuku>>(API_ENDPOINTS.ADMIN.PENULIS.CREATE, body)
    .then((r) => r.data);

export const updatePenulis = (body: UpdatePenulisBukuRequest) =>
  apiClient
    .put<ApiResponse<PenulisBuku>>(API_ENDPOINTS.ADMIN.PENULIS.UPDATE, body)
    .then((r) => r.data);

export const deletePenulis = (body: DeletePenulisBukuRequest) =>
  apiClient
    .delete<
      ApiResponse<null>
    >(API_ENDPOINTS.ADMIN.PENULIS.DELETE, { data: body })
    .then((r) => r.data);
