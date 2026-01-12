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
        border
        text-white
        ${className}
      `}
      style={{ borderColor: 'var(--glass-border)' }}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
};
