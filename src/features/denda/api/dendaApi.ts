import { apiClient } from "@/shared/lib/apiClient";
import { API_ENDPOINTS } from "@/shared/constants/endpoints";
import type { ApiListResponse, ApiResponse } from "@/shared/types/api";
import type {
  Denda,
  CreateDendaRequest,
  UpdateDendaRequest,
  DeleteDendaRequest,
} from "../types";

export const fetchAllDenda = () =>
  apiClient
    .get<ApiListResponse<Denda>>(API_ENDPOINTS.ADMIN.DENDA.LIST)
    .then((r) => r.data);

export const fetchDendaById = (id: string) =>
  apiClient
    .get<ApiResponse<Denda>>(API_ENDPOINTS.ADMIN.DENDA.DETAIL(id))
    .then((r) => r.data);

export const createDenda = (body: CreateDendaRequest) =>
  apiClient
    .post<ApiResponse<null>>(API_ENDPOINTS.ADMIN.DENDA.CREATE, body)
    .then((r) => r.data);

export const updateDenda = (body: UpdateDendaRequest) =>
  apiClient
    .put<ApiResponse<null>>(API_ENDPOINTS.ADMIN.DENDA.UPDATE, body)
    .then((r) => r.data);

export const deleteDenda = (body: DeleteDendaRequest) =>
  apiClient
    .delete<ApiResponse<null>>(API_ENDPOINTS.ADMIN.DENDA.DELETE, { data: body })
    .then((r) => r.data);
