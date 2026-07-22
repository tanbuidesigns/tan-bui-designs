# TBD-EXP-001 — Public page discovery through a deterministic XML sitemap

- Status: approved for controlled production deployment
- Owner: webmaster
- Affected public route: `/sitemap.xml` (with the canonical reference in `/robots.txt`)
- Date proposed: 2026-07-22
- Baseline Analysis Brief period: 28d
- Baseline source packet hash: `442476cd504a30b43718f60b70b9c9cd910b3a9f37655323b97c1f1b4b800b3e`

## Baseline evidence

- Search facts: 0 clicks and 1 impression.
- The homepage is the only bounded returned page row.
- Search volume is too low to establish a reliable trend.
- Exact Search query text is excluded.

## Technical hypothesis

Providing crawlers with a complete, deterministic sitemap of approved public pages may make public-page discovery clearer. This is a hypothesis, not a promised ranking, traffic, click, indexing or Search Console outcome.

## Immediate technical success measures

- `/sitemap.xml` returns HTTP 200 and valid sitemap XML on the approved public host.
- URLs use the canonical apex hostname, are unique, query-free and HTTPS-only.
- Approved public pages are represented; private, administrative, authentication, API, draft and unavailable routes are excluded.
- Output is deterministic, uses stable ordering and requires no database, provider or external API request.

## Later observational measures

- Additional public pages may appear in bounded Search Console page evidence.
- Sitemap processing may become visible in Search Console.
- More usable page-level evidence and two comparable periods may become available.

Later observations must not be described as proof that the sitemap caused any result.

## Review window

- Immediate technical verification after any approved deployment.
- First observational review after one complete 28-day Search period.
- Stronger comparison after two usable periods.

## Rollback condition

Roll back if the sitemap exposes private or non-indexable routes, emits invalid/unstable URLs, changes public page behaviour, or introduces a production runtime dependency.

## Evidence references

- `src/app/sitemap.ts`
- `src/app/robots.ts`
- `src/data/projects.ts`
- `src/data/blog.generated.ts`
- `tests/seo/experiment-001-sitemap.test.mjs`
- Production inspection on 2026-07-22: both `/sitemap.xml` hosts returned 404; `/robots.txt` returned 200 without a sitemap reference.
