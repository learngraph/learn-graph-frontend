import { useEffect, useMemo, useRef, useState } from "react";
import { PostHogProvider } from "@posthog/react";
import {
  hasAnalyticsConsent,
  subscribe,
} from "@/services/ConsentService";
import { posthogNoopClient, type PostHogSingleton } from "./posthogNoopClient";

type Props = {
  children: React.ReactNode;
};

/**
 * Always renders a PostHogProvider, but keeps it as a noop client until the user
 * has explicitly opted into analytics.
 *
 * This ensures:
 * - no PostHog init before consent
 * - hooks/components can safely use @posthog/react later
 */
export default function PostHogGate({ children }: Props) {
  const [client, setClient] = useState<PostHogSingleton>(posthogNoopClient);
  const initializedRef = useRef(false);

  const env = useMemo(() => {
    const key = import.meta.env.VITE_POSTHOG_API_KEY as string | undefined;
    const host =
      (import.meta.env.VITE_POSTHOG_HOST as string | undefined) ||
      "https://eu.posthog.com";
    return { key, host };
  }, []);

  useEffect(() => {
    let cancelled = false;

    const sync = async () => {
      const allowed = hasAnalyticsConsent();
      if (!allowed) {
        // If we had previously initialized, actively clear IDs/cookies.
        if (initializedRef.current) {
          try {
            const posthog = (await import("posthog-js")).default;
            posthog.opt_out_capturing?.();
            posthog.reset?.();
          } catch {
            // ignore
          }
        }
        if (!cancelled) setClient(posthogNoopClient);
        return;
      }

      if (!env.key) {
        console.error("No PostHog key configured");
        return;
      }

      const posthog = (await import("posthog-js")).default;

      if (!initializedRef.current) {
        posthog.init(env.key, {
          api_host: env.host,
          autocapture: false,
          capture_pageview: false,
        });
        initializedRef.current = true;
      } else {
        // Consent was re-enabled; ensure capturing is back on.
        posthog.opt_in_capturing?.();
      }

      if (!cancelled) setClient(posthog);
    };

    // initial sync + react to changes
    sync();
    const unsub = subscribe(() => {
      sync();
    });

    return () => {
      cancelled = true;
      unsub();
    };
  }, [env.host, env.key]);

  return <PostHogProvider client={client}>{children}</PostHogProvider>;
}


