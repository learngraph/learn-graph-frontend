import "../styles/landing/landing.css";
import "../styles/customer/customer.css";
import { CustomerNavbar } from "../global/components/CustomerNavbar";

type CustomerGroupPageShellProps = {
  children: React.ReactNode;
};

export default function CustomerGroupPageShell({
  children,
}: CustomerGroupPageShellProps) {
  return (
<main className="customer-page min-h-screen bg-[var(--color-section-bg)] text-[var(--color-text-primary)]">
      <CustomerNavbar />

      {/* page content */}
      <div className="pt-28 pb-24">
        {children}
      </div>
    </main>
  );
}
