/**
 * A minimal PostHog client stub used before consent is granted.
 *
 * We deliberately cast to the PostHog singleton type so `@posthog/react`
 * consumers can call hooks without crashing, while we still avoid any init
 * (and therefore any cookies/storage) prior to explicit consent.
 */
export type PostHogSingleton = typeof import("posthog-js").default;

export const posthogNoopClient: PostHogSingleton = {
  capture: () => {},
  identify: () => {},
  alias: () => {},
  reset: () => {},
  register: () => {},
  unregister: () => {},
  set_config: () => {},
  opt_in_capturing: () => {},
  opt_out_capturing: () => {},
  get_distinct_id: () => undefined as any,
  onFeatureFlags: () => {},
  reloadFeatureFlags: () => {},
  isFeatureEnabled: () => false as any,
  getFeatureFlag: () => undefined as any,
  getFeatureFlagPayload: () => undefined as any,
  debug: () => {},
} as unknown as PostHogSingleton;


