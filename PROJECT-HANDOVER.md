# Tan Bui Designs Project Handover

This document is the source of truth for continuing the Tan Bui Designs portfolio project in a fresh ChatGPT conversation.

Use this handover before making any major code, design or content decisions.

---

# 1. Project Overview

Tan Bui Designs is a personal design portfolio, design consultancy website and living design system.

The site is not only a portfolio. It is also a demonstration of how Tan thinks as a designer.

The goal is to present Tan as a multidisciplinary design consultant with 15+ years of experience across:

* Branding
* Packaging
* Publication design
* Website design
* Digital design
* UX/UI
* Healthcare/pharma creative work
* 3D exhibition concepts
* Video and motion
* HTML email design/builds
* Campaign and creative systems

The website should feel premium, editorial, practical and confident. It should not feel like a generic agency template.

---

# 2. Project Stack

Current working stack:

* Next.js
* TypeScript
* Tailwind CSS
* App Router
* Reusable React components
* Git/GitHub
* Planned hosting direction: Cloudflare or another open/free-friendly platform where possible

Design system direction:

* TBDS = Tan Bui Design System
* The design system is documented through the `/design-handbook` route
* The Design Handbook should become both an internal reference and a public portfolio piece

---

# 3. Current Project Structure

Important folders and files:

```text
src
├── app
│   ├── about/page.tsx
│   ├── api/contact/route.ts
│   ├── contact/page.tsx
│   ├── design-handbook
│   │   ├── components
│   │   │   ├── buttons/page.tsx
│   │   │   ├── navbar/page.tsx
│   │   │   └── layout-primitives/page.tsx
│   │   └── page.tsx
│   ├── work
│   │   ├── [slug]/page.tsx
│   │   ├── islamiyah-series/page.tsx
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components
│   ├── case-study
│   ├── ui
│   │   ├── Button.tsx
│   │   ├── Container.tsx
│   │   ├── Section.tsx
│   │   └── GradientLine.tsx
│   ├── AboutPreviewSection.tsx
│   ├── AnimatedHeadline.tsx
│   ├── AnimatedLabel.tsx
│   ├── ContactCTASection.tsx
│   ├── ContactForm.tsx
│   ├── CredibilitySection.tsx
│   ├── FeaturedWorkSection.tsx
│   ├── Footer.tsx
│   ├── HeroSection.tsx
│   ├── LightboxGallery.tsx
│   ├── Navbar.tsx
│   ├── Reveal.tsx
│   ├── ScrollHighlightText.tsx
│   ├── ServiceGlyph.tsx
│   └── WhatIDoSection.tsx
├── data
│   ├── caseStudies/islamiyah.ts
│   └── projects.ts
└── styles
    ├── tokens.css
    ├── animations.css
    └── utilities.css
```

---

# 4. Design Philosophy

The design should follow these principles:

## Less is more

Avoid adding decoration just because a component feels empty. Whitespace, typography and alignment should do most of the work.

## Editorial, not template

The site should feel like a thoughtful design portfolio, not a SaaS landing page or generic agency website.

## Big typography matters

The homepage hero and key sections should keep the bold, editorial typography. Do not make everything small and boxed.

## Gradient is an accent, not a habit

The pastel gradient is part of the brand feel, but it should not be used everywhere.

Use gradient mainly for:

* Special CTA buttons
* Subtle navbar glass accent
* Intentional hover/focus moments
* System moments where it adds meaning

Avoid gradient underlines everywhere. Do not use the gradient just because it exists.

## Do not over-systemise everything

The system should make the site easier to maintain. It should not make the design feel mechanical.

A design system should support taste, not replace it.

---

# 5. Writing Style and Copy Rules

Preferred tone:

* Clear
* Practical
* Confident
* Human
* Not overly corporate
* Not generic marketing language

Avoid overusing:

* “Self-taught”
* Corporate buzzwords
* Long AI-sounding phrases
* Em dashes

Important wording rule:

Do not use the em dash character too much. It can look AI-generated. Prefer commas, full stops or simple sentence structure.

Example to avoid:

```text
A living design system behind this portfolio — built around layout rules...
```

Better:

```text
A living design system behind this portfolio, built around layout rules...
```

---

# 6. Responsive Experience System

