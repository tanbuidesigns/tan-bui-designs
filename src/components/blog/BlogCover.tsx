import Image from "next/image";

import artworkStyles from "./BlogCoverArtwork.module.css";

type BlogCoverProps = {
  src: string | null;
  alt: string;
  priority?: boolean;
  sizes: string;
  className?: string;
  artwork?: string | null;
};

const artworkRegistry = {
  "designer-preparation": DesignerPreparationArtwork,
} as const;

export type BlogArtworkKey = keyof typeof artworkRegistry;

export function isBlogArtworkKey(value: string | null): value is BlogArtworkKey {
  return value !== null && value in artworkRegistry;
}

export default function BlogCover({ src, alt, priority = false, sizes, className = "", artwork = null }: BlogCoverProps) {
  const Artwork = isBlogArtworkKey(artwork) ? artworkRegistry[artwork] : null;

  return (
    <div className={`relative overflow-hidden bg-[#101216] ${className}`}>
      {Artwork ? <Artwork /> : null}
      {src && !Artwork ? <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover transition-transform duration-700 group-hover:scale-[1.025] motion-reduce:transition-none" /> : null}
    </div>
  );
}

function DesignerPreparationArtwork() {
  return (
    <div className={artworkStyles.artwork} data-blog-artwork="designer-preparation" aria-hidden="true">
      <div className={artworkStyles.glow} />
      <div className={artworkStyles.inputs}>
        <span className={artworkStyles.triangle} />
        <span className={artworkStyles.hexagon} />
        <span className={`${artworkStyles.miniCard} ${artworkStyles.miniCardOne}`}><i /><i /><i /></span>
        <span className={`${artworkStyles.miniCard} ${artworkStyles.miniCardTwo}`}><i /><i /></span>
        <span className={artworkStyles.penNib} />
        <span className={artworkStyles.cursor} />
      </div>

      <svg className={artworkStyles.flow} viewBox="0 0 1000 600" preserveAspectRatio="none">
        <defs>
          <linearGradient id="designer-preparation-flow" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#c7d2fe" /><stop offset=".48" stopColor="#f9a8d4" /><stop offset="1" stopColor="#fef3c7" />
          </linearGradient>
        </defs>
        <path className={artworkStyles.flowShadow} d="M170 420C310 160 410 500 558 298S740 176 866 260" />
        <path className={artworkStyles.flowLine} d="M170 420C310 160 410 500 558 298S740 176 866 260" />
        <path className={artworkStyles.secondaryLine} d="M206 458C330 282 422 498 574 354S730 252 824 300" />
        <g className={artworkStyles.handles}>
          <path d="M170 420L278 220M558 298L666 154M866 260L784 198" />
          <circle cx="170" cy="420" r="7" /><circle cx="278" cy="220" r="5" /><circle cx="558" cy="298" r="7" /><circle cx="666" cy="154" r="5" /><circle cx="866" cy="260" r="7" /><circle cx="784" cy="198" r="5" />
        </g>
      </svg>

      <div className={artworkStyles.artboard}>
        <span className={artworkStyles.artboardBar}><i /><i /><i /></span>
        <span className={artworkStyles.selectedRegion}><i /><i /><i /><i /></span>
        <span className={artworkStyles.navModule}><i /><i /><i /></span>
        <span className={artworkStyles.contentBlock} />
        <span className={artworkStyles.contentBlockShort} />
        <span className={artworkStyles.buttonModule} />
        <span className={artworkStyles.measureHorizontal} />
        <span className={artworkStyles.measureVertical} />
      </div>
      <div className={artworkStyles.nodes}><i /><i /><i /><i /></div>
    </div>
  );
}
