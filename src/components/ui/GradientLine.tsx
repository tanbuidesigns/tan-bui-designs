type GradientLineDirection = "horizontal" | "vertical";

type GradientLineSize = "sm" | "md" | "lg" | "full";

type GradientLineProps = {
  direction?: GradientLineDirection;
  size?: GradientLineSize;
  className?: string;
};

const horizontalSizes: Record<GradientLineSize, string> = {
  sm: "w-12",
  md: "w-24",
  lg: "w-40",
  full: "w-full",
};

const verticalSizes: Record<GradientLineSize, string> = {
  sm: "h-12",
  md: "h-24",
  lg: "h-40",
  full: "h-full",
};

export default function GradientLine({
  direction = "horizontal",
  size = "sm",
  className = "",
}: GradientLineProps) {
  if (direction === "vertical") {
    return (
      <div
        className={`
          w-px
          ${verticalSizes[size]}
          bg-[image:var(--tbds-accent-gradient-vertical)]
          ${className}
        `}
      />
    );
  }

  return (
    <div
      className={`
        h-px
        ${horizontalSizes[size]}
        bg-[image:var(--tbds-accent-gradient)]
        ${className}
      `}
    />
  );
}