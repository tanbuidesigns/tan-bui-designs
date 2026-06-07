"use client";

type AnimatedHeadlineProps = {
  children: string;
  className?: string;
};

export default function AnimatedHeadline({
  children,
  className = "",
}: AnimatedHeadlineProps) {
  const words = children.split(" ");

  return (
    <h2 className={className}>
      {words.map((word, index) => (
        <span
          key={index}
          className="
            inline-block
            mr-[0.25em]
            transition-all
            duration-300
            ease-[cubic-bezier(0.22,1,0.36,1)]
            hover:-translate-y-[2px]
            hover:text-gray-600
          "
        >
          {word}
        </span>
      ))}
    </h2>
  );
}