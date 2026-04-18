import { CalendarDays } from "lucide-react";
import { useI18n } from "@/i18n/i18n";

export const SCHEDULE_CALL_URL = "https://calendar.app.google/PnE55uBqE4Q3eCNs6";

type Props = {
  className?: string;
};

/**
 * Same CTA as the service page: book a conversation via Google Calendar.
 */
export default function ScheduleCallButton({
  className = "inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-onaccent transition-opacity hover:opacity-90",
}: Props) {
  const { t } = useI18n();

  return (
    <a href={SCHEDULE_CALL_URL} target="_blank" rel="noreferrer" className={className}>
      <CalendarDays className="h-4 w-4 shrink-0" />
      {t("service.shared.scheduleCall")}
    </a>
  );
}
