# AGENTS.md

## Tan Bui Designs repository guide

This file defines how coding agents should work inside the Tan Bui Designs portfolio repository.

Treat these instructions as durable project rules. Do not replace established behaviour, copy, or components just because another implementation appears more fashionable or technically interesting.

The project owner is a senior multidisciplinary designer who is building the site personally and uses Codex as a practical development partner. The best result is not the largest change. The best result is the smallest well-considered change that improves the site without breaking approved work.

---

## 1. Project purpose

Tan Bui Designs is a premium personal portfolio and consultancy website for Tan Bui.

The site should communicate:

- 15+ years of multidisciplinary design experience
- strategic and craft-led thinking
- expertise across print, branding, packaging, publications, digital, web, exhibitions, illustration, motion, video, 3D, marketing, and healthcare communications
- the ability to turn complex briefs into clear, usable, memorable design systems
- a human personality rather than a generic agency voice

The target impression is:

- experienced
- polished
- intelligent
- human
- visually confident
- premium without becoming over-designed
- credible to employers, agencies, healthcare clients, and direct consultancy clients

The visual ambition is closer to high-quality editorial portfolio sites, Finsweet-style culture pages, and strong Awwwards references than to a standard template portfolio.

Do not imitate another website directly. Learn from scale, spacing, hierarchy, visual rhythm, interaction, and image treatment, then apply those principles in the existing Tan Bui Designs visual language.

---

## 2. Owner collaboration rules

### 2.1 Work incrementally

For visual redesign work, change one section or one component at a time unless the user explicitly asks for a full coordinated redesign.

Before implementing a subjective layout change:

1. Inspect the existing component and nearby shared components.
2. State which section will change.
3. Preserve everything outside that scope.
4. Ask focused questions when the visual intent is unclear.
5. Do not redesign unrelated sections while solving one issue.

### 2.2 Preserve approved work

Several components have already gone through many rounds of testing. Do not casually refactor or replace them.

When a component is described as approved, final, perfect, or working:

- preserve its public API
- preserve touch behaviour
- preserve keyboard behaviour
- preserve responsive behaviour
- preserve visual behaviour unless the request specifically targets it
- avoid “cleanup” refactors that could introduce regressions

### 2.3 Give complete replacements when requested

The owner commonly prefers complete file replacements because partial snippets can be difficult to merge safely.

When supplying code in conversation:

- always name the exact file path
- provide a full replacement when the user asks for one
- for a tiny one-line correction, a precise one-line edit is acceptable
- never omit imports or supporting types from a promised full replacement

Inside Codex, edit the real file directly, then summarize the exact files changed.

### 2.4 Do not change copy without permission

Copywriting is part of the design system.

Unless the request is explicitly about copy:

- preserve existing wording exactly
- do not shorten paragraphs
- do not add decorative labels, pills, slogans, or explanatory microcopy
- do not invent credentials, metrics, clients, awards, or outcomes
- do not make the tone more corporate

When copy changes are requested, prefer language that feels like a smart normal person speaking, not agency jargon.

### 2.5 Communication style

Be direct and practical.

When reporting work:

- say what changed
- say what was preserved
- state which checks were run
- mention any uncertainty or remaining risk
- do not hide build failures
- do not claim visual verification unless the page was actually opened and checked

---

## 3. Technology and repository assumptions

Current known stack:

- Next.js App Router
- TypeScript
- React
- Tailwind CSS
- Next.js `Image`
- Next.js `Link`
- Git and GitHub
- npm
- Cloudflare deployment using OpenNext-related tooling

Do not assume exact package versions. Read these files first:

- `package.json`
- lockfile, normally `package-lock.json`
- `next.config.*`
- `tsconfig.json`
- Tailwind configuration if present
- Cloudflare/OpenNext configuration files if present

Use the package manager represented by the committed lockfile. Do not replace npm with pnpm, Yarn, or Bun unless the owner explicitly approves it.

Do not add a dependency when the result can be achieved cleanly with the existing stack.

Ask before adding any production dependency.

---

## 4. First actions in every new Codex task

Before editing:

