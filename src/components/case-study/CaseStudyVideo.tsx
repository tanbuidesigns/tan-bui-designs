"use client";

import Reveal from "@/components/Reveal";
import AnimatedLabel from "@/components/AnimatedLabel";

type CaseStudyVideoProps = {
  title?: string;
  embedUrl?: string;
  videoUrl?: string;
  caption?: string;
};

export default function CaseStudyVideo({
  title = "VIDEO",
  embedUrl,
  videoUrl,
  caption,
}: CaseStudyVideoProps) {
  return (
    <Reveal>
      <section className="max-w-6xl mx-auto px-8 py-24">
        <div className="mb-10">
          <AnimatedLabel>
            {title}
          </AnimatedLabel>
        </div>

        <div className="bg-black overflow-hidden">
          {embedUrl && (
            <div className="relative aspect-video">
              <iframe
                src={embedUrl}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}

          {videoUrl && (
            <video
              controls
              playsInline
              className="w-full"
            >
              <source
                src={videoUrl}
                type="video/mp4"
              />
            </video>
          )}
        </div>

        {caption && (
          <p className="text-gray-500 mt-6 max-w-3xl leading-relaxed">
            {caption}
          </p>
        )}
      </section>
    </Reveal>
  );
}