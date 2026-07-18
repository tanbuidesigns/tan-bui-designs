import { collection, config, fields } from "@keystatic/core";

export const showAdminUI = process.env.NODE_ENV === "development";

export default config({
  storage: { kind: "local" },
  collections: {
    blog: collection({
      label: "Blog articles",
      slugField: "title",
      path: "content/blog/*/",
      schema: {
        title: fields.slug({
          name: { label: "Title", validation: { isRequired: true } },
        }),
        excerpt: fields.text({
          label: "Excerpt",
          multiline: true,
          validation: { isRequired: true },
        }),
        publishedDate: fields.date({
          label: "Published date",
          validation: { isRequired: true },
        }),
        updatedDate: fields.date({
          label: "Updated date",
          validation: { isRequired: true },
        }),
        author: fields.text({
          label: "Author",
          defaultValue: "Tan Bui",
          validation: { isRequired: true },
        }),
        cover: fields.image({
          label: "Cover artwork",
          directory: "public/blog/covers",
          publicPath: "/blog/covers/",
        }),
        coverAlt: fields.text({
          label: "Cover alternative text",
          validation: { isRequired: true },
        }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          itemLabel: (props) => props.value || "Tag",
        }),
        featured: fields.checkbox({ label: "Featured article", defaultValue: false }),
        draft: fields.checkbox({ label: "Draft", defaultValue: true }),
        seoTitle: fields.text({
          label: "SEO title",
          validation: { isRequired: true },
        }),
        seoDescription: fields.text({
          label: "SEO description",
          multiline: true,
          validation: { isRequired: true },
        }),
        body: fields.markdoc({ label: "Article body" }),
      },
    }),
  },
});
