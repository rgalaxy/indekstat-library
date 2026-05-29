import { apiClient } from "@/shared/lib/apiClient";
import { API_ENDPOINTS } from "@/shared/constants/endpoints";
import type { ApiListResponse, ApiResponse } from "@/shared/types/api";
import type {
  JenisBuku,
  CreateJenisBukuRequest,
  UpdateJenisBukuRequest,
  DeleteJenisBukuRequest,
} from "../types";

export const fetchAllJenisBuku = (q?: string) =>
  apiClient
    .get<
      ApiListResponse<JenisBuku>
    >(API_ENDPOINTS.ADMIN.JENIS_BUKU.LIST, { params: q ? { q } : {} })
    .then((r) => r.data);

export const fetchJenisBukuById = (id: string) =>
  apiClient
    .get<ApiResponse<JenisBuku>>(API_ENDPOINTS.ADMIN.JENIS_BUKU.DETAIL(id))
    .then((r) => r.data);

export const createJenisBuku = (body: CreateJenisBukuRequest) =>
  apiClient
    .post<ApiResponse<JenisBuku>>(API_ENDPOINTS.ADMIN.JENIS_BUKU.CREATE, body)
    .then((r) => r.data);

export const updateJenisBuku = (body: UpdateJenisBukuRequest) =>
  apiClient
    .put<ApiResponse<JenisBuku>>(API_ENDPOINTS.ADMIN.JENIS_BUKU.UPDATE, body)
    .then((r) => r.data);

export const deleteJenisBuku = (body: DeleteJenisBukuRequest) =>
  apiClient
    .delete<
      ApiResponse<null>
    >(API_ENDPOINTS.ADMIN.JENIS_BUKU.DELETE, { data: body })
    .then((r) => r.data);