1. Confirm the repository root with `git rev-parse --show-toplevel`.
2. Read this `AGENTS.md`.
3. Run `git status --short`.
4. Inspect the exact files named by the request.
5. Inspect directly related shared components and data files.
6. Check whether the working tree already contains user changes.
7. Do not overwrite unrelated uncommitted work.

For a complex or visual task, create a short plan before editing.

For a narrow bug fix, move directly after inspection.

Never begin with a broad repository-wide refactor unless explicitly requested.

---

## 5. Repository map

Known important locations:

```text
src/
  app/
    about/page.tsx
    work/page.tsx
    work/islamiyah-series/page.tsx
    work/urban-eat/page.tsx
    work/urban-eat/UrbanEatClient.tsx
    layout.tsx
    globals.css

  components/
    FeaturedWorkSection.tsx
    Navbar.tsx
    Footer.tsx
    Reveal.tsx
    AnimatedLabel.tsx
    AnimatedHeadline.tsx

    case-study/
      CaseStudyImageCarousel.tsx
      CaseStudyPreviewStrip.tsx
      CaseStudyMetrics.tsx
      CaseStudyQuote.tsx
      CaseStudyServicesTicker.tsx
      CaseStudyNavigation.tsx
      CaseStudyTimeline.tsx
      ReadingProgressBar.tsx
      CaseStudyProgressNav.tsx
      ...

    ui/
      Button.tsx
      Container.tsx
      Section.tsx
      GradientLine.tsx
      ...

  data/
    projects.ts
    caseStudies/
      islamiyah.ts
      ...

public/
  about/
  projects/
    islamiyah-series/
    urban-eat/
```

This map is descriptive, not permission to invent missing files. Verify paths in the actual repository before editing.

---

## 6. Current public work routes

The current Work grid is intentionally focused.

Known public project routes:

- `/work/islamiyah-series`
- `/work/urban-eat`

Do not add unpublished projects to the Work grid without approval.

Do not add Johnson & Johnson or other sensitive client work merely because it appears in internal notes or previous experience.

TBDS and other planned case studies should only appear once their pages and assets are ready.

Project card data is maintained in:

```text
src/data/projects.ts
```

Preserve explicit `href` values and do not derive routes in a way that breaks current links.

---

## 7. Design system principles

### 7.1 Core aesthetic

- primarily black and white
- clean typography
- selective use of the existing Tan Bui Designs gradient
- restrained shadows
- high-quality image presentation
- editorial scale
- deliberate asymmetry
- rounded corners where already established
- movement that feels smooth and purposeful

Avoid:

- decorative pills with no clear function
- random labels layered over images
- multiple competing visual ideas in one section
- excessive gradients
- generic glassmorphism
- excessive card grids
- making every section two columns
- stretching content merely to fill a wider screen

### 7.2 Width strategy

A wider page does not mean wider paragraphs.

Use three conceptual widths:

1. **Reading width** for long text
   - usually around `max-w-3xl` to `max-w-4xl`

2. **Content width** for structured sections
   - usually around `max-w-6xl` to `max-w-7xl`

3. **Showcase width** for hero imagery, galleries, and visual compositions
   - may extend to approximately `92rem` to `100rem` when the composition genuinely benefits

Keep alignment consistent across neighbouring sections.

Do not introduce a new width value in every section. Reuse a small number of clear layout widths.

### 7.3 Responsive layout

The site follows a gadget-first approach, not desktop-first shrinking.

On mobile and tablet:

- maintain large touch targets
- preserve swipe interactions
- avoid narrow text beside tiny images
- stack content in a meaningful reading order
- hide purely decorative breakout images when necessary
- prevent horizontal overflow
- avoid sticky or nested scrolling traps
- preserve comfortable outer gutters

Use `[overflow-x:clip]` on a page root when horizontal clipping is needed.

Avoid `overflow-x-hidden` on large page containers because it has previously created nested scroll containers and double-scrollbar problems in some browsers.

### 7.4 Typography

Headlines must be composed, not merely enlarged.

Rules:

- avoid repeated single-word lines unless it is an intentional art-directed composition
- test likely wrapping at mobile, laptop, and wide desktop widths
- use `clamp()` when helpful, but do not rely on one aggressive fluid size for every viewport
- control headline width and font size together
- prefer two or three balanced lines over a tall stack of isolated words
- do not add punctuation that the approved copy does not contain
- keep body copy readable and narrower than the visual container

