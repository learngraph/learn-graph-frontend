const {
  VITE_POSTHOG_HOST: POSTHOG_HOST,
  VITE_POSTHOG_API_KEY: POSTHOG_API_KEY,
} = import.meta.env;

export { POSTHOG_API_KEY, POSTHOG_HOST };
