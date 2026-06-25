import type { ReactNode } from "react";

type SectionSpacing =
  | "none"
  | "compact"
  | "standard"
  | "editorial"
  | "hero";

type SectionProps = {
  children: ReactNode;
  id?: string;
  spacing?: SectionSpacing;
  borderTop?: boolean;
  className?: string;
};

const spacingClasses: Record<SectionSpacing, string> = {
  none: "py-0",

  compact: `
    py-12
    md:py-16
    lg:py-20
  `,

  standard: `
    py-16
    md:py-20
    lg:py-24
  `,

  editorial: `
    py-20
    md:py-24
    lg:py-32
  `,

  hero: `
    py-24
    md:py-32
    lg:py-40
  `,
};

export default function Section({
  children,
  id,
  spacing = "editorial",
  borderTop = false,
  className = "",
}: SectionProps) {
  return (
    <section
      id={id}
      className={`
        ${spacingClasses[spacing]}

        ${borderTop ? "border-t border-gray-100" : ""}

        scroll-mt-32

        ${className}
      `}
    >
      {children}
    </section>
  );
}