The project uses responsive experience modes. These are more than breakpoints.

## Compact: 320px+

Small phones and narrow screens.

Rules:

* Single column
* No squeezed desktop nav
* No hover-only interactions
* Large tap targets
* Text must not crop
* Buttons can stack or become simpler
* Menus should be symbol-driven, not text-heavy

## Comfortable: 640px+

Large phones and small tablets.

Rules:

* Still touch-first
* Better breathing room
* Some two-column layouts can appear if they genuinely improve balance
* Keep layouts readable

## Expanded: 1024px+

Tablets, small laptops and standard desktop.

Rules:

* Horizontal nav can appear
* Grids can expand
* Hover interactions are useful
* Page structure can become more editorial

## Immersive: 1440px+

Large desktop and wide screens.

Rules:

* More whitespace
* Controlled max widths
* Do not stretch text too far
* Some layouts can stack again if that feels more editorial
* Do not assume bigger screen means more columns

Important test sizes:

```text
320px
375px
390px
430px
768px
1024px
1170px
1440px
1536px
1900px
```

---

# 7. Global CSS System

The original global CSS was split into:

```text
src/styles/tokens.css
src/styles/animations.css
src/styles/utilities.css
src/app/globals.css
```

## globals.css

The current structure is:

```css
@import "tailwindcss";

@import "../styles/tokens.css";
@import "../styles/animations.css";
@import "../styles/utilities.css";

/* =======================================
   TAILWIND THEME BRIDGE
======================================= */

:root {
  --background: var(--tbds-color-background);
  --foreground: var(--tbds-color-foreground);
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

/* =======================================
   GLOBALS
======================================= */

html {
  scroll-behavior: smooth;
}

body {
  background: var(--tbds-color-background);
  color: var(--tbds-color-foreground);
  font-family: Arial, Helvetica, sans-serif;
}
```

## tokens.css

Contains:

* Core colours
* Accent gradient
* Motion timings
* Responsive experience mode values
* Container widths
* Section rhythm
* Border colours

Important token:

```css
--tbds-accent-gradient: linear-gradient(
  90deg,
  var(--tbds-accent-indigo),
  var(--tbds-accent-rose),
  var(--tbds-accent-yellow)
);
```

## animations.css

Preserves important existing animation classes:

* `.hero-line`
* `.hero-space`
* `.hero-brand`
* `.hero-letter`
* `.scroll-highlight`

Do not delete these without checking the components that depend on them.

## utilities.css

Contains useful TBDS utilities:

* `.tbds-gradient-line`
* `.tbds-gradient-line-vertical`
* `.tbds-focus-ring`
* `.tbds-container`

---

# 8. Core UI Primitives

Created in:

```text
src/components/ui
```

## Container

Used to control max width and page padding.

Important:

* Uses TBDS page padding tokens
* Supports sizes: `sm`, `md`, `lg`, `xl`, `full`

## Section

Used for consistent vertical rhythm.

Supports spacing:

* `none`
* `compact`
* `standard`
* `editorial`
* `hero`

Also supports `borderTop`.

## GradientLine

Use sparingly.

Gradient lines should not be added everywhere. Only use where the accent has a clear purpose.

## Button

Button has become an important TBDS component.

Current expected props include:

* `href`
* `variant`
* `size`
* `fullWidth`
* `disabled`
* `expandOnHover`
* `showArrow`

Variants:

* `primary`
* `secondary`
* `ghost`
* `accent`

Important button behaviour:

* `variant="accent"` gives the special gradient button feel
* `expandOnHover` makes the button expand outward on hover
* `showArrow` adds the arrow and animates it
* If `showArrow` is used, do not manually type `→` inside the button text

Example:

```tsx
<Button
  href="/contact"
  variant="accent"
  size="lg"
  expandOnHover
  showArrow
>
  Start a Conversation
</Button>
```

---

# 9. Homepage Sections

Current homepage structure:

```tsx
import HeroSection from "@/components/HeroSection";
import CredibilitySection from "@/components/CredibilitySection";
import WhatIDoSection from "@/components/WhatIDoSection";
import FeaturedWorkSection from "@/components/FeaturedWorkSection";
import AboutPreviewSection from "@/components/AboutPreviewSection";
import ContactCTASection from "@/components/ContactCTASection";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black">
      <HeroSection />
      <CredibilitySection />
      <WhatIDoSection />
      <FeaturedWorkSection />
      <AboutPreviewSection />
      <ContactCTASection />
    </main>
  );
}
```

