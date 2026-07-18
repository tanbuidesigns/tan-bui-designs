import type { PlaygroundItem } from "@/data/playground.generated";

const placeholderIdeas = [
  ["Brand exploration", "Restaurant identity", "wide", "swept"],
  ["Pitch idea", "Exhibition concept", "tall", "opposite"],
  ["Illustration style", "Character study", "square", "round"],
  ["3D study", "Spatial composition", "portrait", "soft"],
  ["Layout experiment", "Editorial rhythm", "panorama", "opposite"],
  ["Visual research", "Reflective forms", "standard", "swept"],
  ["Packaging study", "Structural labels", "wide", "soft"],
  ["Motion frame", "Kinetic typography", "square", "round"],
  ["Logo study", "Modular symbol", "tall", "swept"],
  ["Campaign concept", "Seasonal system", "standard", "opposite"],
  ["Drawing study", "Organic geometry", "portrait", "round"],
  ["Pitch idea", "Healthcare environment", "panorama", "soft"],
  ["Brand exploration", "Cultural identity", "wide", "opposite"],
  ["3D study", "Light and material", "square", "swept"],
  ["Layout experiment", "Publication cover", "tall", "soft"],
  ["Illustration style", "Editorial marks", "standard", "round"],
  ["Packaging study", "Retail range", "portrait", "opposite"],
  ["Visual research", "Colour and texture", "wide", "swept"],
] as const;

export const playgroundPlaceholders = placeholderIdeas.map(
  ([category, title, layout, corner], index) => ({
    id: `placeholder-${index + 1}`,
    kind: "placeholder" as const,
    category,
    title,
    alt: `${title} — placeholder ${category.toLowerCase()}`,
    layout,
    corner,
    art: index % 6,
  })
) satisfies readonly PlaygroundItem[];
