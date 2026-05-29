export interface ApiResponse<T> {
  error: boolean;
  msg: string;
  data: T;
}

export interface ApiListResponse<T> {
  error: boolean;
  msg: string;
  data: T[];
}

export interface ApiError {
  error: boolean;
  msg: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  q?: string;
}