### 7.5 Images

Use fewer, stronger images rather than filling every section with images.

Image rules:

- use `next/image` for local content images
- provide accurate, useful alt text
- do not keyword-stuff alt text
- use `priority` only for genuine above-the-fold images
- define responsive `sizes`
- preserve meaningful focal points with deliberate `object-position` where needed
- avoid duplicating the same image repeatedly on one page unless it serves a clear narrative purpose
- use black-and-white to colour hover treatment only where it enhances the concept
- hover-only effects must still look complete on touch devices

Local About assets:

```text
/about/about-01.webp  circular profile portrait
/about/about-02.webp  studio / working image
/about/about-03.webp  studio / photoshoot image
/about/about-04.webp  studio / photoshoot image
/about/about-05.webp  studio / photoshoot image
/about/about-06.webp  black-and-white desk / designing image
```

Remote stock images are temporary visual placeholders. Before production use:

- prefer downloading and optimising the chosen asset into `public/`
- confirm usage rights
- avoid relying permanently on unstable third-party image URLs
- do not configure new remote image domains without checking `next.config.*`

### 7.6 Motion

Motion should explain hierarchy, reward interaction, or add atmosphere.

Good uses:

- reveal transitions
- subtle image scale on hover
- black-and-white to colour transition
- restrained gradient movement
- light parallax or floating decorative shapes
- active timeline progress

Bad uses:

- constant movement everywhere
- movement that prevents reading
- motion that changes layout height unexpectedly
- auto-advancing content without user control
- animations that create scroll locking

Always support `prefers-reduced-motion`.

---

## 8. About page direction

The About page is being refined section by section.

Do not replace the entire page design unless explicitly requested.

Current approved direction includes:

- a wider, more screen-filling composition than the earliest version
- deliberate alignment rather than simple stretching
- large but controlled headline typography
- asymmetrical layouts
- Finsweet-inspired confidence and spacing without copying Finsweet
- Awwwards-inspired image scale and visual rhythm without becoming impractical
- restrained animated gradient glows and shapes
- human-led copy
- fewer unnecessary labels and pills

Known current copy decisions:

- hero eyebrow: `15+ years of craft and strategy`
- hero headline direction: `From complex briefs to clear design systems`
- personal line: `Loves designing, eating homemade food, and learning new things every day.`
- final CTA headline: `The work continues`

Do not reintroduce:

- the small `ABOUT` label in the hero
- `The learning continues` in the final CTA
- decorative text pills over the hero image
- random words poking from behind the image
- excessively tall headline wrapping with one word per line

For any future About section redesign, ask about that section first and preserve all approved sections.

---

## 9. Featured Work behaviour

`src/components/FeaturedWorkSection.tsx` has custom interaction behaviour.

Expected behaviour:

- each card may contain three images
- image order can be randomized on initial load
- the slider starts at index `0` of the chosen order
- no automatic looping motion
- no infinite clones
- left arrow starts disabled
- right arrow advances until the final image
- the slider stops at the end
- users navigate backwards manually
- horizontal swipe changes the image
- vertical drag scrolls the page and must not open the case study
- a clean tap may navigate to the case study
- title links to the case study
- `View case study →` is the explicit text action
- hover zoom stays clipped inside the card

Do not reintroduce infinite clone logic. It previously caused blank or grey slides.

Do not simplify pointer-direction detection without testing real vertical phone scrolling.

---

## 10. Case study carousel rules

`src/components/case-study/CaseStudyImageCarousel.tsx` is an approved, high-risk component.

Preserve these behaviours:

- mixed image ratios
- desktop click-and-drag
- mobile swipe
- momentum
- arrow navigation
- gradient dots
- lightbox
- thumbnail strip
- active thumbnail auto-scroll
- mobile portrait and landscape support
- swipe on the main lightbox image
- a vertical page drag must not open the lightbox
- mobile initial gutter can scroll away naturally
- desktop edge guards remain appropriate
- small galleries can centre thumbnails

Do not replace it with a third-party carousel without approval.

Do not change touch handling while adjusting only visual height or width.

