"use client";

type ServiceGlyphProps = {
  type:
    | "branding"
    | "packaging"
    | "publications"
    | "websites"
    | "exhibitions"
    | "systems";
};

export default function ServiceGlyph({
  type,
}: ServiceGlyphProps) {
  const common =
    "w-6 h-6 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]";

  switch (type) {
    case "branding":
      return (
        <svg
          viewBox="0 0 24 24"
          className={common}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle cx="12" cy="12" r="8" />
          <path d="M12 4 A8 8 0 0 1 12 20" />
        </svg>
      );

    case "packaging":
      return (
        <svg
          viewBox="0 0 24 24"
          className={common}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <rect
            x="5"
            y="5"
            width="14"
            height="14"
          />
          <path d="M5 12H19" />
        </svg>
      );

    case "publications":
      return (
        <svg
          viewBox="0 0 24 24"
          className={common}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <rect
            x="6"
            y="4"
            width="12"
            height="16"
          />
          <path d="M9 8H15" />
          <path d="M9 12H15" />
          <path d="M9 16H13" />
        </svg>
      );

    case "websites":
      return (
        <svg
          viewBox="0 0 24 24"
          className={common}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <rect
            x="4"
            y="5"
            width="16"
            height="14"
            rx="1"
          />
          <path d="M4 9H20" />
        </svg>
      );

    case "exhibitions":
      return (
        <svg
          viewBox="0 0 24 24"
          className={common}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <polygon
            points="12,4 20,12 12,20 4,12"
          />
        </svg>
      );

    case "systems":
      return (
        <svg
          viewBox="0 0 24 24"
          className={common}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M12 4V20" />
          <path d="M4 12H20" />
          <circle
            cx="12"
            cy="12"
            r="3"
          />
        </svg>
      );

    default:
      return null;
  }
}