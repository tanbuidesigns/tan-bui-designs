import Image from "next/image";

type BlogCoverProps = {
  src: string | null;
  alt: string;
  priority?: boolean;
  sizes: string;
  className?: string;
};

export default function BlogCover({
  src,
  alt,
  priority = false,
  sizes,
  className = "",
}: BlogCoverProps) {
  return (
    <div className={`relative overflow-hidden bg-[#101216] ${className}`}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover transition-transform duration-700 group-hover:scale-[1.025] motion-reduce:transition-none"
        />
      ) : null}
    </div>
  );
}
