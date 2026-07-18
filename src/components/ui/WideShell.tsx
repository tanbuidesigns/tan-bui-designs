import type { ReactNode } from "react";

type WideShellProps = {
  children: ReactNode;
  className?: string;
};

export default function WideShell({
  children,
  className = "",
}: WideShellProps) {
  return (
    <div
      className={`mx-auto w-full max-w-[96rem] px-[var(--tbds-page-padding-compact)] sm:px-[var(--tbds-page-padding-comfortable)] lg:px-[var(--tbds-page-padding-expanded)] 2xl:px-[var(--tbds-page-padding-immersive)] ${className}`}
    >
      {children}
    </div>
  );
}
