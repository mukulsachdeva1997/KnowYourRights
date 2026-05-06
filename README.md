# KnowYourRights - Legal Rights for Students in Germany

A modern, mobile-first civic legal-tech web app that helps international students and immigrants in Germany understand everyday rights, prepare for common legal/admin situations, and find trusted next steps.

This project provides plain-language information, practical checklists, source-backed explainers, and privacy-first AI-assisted tools.

## Features

- Searchable FAQs with trusted source links
- Topic pages for Housing, Work, Police, Visa & Immigration, Health, Education, and Consumer Rights
- Step-by-step explainers with Legal and Practical Steps
- Rights Navigator for guided problem triage
- AI Document Helper with browser-based smart keyword analysis
- Optional local AI support through Ollama
- Debt Collection / Inkasso guide with Verbraucherzentrale sources
- Local resources and official directories
- Ask a Question email fallback
- Report Issue button with page URL context
- Save/bookmark pages for later
- Accessible, responsive UI using Tailwind and shadcn/ui
- Automated content audit workflow with source-backed suggestions
- GitHub Models workflow for AI-assisted content drafts

## AI Approach

KnowYourRights uses a privacy-first AI design.

Public site users can use the built-in Smart Analysis in the AI Document Helper. This runs in the browser and detects risky German legal/admin terms such as:

- Frist
- Widerspruch
- Bescheid
- Kuendigung / Kündigung
- Mahnung
- Inkasso
- Aufenthaltstitel
- Fiktionsbescheinigung

The app estimates topic, urgency, next steps, and relevant guides.

For fuller AI explanations, users can optionally run local AI with Ollama on their own computer. This keeps private documents local and avoids exposing paid API keys.

Example local setup:

```bash
ollama pull llama3.2:3b
```

Then open the app locally and use **Run local AI** in the AI Document Helper.

## Content Automation

This project includes a zero-cost content maintenance workflow.

Run locally:

```bash
npm run content:audit
```

The audit scans:

- `src/data/topics.ts`
- `src/data/faqs.json`
- `src/data/explainerSteps.ts`
- routes, navbar, and footer labels

It generates:

```text
docs/content-suggestions.md
```

The report includes:

- topic coverage
- FAQ coverage
- explainer gaps
- suggested new topics
- draft FAQ/explainer ideas
- real source links
- human-review checklist

A GitHub Actions workflow runs this audit weekly and opens a review PR.

There is also a manual GitHub Models workflow that can generate AI-assisted content suggestions from the audit report. All legal content remains human-reviewed before publishing.

## Tech Stack

| Layer | Tech |
|---|---|
| App | React + Vite + TypeScript |
| Routing | React Router |
| UI | Tailwind CSS + shadcn/ui |
| Icons | Lucide React |
| Data | TypeScript/JSON content files |
| AI | Browser rule analysis + optional local Ollama |
| Automation | GitHub Actions + GitHub Models prompt workflow |
| Deploy | GitHub Pages |

## Project Structure

```text
KnowYourRights/
├─ public/
├─ docs/
│  └─ content-suggestions.md
├─ scripts/
│  └─ content-audit.mjs
├─ src/
│  ├─ components/
│  ├─ components/ui/
│  ├─ data/
│  │  ├─ topics.ts
│  │  ├─ faqs.json
│  │  └─ explainerSteps.ts
│  ├─ lib/
│  ├─ pages/
│  │  ├─ Index.tsx
│  │  ├─ Topics.tsx
│  │  ├─ Navigator.tsx
│  │  ├─ DocumentHelper.tsx
│  │  ├─ Explainers.tsx
│  │  ├─ Resources.tsx
│  │  ├─ FAQ.tsx
│  │  └─ Saved.tsx
│  ├─ App.tsx
│  └─ main.tsx
├─ .github/
│  ├─ prompts/
│  │  └─ content-suggestions.prompt.yml
│  └─ workflows/
│     ├─ content-audit.yml
│     └─ ai-content-suggestions.yml
├─ package.json
└─ README.md
```

## Getting Started

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

Build:

```bash
npm run build
```

Run content audit:

```bash
npm run content:audit
```

Deploy to GitHub Pages:

```bash
npm run build
npm run deploy
```

## Live Demo

[https://mukulsachdeva1997.github.io/KnowYourRights/](https://mukulsachdeva1997.github.io/KnowYourRights/)

## Important Disclaimer

This project provides general legal information and practical preparation help. It does not provide legal advice. For a specific case, deadline, dispute, or official notice, users should consult a qualified professional or official advice service.

AI and keyword analysis can be wrong. The AI Document Helper is designed to help users understand and prepare, not to decide legal outcomes.

## Credits

- Icons: [Lucide](https://lucide.dev/)
- UI primitives: [shadcn/ui](https://ui.shadcn.com/)
- Source references include Gesetze im Internet, BAMF, Verbraucherzentrale, Mieterbund, and Studierendenwerke directories.
