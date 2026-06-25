import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "accent";

type ButtonSize =
  | "sm"
  | "md"
  | "lg";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const baseClasses = `
  group
  relative
  inline-flex
  items-center
  justify-center

  overflow-hidden

  font-medium

  transition-all
  duration-300
  ease-[cubic-bezier(0.22,1,0.36,1)]

  focus:outline-none
  focus-visible:ring-2
  focus-visible:ring-black
  focus-visible:ring-offset-4
`;

const sizeClasses: Record<ButtonSize, string> = {
  sm: `
    px-4
    py-2
    text-xs
  `,
  md: `
    px-6
    py-3
    text-sm
  `,
  lg: `
    px-8
    py-4
    text-base
  `,
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: `
    bg-black
    text-white

    hover:-translate-y-[2px]
    hover:shadow-lg
  `,

  secondary: `
    border
    border-gray-300

    bg-white
    text-black

    hover:border-black
    hover:-translate-y-[2px]
  `,

  ghost: `
    px-1

    bg-transparent
    text-black

    hover:text-black
  `,

  accent: `
    border
    border-gray-200

    bg-white
    text-black

    hover:border-black
    hover:-translate-y-[2px]
  `,
};

const disabledClasses = `
  border
  border-gray-200

  bg-gray-100
  text-gray-400

  cursor-not-allowed

  hover:translate-y-0
  hover:shadow-none
`;

export default function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  const classes = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${disabled ? disabledClasses : variantClasses[variant]}
    ${fullWidth ? "w-full" : ""}
    ${className}
  `;

  const content = (
    <>
      {variant === "accent" && !disabled && (
        <span
          className="
            absolute
            inset-x-0
            bottom-0
            h-[3px]

            bg-gradient-to-r
            from-indigo-300
            via-rose-300
            to-yellow-200

            transition-all
            duration-300

            group-hover:h-full
            group-hover:opacity-30
          "
        />
      )}

      <span className="relative">
        {children}
      </span>

      {variant === "ghost" && !disabled && (
        <span
          className="
            absolute
            left-0
            bottom-1
            h-px
            w-full

            origin-left
            scale-x-0

            bg-gradient-to-r
            from-indigo-300
            via-rose-300
            to-yellow-200

            transition-transform
            duration-300

            group-hover:scale-x-100
          "
        />
      )}
    </>
  );

  if (href && !disabled) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  if (href && disabled) {
    return (
      <span
        className={classes}
        aria-disabled="true"
      >
        {content}
      </span>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      className={classes}
      {...props}
    >
      {content}
    </button>
  );
}