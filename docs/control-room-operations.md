# Control Room operations

## Purpose and current state

The Control Room is a private website-management interface for Tan Bui Designs. It combines a curated repository baseline, a prioritised action register and future integration readiness. It is currently available only during local development. The central runtime policy returns `notFound()` for every `/control-room` route in production; there is no override.

Current routes:

- `/control-room`
- `/control-room/pages`
- `/control-room/actions`
- `/control-room/content`
- `/control-room/performance`
- `/control-room/search`
- `/control-room/operations`
- `/control-room/leads`
- `/control-room/change-log`

## Integration architecture

Presentation routes receive normalized data from server-only providers. The integration registry is the single source of lifecycle, freshness, configuration, security and operating status. The working `LocalBaselineProvider` supplies the curated page and action snapshot. PageSpeed and Search Console providers run only after explicit server-rendered form submissions. Other integrations remain disconnected descriptors.

Providers expose a descriptor, `getStatus()` and one domain-specific load method. Do not build a universal plugin framework. Add a provider only when its domain and normalized result are understood.

All provider implementations, registry assembly, future HTTP clients, configuration reads, Cloudflare bindings, token handling and response normalization must import `server-only`. Client Components must never import these modules.

## Provenance, verification and freshness

Every important record identifies its source and whether it is confirmed, inferred or requires verification. Prototype values must never appear as live facts. Provider results are discriminated as `success`, `unavailable` or `error`; safe UI errors contain an error kind and understandable message, never raw exceptions.

Freshness is `current`, `ageing`, `stale`, `unknown` or `not-applicable`. Current refresh modes and planned cadences are separate:

- Local baseline: manual review after material code or content changes.
- PageSpeed lab: one manual on-demand request; no history.
- CrUX field: future monthly or collection-window review; availability is not guaranteed.
- Search Console: one manual finalised-data report; no token or report history.
- Leads: future event-driven handling only after retention and security approval.
- GitHub changes: manual change log unless API assistance becomes useful.

Nothing is scheduled.

## Performance boundary

The allowlist is derived from verified V2 page IDs and currently contains Homepage, Work, About, Contact, Privacy, Urban Eat, Islamiyah Series and Blog. Every target resolves to `https://tanbuidesigns.com`; arbitrary URLs, API routes, Control Room routes, Playground, Keystatic, preview URLs and workers.dev URLs are excluded.

PageSpeed/Lighthouse is laboratory evidence. CrUX is real-user field evidence. They have separate types and providers and must not be merged into one score. Lab results may include category scores, FCP, LCP, CLS, TBT, Speed Index, selected diagnostics and warnings. Field data may include LCP, INP and CLS distributions, coverage, collection period and traffic eligibility.

## Adding a provider safely

1. Define a narrow normalized domain type.
2. Add or update one integration descriptor.
3. Implement inside a `server-only` module.
4. Read configuration only on the server and never use `NEXT_PUBLIC_*`.
5. Validate upstream data before normalization.
6. Return standard success, unavailable or safe error results.
7. Pass normalized data to presentation components through props.
8. Add failure, missing-configuration and stale-data tests.
9. Confirm no public or Client Component imports the provider.
10. Review privacy, persistence, cadence and rollback before connection.

## Configuration and secrets

The typed configuration manifest documents names and request-time status only. Never display or log keys, service-account identities, signed assertions, authorization headers, cookies, token values, raw private logs or lead payloads. Confidential configuration and personal data must remain server-only. Local values belong only in the ignored `.env.local`; future protected deployment values must use Cloudflare Worker Secrets.

## Cloudflare Access production plan

Production must remain unavailable until a separate approved task provides:

1. A Cloudflare Access application and explicit allow policy.
2. Protection for the chosen custom domain or path.
3. A keep/protect/disable decision for workers.dev and preview URLs.
4. Application-side validation of `Cf-Access-Jwt-Assertion`.
5. Audience-tag and issuer/team-domain validation.
6. Generic unauthorized responses and no private response caching.

A hidden URL and `noindex` are not authentication. Task 5 uses `jose` only for Google service-account signing. Do not reuse that token module for Cloudflare Access; Task 6 must implement a separate, explicit Access-token validation boundary.

## Storage, scheduling and privacy

Public information includes public URLs, metadata and future lab results. The action register and operational decisions are internal. API configuration and OAuth tokens are confidential. Future enquiries are personal data.

Persistent storage should be added only for a defined need, retention period, deletion process, access model and rollback. Scheduling should be added only after on-demand collection proves useful and quotas, failure handling and ownership are clear. D1, KV, R2, Cron and lead storage are not configured.

## PageSpeed laboratory provider

The provider uses the PageSpeed Insights API v5 `runPagespeed` GET endpoint for one controlled Lighthouse laboratory snapshot. It supports `mobile` (the default) and `desktop`, and always requests the performance, accessibility, best-practices and SEO categories. PageSpeed-supplied CrUX fields are ignored; real-user performance remains a separate future integration.

The browser submits only a registered target ID, an allowed strategy and explicit `run=1` intent. The provider resolves the URL from the eight-target allowlist, revalidates HTTPS, hostname, credentials, port, fragment and restricted paths, and validates the final audited hostname after redirects. It never accepts a free-form URL. Opening the Performance page, building the application or visiting another route does not run PageSpeed.

