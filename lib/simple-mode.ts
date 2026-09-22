"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";

const KEY = "portfolio-simple-mode";
const EVENT = "portfolio-simple-mode-change";

function readSimple(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
}

function writeSimple(value: boolean) {
  try {
    window.localStorage.setItem(KEY, value ? "1" : "0");
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new Event(EVENT));
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener(EVENT, onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener(EVENT, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

/** SSR-safe simple-mode flag (persisted). Default: 3D on. */
export function useSimpleMode() {
  const simple = useSyncExternalStore(subscribe, readSimple, () => false);

  const setSimple = useCallback((value: boolean) => {
    writeSimple(value);
  }, []);

  const toggle = useCallback(() => {
    writeSimple(!readSimple());
  }, []);

  return { simple, setSimple, toggle };
}

/** True after first client paint — use to avoid flash-loading 3D when preference is simple. */
export function useHasHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}
