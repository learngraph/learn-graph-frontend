export type ConsentCategories = {
  analytics: boolean;
};

export type ConsentRecord = {
  version: 1;
  updatedAt: string; // ISO timestamp
  categories: ConsentCategories;
};

const STORAGE_KEY = "lg_cookie_consent_v1";
const EVENT_NAME = "lg_cookie_consent_changed";

function safeParse(json: string): unknown {
  try {
    return JSON.parse(json);
  } catch {
    return undefined;
  }
}

function isConsentRecord(v: any): v is ConsentRecord {
  return (
    v &&
    v.version === 1 &&
    typeof v.updatedAt === "string" &&
    v.categories &&
    typeof v.categories.analytics === "boolean"
  );
}

export function readConsent(): ConsentRecord | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  const parsed = safeParse(raw);
  return isConsentRecord(parsed) ? parsed : null;
}

export function hasAnalyticsConsent(): boolean {
  const c = readConsent();
  return !!c?.categories.analytics;
}

export function writeConsent(next: Partial<ConsentCategories>): ConsentRecord {
  if (typeof window === "undefined") {
    return {
      version: 1,
      updatedAt: new Date().toISOString(),
      categories: { analytics: !!next.analytics },
    };
  }

  const prev = readConsent();
  const record: ConsentRecord = {
    version: 1,
    updatedAt: new Date().toISOString(),
    categories: {
      analytics: next.analytics ?? prev?.categories.analytics ?? false,
    },
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: record }));
  return record;
}

export function subscribe(listener: (consent: ConsentRecord | null) => void) {
  if (typeof window === "undefined") return () => {};

  const onEvent = () => listener(readConsent());
  const onCustomEvent = () => onEvent();
  const onStorage = (e: StorageEvent) => {
    if (e.key !== STORAGE_KEY) return;
    onEvent();
  };

  window.addEventListener(EVENT_NAME, onCustomEvent);
  window.addEventListener("storage", onStorage);

  return () => {
    window.removeEventListener(EVENT_NAME, onCustomEvent);
    window.removeEventListener("storage", onStorage);
  };
}


