export interface baseResponse {
  success: boolean;
  message: string;
  error: Record<string, unknown>;
  data: Record<string, unknown>;
}