`PAGESPEED_API_KEY` is read at request time inside a `server-only` configuration boundary. A missing value returns a normal unavailable result and makes no network request. Never prefix it with `NEXT_PUBLIC_`, pass it through React, print it, log a completed request URL, commit an environment file or store it as a plaintext Wrangler variable. A future deployment must use a Cloudflare Worker Secret.

The request uses `cache: "no-store"`, a 90-second abort timeout and a 10 MB response limit. Unknown JSON is progressively validated before normalization. HTTP, quota, authentication, timeout, network, content-type, response-size, parsing, CAPTCHA and Lighthouse runtime failures map to bounded safe states. Raw upstream bodies, headers, errors and request URLs are never rendered. Diagnostic audits are selected from current performance audit references, bounded to eight and rendered as plain text; warnings are bounded to ten.

Results are not persisted, scheduled, polled or written to the action register. Repeated manual runs may differ because Lighthouse laboratory measurements vary. Roll back by removing the PageSpeed provider and restoring the disconnected provider registration; do not alter public pages or the separate CrUX descriptor.

## Google Search Console provider

The Search Console integration supplies internal, read-only organic-search observations for the enabled `Tan Bui Designs domain` registry record. The dedicated service account must be added to that exact Search Console property as a Full user; owner access is unnecessary. Authentication requests only `https://www.googleapis.com/auth/webmasters.readonly`. It does not use browser OAuth, refresh tokens, domain-wide delegation, an API key, the write-enabled scope, URL Inspection, Indexing API or sitemap mutation.

The server-only configuration boundary reads `GSC_SERVICE_ACCOUNT_EMAIL`, `GSC_SERVICE_ACCOUNT_PRIVATE_KEY`, optional `GSC_SERVICE_ACCOUNT_PRIVATE_KEY_ID` and `GSC_PROPERTY_ID` at request time. The private key must be PKCS#8 PEM; real newlines and escaped `\n` are accepted and normalized internally. Missing names return an unavailable state without a token or Search Analytics request. The registered property ID is never accepted from the browser. Never commit a service-account JSON file, point `GOOGLE_APPLICATION_CREDENTIALS` at one or expose a `NEXT_PUBLIC_GSC_*` value.

For each explicit `run=1`, the server uses `jose` with RS256 to create one assertion lasting no more than one hour. It exchanges that assertion once at `https://oauth2.googleapis.com/token`, validates the unknown token response and discards the assertion and access token after the report. There is no cross-request token cache. Token exchange has a 20-second timeout and a 1 MB response limit. Assertions, token material, service-account values and raw OAuth errors must never be logged or rendered.

The provider then sends exactly five fixed POST requests to the Search Analytics query endpoint: property totals, daily trend, top queries, top canonical pages and device breakdown. Search type is `web`; data state is `final`. There are no browser-defined dates, filters, dimensions, row limits, aggregation settings or query builders. Page-and-query combined grouping, pagination and automatic retries are prohibited. Each Search Analytics request has a 30-second timeout and 5 MB response limit. The totals query is essential; the other four panels may fail independently and produce a bounded partial result.

Reporting supports only `28d` and `90d`, defaulting to 28 days. Dates are calculated with the `America/Los_Angeles` calendar. The inclusive end date is the Pacific date three calendar days before the run; the start date is 27 or 89 days earlier. Recent or preliminary data is not requested. Exact dates are shown in the report.

Google responses are treated as unknown and progressively validated. Metrics must be finite and within their valid ranges. Query text is stripped of control characters and bounded. Page rows must be HTTPS on `tanbuidesigns.com` or `www.tanbuidesigns.com`, contain no credentials or fragments, and are matched to the curated page inventory when possible. Malformed optional rows are omitted with bounded warnings; malformed totals fail safely. Raw responses, headers, complete request bodies and query results are not logged.

Search Console returns top rows rather than a complete export and omits some anonymised queries for privacy. Page data may be aggregated under Google-selected canonical URLs. Average position is not a fixed rank, visible rows may not sum to property totals, and Search Console clicks are not equivalent to analytics sessions. The report is a planning signal, not proof that a website change caused an outcome.

Reports are server-rendered locally, internal, unpersisted and unscheduled. Nothing is written to a database, browser storage, files, logs, analytics or the action register. Credentials should be rotated or revoked if exposure is suspected and the local key should be deleted when no longer required. Roll back by restoring the disconnected Search Console provider registration and removing the Search route; do not change public routes.

Task 6 must choose `dashboard.tanbuidesigns.com` or an explicitly approved protected path, add a single-user Cloudflare Access policy, validate `Cf-Access-Jwt-Assertion` at the application boundary, protect or disable workers.dev and preview hostnames, prevent private response caching and store PageSpeed/Search Console values as Worker Secrets. Production must remain 404 until unauthorised and authorised access paths are verified. Task 6 adds no database or scheduler.

## Rollback and limitations

The Control Room can be rolled back to the Task 4 checkpoint commit. Do not alter public files during rollback. The baseline is manual, PageSpeed and Search Console are request-time only, every other external provider is disconnected, and no remote access protection exists yet.
