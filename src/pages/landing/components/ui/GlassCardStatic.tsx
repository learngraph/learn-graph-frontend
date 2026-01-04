import React from "react";

interface GlassCardStaticProps {
  children: React.ReactNode;
  className?: string;
}

export const GlassCardStatic: React.FC<GlassCardStaticProps> = ({
  children,
  className = "",
}) => {
  return (
    <div
      className={`
        relative
        bg-[var(--glass-bg)]
        backdrop-blur-xl
        border border-glass-border
        text-white
        ${className}
      `}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
};
