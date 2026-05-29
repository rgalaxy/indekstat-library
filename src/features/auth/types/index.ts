export interface LoginRequest {
  username: string;
  password: string;
}

export interface AuthUser {
  username: string;
  accessToken: string;
}

export interface LoginApiResponse {
  error: boolean;
  msg: string;
  data: {
    username: string;
    token: string;
    refresh_token: string;
  };
}

export interface AuthState {
  user: string | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