All homepage sections have been migrated to TBDS primitives.

---

# 10. Hero Section Important Notes

The Hero section was originally good. Do not redesign it too much.

Important correction from previous work:

The hero should preserve the original feel:

```text
TAN BUI DESIGNS
Design that
solves problems
not just fills space.
```

Do not add:

* CTA buttons
* Proof cards
* Extra panels
* Overexplained copy
* Generic landing-page content

The only major responsive fix was preventing “solves problems” from cropping on small mobile.

Important current direction:

* Keep big typography
* Keep original visual rhythm
* Use Section and Container only as structural migration
* Keep `AnimatedLabel`
* Keep `ScrollHighlightText`
* Keep the hero-line animation

---

# 11. About Preview Section

Important decisions:

The section headline is:

```text
From print shop floor to digital design systems.
```

Current copy direction:

* Do not overuse “self-taught” here
* Do not include the extra cards like “Print taught me precision”
* Keep it cleaner, more mature and editorial

The button should use the TBDS accent button with hover expansion:

```tsx
<Button
  href="/about"
  variant="accent"
  size="lg"
  expandOnHover
  showArrow
>
  Read My Story
</Button>
```

Do not write:

```text
Read My Story →
```

because the Button component handles the arrow.

---

# 12. Contact CTA Section

The Contact CTA section keeps the black block.

Important behaviour:

The original CTA button had a nice movement:

* Button expands outward on hover
* Arrow moves right

The TBDS Button component was updated to preserve that style.

Contact CTA should use:

```tsx
<Button
  href="/contact"
  variant="accent"
  size="lg"
  expandOnHover
  showArrow
>
  Start a Conversation
</Button>
```

---

# 13. Navbar Current Direction

The navbar has now been migrated to the TBDS responsive system.

Important decisions:

## Compact and Comfortable

* Do not show squeezed nav links
* Show logo on the left
* Show a circular menu icon with 3 lines on the right
* The menu icon turns into an X when open
* Mobile menu opens cleanly
* Menu should not close immediately because of scroll-hide logic
* Arrows in the mobile menu should sit next to the link text, not on the far right
* On hover, the arrow moves right

## Expanded and Immersive

* Horizontal nav appears from `lg`
* Keep glass navbar feel
* Keep subtle pastel accent glow
* Keep gradient underline on desktop nav hover
* Keep scroll-hide behaviour, but do not hide the nav while mobile menu is open

Important fix already made:

The scroll listener uses a `menuOpenRef` so the mobile menu does not instantly close or hide.

Do not replace the navbar with a text “Menu” button. The user prefers the circular symbol icon.

---

# 14. Footer Current Direction

The footer has been simplified after several over-designed attempts.

Important final direction:

## Left side

* `TAN BUI DESIGN SYSTEM` using `AnimatedLabel`
* Short design system context
* Accent button below the text

Design system copy:

```text
A living design system behind this portfolio, built around layout rules, motion principles, reusable components and responsive experience modes.
```

Button:

```tsx
<Button
  href="/design-handbook"
  variant="accent"
  size="md"
  expandOnHover
  showArrow
>
  View Design Handbook
</Button>
```

## Right side

Plain text links only:

* Home
* Work
* About
* Contact

Rules:

* Do not make these boxed buttons
* Do not use arrows
* Use gradient underline on hover
* Right align at comfortable/desktop sizes where appropriate

## Bottom row

Use one clean line:

```text
© 2026 Tan Bui Designs - Turning complex ideas into clear visual experiences.
```

In code this can stay dynamic:

```tsx
© {new Date().getFullYear()} Tan Bui Designs - Turning complex ideas into clear visual experiences.
```

The footer should be compact in height. Do not make it too tall.

Avoid adding repeated labels like:

* TAN BUI DESIGNS
* TAN BUI DESIGN SYSTEM
* 2026 Tan Bui Designs

all stacked close together. That became noisy.

---

# 15. Design Handbook

The Design Handbook lives at:

```text
/design-handbook
```

