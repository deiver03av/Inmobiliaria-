export interface RegisterDto {
  nombre: string;
  correo: string;
  password: string;
}

export interface LoginDto {
  correo: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  message: string;
}