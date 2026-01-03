export function useI18n() {
  return {
    // Stub: returns keys until real i18n wiring is restored.
    // Accepts an optional second argument to stay compatible with i18next-style calls.
    t: (key: string, _options?: unknown) => key,
  };
}