Current purpose:

* Public proof of design thinking
* Internal design system documentation
* Recruiter-facing portfolio piece
* Source of truth for design rules and components

Current sections include:

* Introduction
* Philosophy
* Visual Language
* Design Tokens
* Responsive System
* Motion System
* Component Playground
* Product Roadmap
* Accessibility
* Changelog

Component docs include:

* Buttons
* Navbar
* Layout primitives

The Design Handbook should be updated later to include the newer Button props:

* `expandOnHover`
* `showArrow`

---

# 16. Pages Already Migrated

These have been migrated to TBDS primitives or improved:

* Homepage sections
* About page
* Contact page
* Navbar
* Footer
* Design Handbook component docs
* Layout primitives page

Important contact page responsive behaviour:

The contact page uses custom breakpoints around `min-[1120px]` and `2xl` because the sidebar needed to split at one width and stack again at immersive size.

This is a good example of the responsive experience philosophy.

---

# 17. Portfolio Case Studies

Known case studies / work items:

## Healthy Muslim Marriage Handbook

* Publication design and branding
* White Thread Press
* Strong result: 80,000 copies sold
* Best-known Islamic book project
* Strong portfolio project

## Colonis Exhibition

* Healthcare/pharma exhibition project
* Concept created quickly
* First concept approved
* Strong proof of fast commercial delivery

## Menarini Healthcare Exhibition

* Pitch concept
* 2D and 3D visualisation
* Strategic creative presentation

## Urban Eat Packaging

* Packaging design and artwork production

## Islamiya Series Books

* Madressa Islamiya
* Branding, illustration, layout, educational content
* Book, web app and mobile app direction

## Al-Furqaan School

* Brand identity
* Website design
* WordPress
* SEO
* Creative direction

Sensitive note:

Healthcare/pharma client names can be used in private CV/application contexts, but avoid making sensitive internal client details public unless the user clearly intends them for the portfolio.

---

# 18. Important User Preferences

The user prefers:

* Full file replacement code
* Clear file paths
* Practical explanation
* No overcomplicated architecture
* No generic corporate tone
* Strong design judgement
* Preserving existing design philosophy
* Testing before committing
* Commits after meaningful milestones

The user dislikes:

* Overuse of gradients
* Too many decorative elements
* Too many boxed buttons
* Generic CTA-heavy landing-page design
* Losing original design intent
* AI-sounding copy
* Em dashes
* Long messy threads causing browser slowdown

---

# 19. Mistakes to Avoid

Do not:

* Turn every link into a button
* Add arrows everywhere
* Add gradient underlines everywhere
* Use “self-taught” too often
* Rewrite strong original design for no reason
* Add cards just to fill space
* Make the footer too tall
* Make nav links squeeze on mobile
* Add CTA buttons into the hero
* Use the em dash character repeatedly
* Suggest huge architecture changes before checking current code
* Guess file contents without seeing them

---

# 20. Current Git Milestones

Recent commits include work around:

* TBDS design handbook foundation
* Global style split into tokens, animations and utilities
* Layout primitives
* Homepage section migration
* Navbar and footer responsive system

User recently committed the navbar/footer work.

If continuing in a new chat, first ask the user to run:

```powershell
git status
```

Then continue from the clean working tree.

---

# 21. How to Continue in a Fresh Chat

Start the fresh chat with:

```text
I am continuing the Tan Bui Designs portfolio project. Use this PROJECT-HANDOVER.md as the source of truth before giving design or code advice.
```

Then paste this file or upload it.

Before replacing code, ask for the current file if there is any uncertainty.

Continue with one section or file at a time.

---

# 22. Suggested Next Steps

Good next steps after this handover:

1. Run a full responsive QA pass on the homepage.
2. Update the Button System handbook page to include:

   * `expandOnHover`
   * `showArrow`
   * Accent button usage rules
3. Update Navbar handbook documentation based on the final responsive navbar.
4. Update Footer documentation or add it as a handbook component.
5. Move on to Work page migration.
6. Move on to case study page polish.
7. Add a `docs` folder for project notes if needed.

Suggested command after creating this file:

```powershell
git add PROJECT-HANDOVER.md
git commit -m "Add project handover for Tan Bui Designs"
git push origin master
```
