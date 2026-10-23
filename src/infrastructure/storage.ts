import type { StoragePort } from "../domain/ports";

export const browserStorage: StoragePort = {
  read: (key) => localStorage.getItem(key),
  write: (key, value) => localStorage.setItem(key, value),
};
