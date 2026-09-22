"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";

const KEY = "portfolio-simple-mode";
const EVENT = "portfolio-simple-mode-change";

/** Narrow screens / touch devices default to Simple when no preference is saved. */
export function prefersSimpleByDefault(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(max-width: 768px), (pointer: coarse)").matches;
}

function readSimple(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const stored = window.localStorage.getItem(KEY);
    if (stored === "1") return true;
    if (stored === "0") return false;
    return prefersSimpleByDefault();
  } catch {
    return prefersSimpleByDefault();
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

/** SSR-safe simple-mode flag (persisted). Mobile defaults to Simple. */
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

export function useHasHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}

/** True for phones / coarse pointers — used to lighten the 3D intro. */
export function useIsMobileUi() {
  const subscribeMq = (onChange: () => void) => {
    const mq = window.matchMedia("(max-width: 768px), (pointer: coarse)");
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  };
  const get = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 768px), (pointer: coarse)").matches;
  return useSyncExternalStore(subscribeMq, get, () => false);
}
