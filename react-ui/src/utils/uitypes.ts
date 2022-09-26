/** API Response **/
export type ResponseType<T = any> = {
  ok: boolean;
  status: number;
  data: T;
  headers: Headers;
};