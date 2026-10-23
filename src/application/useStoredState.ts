import { useState, type Dispatch, type SetStateAction } from "react";

import type { StoragePort } from "../domain/ports";

export function useStoredState<T>(
  storage: StoragePort,
  key: string,
  initial: T,
  validate: (value: unknown) => value is T,
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    try {
      const saved: unknown = JSON.parse(storage.read(key) ?? "null");
      return validate(saved) ? saved : initial;
    } catch {
      return initial;
    }
  });
  const update: Dispatch<SetStateAction<T>> = (action) =>
    setValue((previous) => {
      const next = action instanceof Function ? action(previous) : action;
      try {
        storage.write(key, JSON.stringify(next));
      } catch {
        /* Memory state remains usable. */
      }
      return next;
    });
  return [value, update];
}
