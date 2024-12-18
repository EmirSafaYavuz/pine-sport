export interface Result<T> {
  success: boolean;
  message: string | null;
  internalMessage?: string;
  data?: T | null;
}