When later increasing carousel visual scale:

- preserve natural image ratios
- test landscape and portrait content
- avoid cropping key artwork
- confirm mobile height does not trap the page
- verify touch, arrows, dots, lightbox, and thumbnails after the change

---

## 11. Other approved case-study components

### `CaseStudyPreviewStrip.tsx`

Preserve:

- existing appearance
- auto-scroll
- touch drag on mobile and tablet
- trackpad horizontal scrolling on desktop
- auto-scroll resuming after interaction

### `CaseStudyServicesTicker.tsx`

Preserve:

- current Apple-like rolling treatment
- centred active service
- grey services above and below
- seamless movement
- no dots
- no extra dividing line
- the existing `Curriculum Design` to `Project Management` display mapping

### `CaseStudyNavigation.tsx`

Use this shared component for case study navigation.

Do not build a separate custom navigation card inside an individual case study.

It must hide a previous or next project when:

- the project is missing
- the project matches `currentSlug`

Links should resolve to `/work/${project.slug}` unless the component API or project data explicitly supplies another route.

### `CaseStudyTimeline.tsx`

Preserve the separate timeline structure where it is already used.

Timeline motion must not introduce focus traps, nested scrolling, or unexpected scroll jumps.

---

## 12. Case study content rules

### Islamiyah Series

- preserve copy from `src/data/caseStudies/islamiyah.ts`
- do not rewrite it during layout changes
- long sections may use the approved accordion structure
- timeline remains a separate timeline component
- results remain last
- role arrays should render as chips or structured values, not as a jammed string
- bottom navigation should link correctly to Urban Eat

### Urban Eat

Known asset ranges:

```text
brand-craft: 01–24
award: 01–07
packaging: 01–51
roots: 01–14
costa-pitch: 01–15
```

Do not generate references to non-existent package image 52.

Maintain the current legacy notice and established section copy unless asked to change them.

---

## 13. Accessibility

Every change should consider:

- semantic landmarks
- one clear page-level `h1`
- logical heading order
- descriptive link text
- button semantics
- keyboard access
- visible focus styles
- colour contrast
- reduced motion
- alt text
- touch target size
- avoiding content that is available only on hover

Decorative images and gradient shapes should use `aria-hidden="true"` where appropriate.

Interactive cards must not become nested conflicting links and buttons.

---

## 14. SEO and machine readability

The site should be readable by search engines and AI systems without damaging the human experience.

Use:

- semantic HTML
- accurate page metadata
- stable canonical page structure
- clear headings
- meaningful body copy
- descriptive image alt text
- structured data where it accurately represents the person, service, article, or project
- visible contact and service information where appropriate

Do not:

- keyword-stuff copy
- hide large SEO-only text blocks
- invent testimonials or metrics
- add unsupported schema properties
- describe Tan Bui with titles or achievements that are not approved

Structured data should complement visible content, not contradict it.

If a page is a client case study, be careful about publicly exposing confidential client information.

---

## 15. Performance

Before adding visual effects, consider their cost.

Preferred practices:

- optimise local images as WebP or AVIF where practical
- keep featured images reasonably compressed
- avoid loading every gallery image eagerly
- reserve `priority` for above-the-fold content
- avoid large JavaScript animation libraries for effects achievable with CSS
- avoid unnecessary client components
- keep layout shifts low by defining dimensions or aspect ratios
- avoid permanent remote stock-image dependencies

Do not sacrifice touch reliability or readability for a minor animation.

---

## 16. TypeScript and React conventions

- keep TypeScript strictness intact
- do not use `any` to silence a real type problem
- type component props explicitly
- use `ReactNode` only when the component genuinely accepts arbitrary children
- keep data arrays outside components when static
- avoid unnecessary state
- avoid effects for values that can be derived during render
- clean up observers, timers, and event listeners
- use `window.setTimeout` types safely in browser components
- respect server/client boundaries in the Next.js App Router
- add `"use client"` only when hooks, browser APIs, or client interaction require it

Do not convert a server component to a client component merely for styling.

---

## 17. Styling conventions

