# Playground image workflow

Add finished Playground artwork as WebP files directly inside `public/playground`.

Use this filename structure:

```text
category__description.webp
```

Examples:

```text
pitch-idea__pharma-exhibition.webp
brand-exploration__restaurant-identity.webp
illustration-style__childrens-book.webp
3d-render__exhibition-concept.webp
```

The text before `__` becomes the category and the text after it becomes the visible title and alt-text basis. Hyphens become spaces. A file without `__` uses `Design exploration` as its category.

Restart `npm run dev`, run `npm run build`, or run `npm run generate:manifests`. The generated `src/data/playground.generated.ts` file updates automatically. Commit the WebP files and generated data file together.

When at least one real WebP exists, the page automatically replaces the abstract placeholder collection with the generated image collection.
