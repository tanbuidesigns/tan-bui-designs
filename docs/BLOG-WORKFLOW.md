# Blog workflow

The Blog uses Keystatic in local-storage mode. Article content lives in this
repository under `content/blog`, so the public site does not need a database or
a hosted CMS account.

## Start the editor

1. Open PowerShell in the repository root.
2. Run `npm run dev`.
3. Open `http://127.0.0.1:3000/keystatic`.
4. Choose **Blog articles**.

The editor and its API are available only while Next.js is running in
development mode. Production requests to `/keystatic` and `/api/keystatic/*`
return 404 responses and the routes are marked `noindex`.

## Create or edit an article

Create an entry and complete the title, excerpt, dates, author, cover image,
cover alt text, tags, featured and draft settings, SEO fields and article body.
The title field also controls the editable URL slug.

Keystatic stores each entry in:

```text
content/blog/article-slug/
  index.yaml
  body.mdoc
```

Cover artwork is stored in `public/blog/covers`. Use meaningful alternative
text that describes the artwork rather than repeating the article title.

## Drafts and publication

Entries with `draft: true` are excluded from `/blog`, static route generation,
metadata and related-article links. Set `draft: false` when an article is ready
to publish. Published and updated dates are editable and appear on the index and
article page.

## Direct file editing

You can edit `index.yaml` and `body.mdoc` directly instead of using the visual
editor. Keep the existing field names and use Markdoc/Markdown syntax in
`body.mdoc`. Run the development server or final build afterwards to catch
schema or content errors.

## Save and deploy content

Review the Blog locally, then commit the article files, cover artwork and any
related code changes through the normal Git workflow. Push the reviewed branch
and deploy only after the production build passes. Keystatic local mode writes
files directly into the working tree, so its changes are reviewed like any
other source change.
