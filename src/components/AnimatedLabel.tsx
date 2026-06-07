"use client";

type AnimatedLabelProps = {
  children: string;
  className?: string;
};

export default function AnimatedLabel({
  children,
  className = "",
}: AnimatedLabelProps) {
  return (
    <div className={`hero-brand ${className}`}>
      {children.split("").map((letter, index) => (
        <span
          key={index}
          className={`hero-letter ${
            letter === " " ? "mx-2" : ""
          }`}
          style={{
            transitionDelay: `${index * 25}ms`,
          }}
        >
          {letter}
        </span>
      ))}
    </div>
  );
}