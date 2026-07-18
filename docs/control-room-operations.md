# Control Room operations

## Purpose and current state

The Control Room is a private website-management interface for Tan Bui Designs. It combines a curated repository baseline, a prioritised action register and integration readiness. Task 6 prepares a controlled production pilot at `dashboard.tanbuidesigns.com`, but it has not been deployed. Local Google OAuth, Better Auth session creation, sign-out and session clearing have been verified on an approved loopback host. Production still fails closed until the exact private host, complete server configuration and a valid application session for the one authorised Google identity are all present.

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

## Google authentication production boundary

The private pilot uses Google Sign-In through Better Auth, followed by an application-owned authorisation check. A hidden URL, navigation omission and `noindex` are discovery controls, not authentication. The OAuth client must request only `openid`, `email` and `profile`; it does not grant access to Google Drive, Gmail, Search Console or any other Google API.

The first authorisation layer runs before session creation. The Google identity token is verified and must contain a verified email that exactly matches `CONTROL_ROOM_ALLOWED_EMAIL` after lowercase normalisation. The shared Control Room server layout then validates the encrypted Better Auth session and repeats the verified exact-email comparison on every protected request. A valid Google account that does not match the allowlisted address receives only a generic denial.

The deployment is database-free. Better Auth stores session state in an encrypted, HTTP-only, host-only cookie using its JWE cookie cache. Sessions expire after approximately eight hours and do not use rolling refresh. OAuth state and the short-lived encrypted provider account cookie are used only for the sign-in exchange. No session, token, identity or provider result is written to a database, KV, D1, R2, browser storage, analytics or logs.

The shared Control Room server layout is the protected-page boundary. It checks the request `Host` before session validation. Development requires `NODE_ENV=development` and `localhost`, `127.0.0.1` or IPv6 loopback after safe port removal. Production requires exactly `dashboard.tanbuidesigns.com`, complete request-time configuration and a valid authorised session. Public hosts, workers.dev, Preview URLs, localhost in production and unknown hosts remain concealed. Missing authentication configuration fails closed with a generic unavailable sign-in state. There is no query-string, cookie-value, header or alternate-host override.

The authentication route applies the same exact-host policy and ignores proxy-supplied forwarded host/protocol headers. Control Room and authentication responses are request-time only, private/no-store at browser and CDN layers, and include `X-Robots-Tag`, no-referrer, nosniff and frame denial. Public caching and metadata are unchanged. The public site does not display a Control Room link, and the public navigation and footer are omitted only inside the private interface.

Task 5's Search Console service-account flow remains separate from interactive Google Sign-In. The pilot does not require a paid identity product, a database or a Cloudflare Zero Trust configuration.

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

Task 6 fixes `dashboard.tanbuidesigns.com` as the only production Control Room host, adds private Google Sign-In with exact-user application authorisation, disables workers.dev and Preview URLs, prevents private response caching and declares required Worker Secret names. The OAuth Web client, exact local and production callbacks, External testing audience, approved test user and local authentication flow are confirmed. All required Worker Secret names and the optional Search Console private-key ID name were confirmed through Cloudflare metadata; their encrypted values were not read back. Production remains undeployed at the Stage B predeployment gate pending the checkpoint commit and explicit deployment approval. Task 6 adds no database or scheduler.

## Task 6 production configuration

Source-controlled non-secret Wrangler variables:

- `CONTROL_ROOM_RUNTIME_MODE=google-auth-protected-production`
- `CONTROL_ROOM_PRODUCTION_HOST=dashboard.tanbuidesigns.com`

Required Worker Secret names:

- `RESEND_API_KEY`
- `PAGESPEED_API_KEY`
- `GSC_SERVICE_ACCOUNT_EMAIL`
- `GSC_SERVICE_ACCOUNT_PRIVATE_KEY`
- `GSC_PROPERTY_ID`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `BETTER_AUTH_SECRET`
- `CONTROL_ROOM_ALLOWED_EMAIL`

