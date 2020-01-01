import { FileMimeType } from "../../../utils/fileMimeTypes";

export type HTTPMethods = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
type ContentTypes = "application/json" | "multipart/form-data" | "text/plain";

export default interface ServiceConfig {
  method: HTTPMethods;
  responseType?:
    | "document"
    | "arraybuffer"
    | "blob"
    | "json"
    | "text"
    | "stream"
    | undefined;
  headers: {
    Authorization?: string;
    "Content-Type"?: ContentTypes;
    Accept?: FileMimeType;
  };
  url: string;
  data?: any;
  validateStatus?: () => boolean;
}