- use existing Tailwind patterns
- reuse shared UI components where they genuinely fit
- do not force a shared component into a design that requires many overrides
- preserve established radius values such as approximately `1.35rem` where used across the site
- keep shadows subtle and consistent
- keep class lists readable
- extract repeated visual patterns into a local helper component when it improves clarity
- avoid creating a global abstraction for a one-off experiment

When adding custom keyframes:

- namespace them with `tbds-`
- include reduced-motion handling
- ensure they do not collide with other page styles

---

## 18. Git safety and change control

Before editing:

```powershell
git status
```

Do not discard, reset, stash, or overwrite user changes without explicit permission.

Prefer focused commits.

Suggested workflow:

```powershell
git status
npm run build
git add -A
git commit -m "Describe the focused change"
git push origin HEAD
npm run deploy
```

Do not commit:

- `.env*` secrets
- local Codex logs
- build output unless already tracked by project convention
- screenshots or test artefacts unless requested
- unrelated formatting changes

Never run destructive Git commands such as `git reset --hard`, `git clean -fd`, force-push, or branch deletion without explicit approval.

---

## 19. Verification requirements

For every code change, run the checks appropriate to the scope.

Minimum expected check for this project:

```powershell
npm run build
```

Also run when available and relevant:

```powershell
npm run lint
npm test
```

Do not claim a command passed unless it was actually run.

For visual or interaction changes, a successful build is not enough.

Also verify, when tooling permits:

- desktop layout
- laptop layout around 16-inch-class viewport sizes
- narrow mobile portrait
- mobile landscape when relevant
- touch or pointer interaction
- no horizontal overflow
- no second vertical scrollbar
- no scroll locking
- no broken image URLs
- no console errors
- no accidental copy changes

After editing, inspect:

```powershell
git diff --check
git diff --stat
git diff
```

Review the final diff for scope creep.

---

## 20. Known recurring issues

### OpenNext / Cloudflare Windows EPERM cleanup

When `.open-next` or `.next` cannot be removed because a Node process is holding files:

```powershell
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force
Remove-Item -LiteralPath ".open-next" -Recurse -Force
Remove-Item -LiteralPath ".next" -Recurse -Force
npm run build
npm run deploy
```

If removal still fails:

```powershell
attrib -R .open-next\* /S /D
Remove-Item -LiteralPath ".open-next" -Recurse -Force
```

Do not run these cleanup commands unnecessarily. They terminate Node processes.

### Double scrollbar or scroll lock

Investigate:

- `overflow-x-hidden` on page-level containers
- accidental `overflow-y-auto` or `overflow-y-scroll`
- measured accordion `max-height` animations
- nested fixed-height scroll areas
- sticky components inside new overflow containers

Prefer simple conditional accordion rendering over measured height animation when scrolling becomes unreliable.

### Browser timer type error

In client-side TypeScript, use a browser-safe timer type such as:

```ts
let timeout: number | undefined;
```

when using `window.setTimeout`.

### Union array rendering

When a value can be `string | string[]`, narrow before mapping:

```ts
const listValue = Array.isArray(value) ? value : null;
```

Do not call `.map()` on the unresolved union.

---

## 21. New laptop bootstrap procedure

Follow this order when moving to a new Windows laptop.

### 21.1 Install core tools

Install and verify:

- Git
- Node.js version compatible with the repository
- npm
- VS Code if still used alongside Codex
- ChatGPT desktop app / Codex

Do not choose a random Node version if the repo declares one in `.nvmrc`, `.node-version`, `package.json`, or project documentation.

Recommended verification commands:

```powershell
git --version
node --version
npm --version
```

### 21.2 Configure Git identity

```powershell
git config --global user.name "Tan Bui"
git config --global user.email "YOUR_GITHUB_EMAIL"
```

Confirm whether GitHub authentication will use:

- SSH
- GitHub CLI
- HTTPS credential manager

Do not copy private keys casually. Transfer them securely or create a new key for the new laptop.

### 21.3 Clone the repository

Use the official repository URL and a clean folder.

Example only:

```powershell
cd C:\Users\tbui
git clone REPOSITORY_URL tan-bui-designs
cd tan-bui-designs
```

Confirm the remote:

```powershell
git remote -v
git status
```

### 21.4 Restore environment configuration

