import type { ReactNode } from "react";

type ContainerSize = "sm" | "md" | "lg" | "xl" | "full";

type ContainerProps = {
  children: ReactNode;
  size?: ContainerSize;
  className?: string;
};

const sizeClasses: Record<ContainerSize, string> = {
  sm: "max-w-[var(--tbds-container-sm)]",
  md: "max-w-[var(--tbds-container-md)]",
  lg: "max-w-[var(--tbds-container-lg)]",
  xl: "max-w-[var(--tbds-container-xl)]",
  full: "max-w-none",
};

export default function Container({
  children,
  size = "lg",
  className = "",
}: ContainerProps) {
  return (
    <div
      className={`
        ${sizeClasses[size]}

        mx-auto

        px-[var(--tbds-page-padding-compact)]
        sm:px-[var(--tbds-page-padding-comfortable)]
        lg:px-[var(--tbds-page-padding-expanded)]
        2xl:px-[var(--tbds-page-padding-immersive)]

        ${className}
      `}
    >
      {children}
    </div>
  );
}