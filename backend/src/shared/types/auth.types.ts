export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

export interface AuthenticatedRequest {
  user?: {
    id: string;
    email: string;
    role: string;
  };
  body: any;
  params: any;
  query: any;
  headers: any;
  method: string;
  url: string;
  ip: string;
  get: (name: string) => string | undefined;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
}