- copy required `.env.local` values securely
- never paste secrets into `AGENTS.md`
- never commit `.env.local`
- confirm Cloudflare credentials and project bindings
- confirm any analytics or CMS credentials

Create or update `.env.example` with variable names only when useful and safe.

### 21.5 Install dependencies

When `package-lock.json` is committed:

```powershell
npm ci
```

Use `npm install` only when intentionally updating the lockfile or when the current repository setup requires it.

### 21.6 Verify local development

```powershell
npm run dev
```

Check the local site in a browser.

Then run:

```powershell
npm run build
```

Resolve environment-specific failures before making design changes.

### 21.7 Verify deployment access

Only after local build succeeds:

```powershell
npm run deploy
```

Confirm the deployment target before publishing.

Do not deploy from a new machine until:

- the correct repository is open
- the correct branch is checked out
- environment variables are present
- the local build passes
- the Cloudflare account/project is confirmed

### 21.8 Verify Codex instructions

Open the repository root in Codex and ask:

```text
Summarize the active repository instructions and list the files you loaded them from.
```

Confirm that this root `AGENTS.md` is active before delegating edits.

---

## 22. Preferred Codex working process

Use this sequence for most work:

### Stage 1: inspect

Ask Codex to:

- inspect the relevant page and shared components
- explain the current structure briefly
- identify risks
- avoid edits during inspection

### Stage 2: clarify

For subjective design work, answer questions section by section.

Use screenshots and viewport details when possible.

### Stage 3: plan

For a multi-file change, request a short plan containing:

- exact files to change
- exact behaviour to preserve
- exact checks to run

### Stage 4: implement

Make the smallest coherent change.

Do not mix redesign, dependency upgrades, data restructuring, and cleanup into one task.

### Stage 5: verify

Run build and relevant checks.

Inspect the browser when visual behaviour changed.

### Stage 6: review

Review the diff before accepting.

Ask Codex to check specifically for:

- regressions
- responsive problems
- accidental copy changes
- broken routes
- touch interaction changes
- overflow and scrollbar issues

### Stage 7: commit and deploy

Commit only after review.

Deploy only after explicit approval or a direct request to deploy.

---

## 23. Definition of done

A task is complete only when:

- the requested change is implemented
- unrelated content and behaviour are preserved
- TypeScript compiles
- the production build passes
- relevant lint or tests pass when available
- the diff contains no unintended files
- the page remains responsive
- touch and pointer behaviour remain correct
- there is no horizontal overflow or nested scrollbar regression
- images load correctly
- copy matches the approved wording
- accessibility basics are preserved
- the final report is honest about what was and was not verified

---

## 24. Hard do-not rules

Do not:

- rewrite approved copy without permission
- add decorative pills or labels without a clear purpose
- redesign an entire page when one section was requested
- stretch every section to the same large width
- make every section a two-column grid
- replace approved carousels or touch logic
- add infinite carousel clones
- add production dependencies without approval
- invent project metrics, client claims, awards, or testimonials
- publish sensitive client material
- use `overflow-x-hidden` as a default page-level fix
- create nested scroll containers without a strong reason
- force-push or run destructive Git commands
- deploy without confirming target and build status
- claim success without running the relevant checks

---

## 25. Questions that must be resolved during migration

Record confirmed answers in project documentation rather than leaving them only in chat history.

- What is the exact GitHub repository URL?
- What is the primary branch name?
- Which exact Node.js version currently builds and deploys successfully?
- Is there an `.nvmrc` or should one be added?
- Is npm definitively the package manager for the new workflow?
- What environment variables are required locally?
- How is Cloudflare authenticated on the current laptop?
- Which Cloudflare project/account is the production deployment target?
- Is there a separate staging deployment?
- Should Codex use PowerShell directly, Git Bash, or WSL on the new laptop?
- Where is the design handbook stored, and should it be committed into the repository?
- Are remote Unsplash-style placeholder images allowed in production, or must all final imagery be local?
- Should Codex be allowed to commit automatically, or should it stop after edits and review?
- Should Codex ever deploy automatically, or always wait for explicit approval?

Until these are answered, make conservative assumptions and ask before changing environment, authentication, deployment, package-manager, or Git workflow settings.
