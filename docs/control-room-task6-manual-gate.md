# Control Room Task 6 manual gate

This checklist is the mandatory boundary between locally validated Task 6 code and any production change. Do not create Google credentials, enter Worker Secrets, activate the dashboard custom domain, commit, push or deploy during Stage A.

## Google OAuth client

- [ ] A Google OAuth 2.0 Web application client is approved for the private Control Room.
- [ ] The OAuth consent screen is configured for the intended private use.
- [ ] Only the `openid`, `email` and `profile` scopes are requested.
- [ ] Production authorised JavaScript origin: `https://dashboard.tanbuidesigns.com`.
- [ ] Production redirect URI: `https://dashboard.tanbuidesigns.com/api/auth/callback/google`.
- [ ] Development authorised JavaScript origin: `http://localhost:3000`.
- [ ] Development redirect URI: `http://localhost:3000/api/auth/callback/google`.
- [ ] No public portfolio hostname, workers.dev hostname, Preview URL or wildcard origin is authorised.
- [ ] The Google client ID and client secret will be transferred privately and never written to source control or the report.

## Exact identity and session

- [ ] `CONTROL_ROOM_ALLOWED_EMAIL` is the one exact approved Google account.
- [ ] The approved account has a Google-verified email address.
- [ ] `BETTER_AUTH_SECRET` is securely generated, unique to this deployment and at least 32 characters.
- [ ] The approximately eight-hour, non-rolling session policy is approved.
- [ ] The database-free encrypted-cookie session model is approved.
- [ ] No database, persistence, scheduler or paid identity service is required for this pilot.

## Required production secrets

- [ ] `GOOGLE_CLIENT_ID`
- [ ] `GOOGLE_CLIENT_SECRET`
- [ ] `BETTER_AUTH_SECRET`
- [ ] `CONTROL_ROOM_ALLOWED_EMAIL`
- [ ] `RESEND_API_KEY`
- [ ] `PAGESPEED_API_KEY`
- [ ] `GSC_SERVICE_ACCOUNT_EMAIL`
- [ ] `GSC_SERVICE_ACCOUNT_PRIVATE_KEY`
- [ ] `GSC_PROPERTY_ID`

`GSC_SERVICE_ACCOUNT_PRIVATE_KEY_ID` remains optional. Confirm secret names without displaying their values. Add the complete set in one controlled dashboard edit during Stage B.

## Configuration review

- [ ] Runtime mode is `google-auth-protected-production`.
- [ ] Production host is exactly `dashboard.tanbuidesigns.com`.
- [ ] `tanbuidesigns.com` and `www.tanbuidesigns.com` remain public routes.
- [ ] `workers_dev` and `preview_urls` remain disabled.
- [ ] The dashboard custom domain is declared locally but is not active yet.
- [ ] Private Control Room and authentication responses are no-store and noindex.
- [ ] The public site contains no Control Room navigation link.
- [ ] No authentication or provider credential appears in the diff.

## Stage B approval

- [ ] The complete Task 6 diff has been reviewed.
- [ ] Local TypeScript, lint, Next.js, OpenNext and dry-run checks have been reviewed.
- [ ] Local public-route, host-boundary, missing-configuration and private-header checks have been reviewed.
- [ ] The operator has explicitly approved creation of the Google OAuth client and remote secrets.
- [ ] The operator has explicitly approved the private custom-domain activation and deployment.
- [ ] The rollback order and post-deployment identity test plan are understood.

Until every applicable item is confirmed, stop at this manual gate. Do not commit, push, deploy, create credentials, edit DNS, activate the custom domain or begin Task 7.
