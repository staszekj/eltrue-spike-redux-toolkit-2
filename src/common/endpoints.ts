export enum EEndpointStatus {
  INIT = "INIT",
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

export const PUBLIC_CTX_PATH = "/public/";
export const PUBLIC_IMAGE_V300 = PUBLIC_CTX_PATH + "images-v300";

export const API_CTX_PATH = "/api";
export const IMAGE_INFO_SEARCH_ENDPOINT_PATH = API_CTX_PATH + "/imageInfo/search";
export const IMAGE_INFO_DELETE_ENDPOINT_PATH = API_CTX_PATH + "/imageInfo/delete";
export const IMAGE_INFO_PUT_ENDPOINT_PATH = API_CTX_PATH + "/imageInfo/put";

export const PRINTED_EMAILS_ENDPOINT_PATH = API_CTX_PATH + "/printedEmails";
export const SIMPLE_API_CALL_ROLE_PATH = API_CTX_PATH + "/simpleapicallrole";
export const SIMPLE_API_CALL_INCREMENT_PATH = API_CTX_PATH + "/simpleapicallincrement";
