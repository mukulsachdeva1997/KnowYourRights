# 🧑‍⚖️ Civic Guidebook – Legal Rights for Students in Germany

A modern, mobile-first web app that explains everyday legal rights in Germany for international students and immigrants. Plain language, practical steps, and trusted links.

---

## ✨ Features

- ✅ **Searchable FAQs** – quick answers with sources (law links where available)
- 📚 **Topics** – curated entry points (Housing, Work, Police, Visas, Health, Education)
- 🧾 **Visual Explainers** – step-by-step guides with **Legal** and **Practical Steps** tabs
- 🧭 **Local Resources** – emergency banner (110 / 112) + official directories (Mieterbund, BRAV lawyer register, Studierendenwerk, BAMF)
- 💬 **Ask a Question** – lightweight form that opens your email client (no backend)
- 📨 **Suggest a Topic / Contact** – prefilled mailto helpers for quick feedback
- 🪪 **Report Issue** – one-click button emails the current page URL (+ selected text)
- 🧩 **Icon system** – Lucide + a small `<Icon />` wrapper with a safe fallback
- ♿ **Accessible by default** – focus states, semantic markup, labeled icons
- 📱 **Responsive UI** – built with Tailwind + shadcn/ui components



---

## 🛠 Tech Stack

| Layer         | Tech                                                                 |
|--------------|----------------------------------------------------------------------|
| App          | React + Vite + TypeScript + React Router                             |
| UI           | Tailwind CSS + shadcn/ui + Lucide Icons                               |
| State/Utils  | Small utilities (`src/lib/mailto.ts`, `src/lib/iconMap.tsx`)         |
| Deploy       | Vercel / Netlify / GitHub Pages (static SPA)                          |

---

## 📂 Folder Structure
civic-guidebook/
├─ public/
│  ├─ favicon.svg
│  ├─ og-image.png
│  └─ (optional) apple-touch-icon.png, safari-pinned-tab.svg
├─ src/
│  ├─ components/
│  │  ├─ Footer.tsx
│  │  ├─ Navbar.tsx
│  │  ├─ CategoryCard.tsx
│  │  ├─ FAQCard.tsx
│  │  ├─ ExplainerSlidePanel.tsx
│  │  ├─ AskQuestionForm.tsx
│  │  └─ ReportIssueButton.tsx
│  ├─ components/ui/ (shadcn/ui primitives)
│  ├─ data/
│  │  ├─ explainerSteps.ts
│  │  └─ faqs.json
│  ├─ lib/
│  │  ├─ iconMap.tsx
│  │  └─ mailto.ts
│  ├─ pages/
│  │  ├─ Index.tsx
│  │  ├─ Topics.tsx
│  │  ├─ Explainers.tsx
│  │  ├─ Resources.tsx
│  │  └─ FAQ.tsx
│  ├─ App.tsx
│  └─ main.tsx
├─ index.html
├─ tailwind.config.ts
├─ eslint.config.js
├─ package.json / bun.lockb
└─ README.md

---

## 🚀 Getting Started

### 📦 Install dependencies

bash
bun install
# or
npm install


🧪 Run the development server
bun run dev
# or
npm run dev

🌐 Live Demo

🔗 (https://mukulsachdeva1997.github.io/KnowYourRights/)

📜 Legal Disclaimer

This project provides general information and does not constitute legal advice. For your specific situation, consult a qualified professional.

🙌 Credits
	•	Icons: lucide.dev
	•	UI primitives: shadcn/ui
	•	Built with ❤️ using React, Vite, and Tailwind