`GSC_SERVICE_ACCOUNT_PRIVATE_KEY_ID` remains optional. Cloudflare metadata confirms that all ten expected secret names exist remotely, including that optional name; values remain encrypted and unread. This confirms configuration presence, not availability to an undeployed production runtime. The authorised email, Google client credentials, Better Auth secret and provider values must not appear in source control. `BETTER_AUTH_SECRET` must be a securely generated value of at least 32 characters. Wrangler's `secrets.required` declaration makes a deployment fail when a required secret name is absent. Do not create `.env.production`, copy `.env.local`, or use `wrangler secret put` as part of the controlled deployment; that command creates and immediately deploys a Worker version.

The Wrangler routes preserve `tanbuidesigns.com` and `www.tanbuidesigns.com`, declare `dashboard.tanbuidesigns.com` as a custom domain, and explicitly set `workers_dev` and `preview_urls` to `false`. Cloudflare custom domains create their own DNS record when deployed; do not add a conflicting CNAME.

## Task 6 controlled deployment and verification

The local Stage A manual gate is complete: the operator confirmed the private Google OAuth client, exact authorised identity, approved redirect URIs, local sign-in and sign-out behaviour, and all required Worker Secret names. The [manual gate checklist](./control-room-task6-manual-gate.md) remains the deployment reference. Stage B is still gated before deployment: the reviewed checkpoint commit and explicit deployment approval have not occurred, the private hostname is inactive, and no production authentication or provider runtime has been verified.

Immediately before Stage B deployment:

1. Reconfirm the Task 5 base and Task 6 branch.
2. Verify remote secret names without reading their values.
3. Re-run TypeScript, lint, Next.js and OpenNext builds.
4. Recheck public routes, private headers, `workers_dev=false`, `preview_urls=false` and all three custom domains.
5. Review the complete diff and secret-pattern scan.
6. Create the single `feat(control-room): secure production pilot` checkpoint commit.
7. Run the existing OpenNext `npm run deploy` workflow once.

Post-deployment verification order is deliberate: public apex and `www` health; Control Room denial on both public hosts; unauthenticated private-host sign-in; rejected non-allowlisted Google identity; authorised identity success; exact host and session/email enforcement; one PageSpeed mobile Homepage check; one 28-day Search Console check; private response and CDN cache headers; workers.dev and Preview URL denial; sign-out and session expiry; and responsive review at 1440x900, 1024x768, 768x1024 and 390x844. No Google provider request may originate from protected-page browser code, and no token or provider result is persisted.

## Task 6 rollback

Rollback triggers include public regressions, private-host exposure, failed session or identity validation, missing secrets, authentication loops, provider regression, private HTML caching, alternate-host exposure or deployment instability.

1. Remove or disable the dashboard custom-domain route first when immediate isolation is required.
2. Disable or restrict the Google OAuth client when identity-level isolation is required.
3. Restore the previous known-good Worker version.
4. Confirm both public hosts recover and public `/control-room` remains unavailable.
5. Do not delete production secrets during emergency rollback unless compromise is suspected.
6. For suspected compromise, rotate `BETTER_AUTH_SECRET` to invalidate sessions, rotate the Google OAuth client secret, revoke the OAuth client if necessary, revoke the Search Console service-account key, and rotate any affected provider credentials.
7. Record the reason and outcome. Isolate the private route before investigating application details.

OAuth client restriction or revocation is the identity-level block. Service-account keys should be rotated or revoked on exposure, not routinely copied between environments.

Known limitations before Stage B deployment: Google OAuth, session creation, sign-out and session clearing are verified locally only. Required and optional Worker Secret names are confirmed remotely through metadata, but their encrypted values were not read and their production runtime availability is unverified. The custom domain is declared but inactive. The checkpoint commit, deployment, production authorised and unauthorised identity checks, sign-out, session expiry, PageSpeed and Search Console runs, live cache and noindex checks, responsive review, public-site regression review and rollback verification remain pending. Task 7 readiness is limited to a protected request-scoped identity and serialisable provider results; Task 7 has not started. Task 6 does not add D1, migrations, persistence, history, comparisons, Cron or scheduled collection.

## Rollback and limitations

The Stage A code can be discarded back to the Task 5 checkpoint before deployment. After Stage B, use the Task 6 rollback order above and restore the previous known-good Worker version. Do not alter public pages during rollback. The baseline remains manual; PageSpeed and Search Console remain request-time only; every other external provider remains disconnected.
