import { HttpMethod } from "@/types/HttpMethod";

export interface RequestOptions {
  method: HttpMethod;
  url: string;
  data?: any;
  params?: any;
}
