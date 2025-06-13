export enum AuthStatus {
  AUTHORIZED = "authorized",
  UNAUTHORIZED = "unauthorized",
}

export const ONLY_FOR = {
  ...AuthStatus,
} as const;

export type OnlyFor = AuthStatus;
