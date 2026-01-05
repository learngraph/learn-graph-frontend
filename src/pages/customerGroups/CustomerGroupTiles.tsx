import { useNavigate } from "react-router-dom";
import { useI18n } from "@/i18n/i18n";

type Group = "enterprise" | "university" | "individual";

type Props = {
  current: Group;
};

export default function CustomerGroupTiles({ current }: Props) {
  const navigate = useNavigate();
  const { t } = useI18n();

  const groups: { key: Group; path: string; label: string }[] = [
    { key: "enterprise", path: "/enterprise", label: t("nav.enterprise") },
    { key: "university", path: "/university", label: t("nav.university") },
    { key: "individual", path: "/individual", label: t("nav.individual") },
  ];

  return (
    <section className="customer-group-tiles">
      <div className="tiles-grid">
        {groups
          .filter(g => g.key !== current)
          .map(group => (
            <button
              key={group.key}
              className="customer-tile"
              onClick={() => navigate(group.path)}
            >
              {group.label}
            </button>
          ))}
      </div>
    </section>
  );
}
