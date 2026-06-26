"use client";

type AnimatedStrokeProps = {
  active?: boolean;
  align?: "left" | "right";
  className?: string;
};

export default function AnimatedStroke({
  active = false,
  align = "left",
  className = "",
}: AnimatedStrokeProps) {
  return (
    <div
      aria-hidden="true"
      className={className}
      style={{
        display: "block",
        width: active
          ? "min(520px, 72%)"
          : "min(180px, 32%)",
        height: "3px",
        borderRadius: "999px",
        background: "var(--tbds-accent-gradient)",
        marginLeft: align === "right" ? "auto" : undefined,
        transition:
          "width 700ms cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    />
  );
}