export interface Result<T> {
  success: boolean;
  message: string;
  internalMessage?: string;
  data?: T | null;
}
