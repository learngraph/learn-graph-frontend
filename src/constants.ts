// constants.ts

// In development, window.runtimeConfig will be undefined,
// so import.meta.env is used. In production, window.runtimeConfig
// is injected via a runtime-generated config.js.
const runtimeConfig = (window as any).runtimeConfig || import.meta.env;

export const POSTHOG_HOST = runtimeConfig.VITE_POSTHOG_HOST;
export const POSTHOG_API_KEY = runtimeConfig.VITE_POSTHOG_API_KEY;
export const SLACK_WEBHOOK_TOKEN = runtimeConfig.VITE_SLACK_WEBHOOK_TOKEN;
