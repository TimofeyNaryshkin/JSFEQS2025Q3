export interface ServerResponse<T> {
  data: T;
  message: string;
  error: string;
}
