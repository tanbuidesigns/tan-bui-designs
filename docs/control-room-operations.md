# Control Room operations

## Purpose and current state

The Control Room is a private website-management interface for Tan Bui Designs. It combines a curated repository baseline, a prioritised action register and future integration readiness. It is currently available only during local development. The central runtime policy returns `notFound()` for every `/control-room` route in production; there is no override.

Current routes:

- `/control-room`
- `/control-room/pages`
- `/control-room/actions`
- `/control-room/content`
- `/control-room/performance`
- `/control-room/operations`
- `/control-room/leads`
- `/control-room/change-log`

## Integration architecture

Presentation routes receive normalized data from server-only providers. The integration registry is the single source of lifecycle, freshness, configuration, security and operating status. The working `LocalBaselineProvider` supplies the V2 page and action snapshot. The current `PerformanceProvider` returns a typed unavailable result. Other integrations remain disconnected descriptors.

Providers expose a descriptor, `getStatus()` and one domain-specific load method. Do not build a universal plugin framework. Add a provider only when its domain and normalized result are understood.

All provider implementations, registry assembly, future HTTP clients, configuration reads, Cloudflare bindings, token handling and response normalization must import `server-only`. Client Components must never import these modules.

## Provenance, verification and freshness

Every important record identifies its source and whether it is confirmed, inferred or requires verification. Prototype values must never appear as live facts. Provider results are discriminated as `success`, `unavailable` or `error`; safe UI errors contain an error kind and understandable message, never raw exceptions.

Freshness is `current`, `ageing`, `stale`, `unknown` or `not-applicable`. Current refresh modes and planned cadences are separate:

- Local baseline: manual review after material code or content changes.
- PageSpeed lab: on demand in Task 4; no history initially.
- CrUX field: future monthly or collection-window review; availability is not guaranteed.
- Search Console: future manual or daily snapshot after authorization; recent and finalized data must later be distinguished.
- Leads: future event-driven handling only after retention and security approval.
- GitHub changes: manual change log unless API assistance becomes useful.

Nothing is scheduled in V3.

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

The typed configuration manifest documents names only. V3 creates no environment value, Wrangler secret or Cloudflare binding. Never display or log keys, authorization headers, cookies, token values, raw private logs or lead payloads. Confidential configuration and personal data must remain server-only.

## Cloudflare Access production plan

Production must remain unavailable until a separate approved task provides:

1. A Cloudflare Access application and explicit allow policy.
2. Protection for the chosen custom domain or path.
3. A keep/protect/disable decision for workers.dev and preview URLs.
4. Application-side validation of `Cf-Access-Jwt-Assertion`.
5. Audience-tag and issuer/team-domain validation.
6. Generic unauthorized responses and no private response caching.

A hidden URL and `noindex` are not authentication. Do not add JWT verification or a `jose` dependency until the access design is approved.

## Storage, scheduling and privacy

Public information includes public URLs, metadata and future lab results. The action register and operational decisions are internal. API configuration and OAuth tokens are confidential. Future enquiries are personal data.

Persistent storage should be added only for a defined need, retention period, deletion process, access model and rollback. Scheduling should be added only after on-demand collection proves useful and quotas, failure handling and ownership are clear. D1, KV, R2, Cron and lead storage are not configured.

## Task 4 checklist

Task 4 may only add a server-only PageSpeed adapter, a justified safe HTTP utility and server-side `PAGESPEED_API_KEY` access. It must accept a target ID, resolve the allowlisted URL, request mobile analysis first, validate and normalize the response, and return the existing provider result shape. It must remain on demand, add no database, scheduler or CrUX call, keep production unavailable and never expose the key.

## Rollback and limitations

V3 can be rolled back to the V2 checkpoint commit. Do not alter public files during rollback. The current registry is static, the baseline is manual, all external providers are disconnected, the loading boundary is brief for local synchronous data, and no remote access protection exists yet.
