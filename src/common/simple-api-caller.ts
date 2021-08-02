import { PortalProps } from "@material-ui/core";

export type TRole = "user" | "hacker" | "developer";

export interface TSimpleRoleResponse {
  role: TRole;
  originPort: number;
  requestUrl: string;
}
export interface TSimpleIncementRequest {
  value: number;
}
export interface TSimpleIncementResponse {
  value: number;
}

export const envDeveloperDomain = process.env["REACT_APP_DEVELOPER_DOMAIN"] as string;
export const envDeveloperPort = process.env["REACT_APP_DEVELOPER_PORT"] as string;
export const envDeveloperUrl = '';

export const envUserDomain = process.env["REACT_APP_USER_DOMAIN"] as string;
export const envUserPort = process.env["REACT_APP_USER_PORT"] as string;
export const envUserUrl = `${envUserDomain}:${envUserPort}`;

export const envHackerDomain = process.env["REACT_APP_HACKER_DOMAIN"];
export const envHackerPort = process.env["REACT_APP_HACKER_PORT"];
export const envHackerUrl = `${envUserDomain}:${envUserPort}`;

export const envConfig = {
  user: {
    port: envUserPort,
    domain: envUserDomain,
    url: envUserUrl,
  },
  hacker: {
    port: envHackerPort,
    domain: envHackerPort,
    url: envHackerUrl,
  },
  developer: {
    port: envDeveloperPort,
    domain: envDeveloperPort,
    url: envDeveloperUrl,
  },
};

export const envRole = (process.env["REACT_APP_ROLE"] || "developer") as keyof typeof envConfig;
