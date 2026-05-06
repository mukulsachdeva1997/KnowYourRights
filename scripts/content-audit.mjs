import fs from "node:fs/promises";
import path from "node:path";

const rootDir = process.cwd();

const categories = [
  {
    id: "housing",
    label: "Housing",
    route: "/topics?category=housing",
    keywords: ["housing", "rental", "tenant", "deposit", "mold", "heating", "eviction"],
    targetFaqs: 4,
    desiredExplainables: [
      "Deposit return after move-out",
      "Mold, heating, and urgent repairs",
      "Illegal sublets and cash-only rent",
    ],
    sources: [
      {
        label: "BGB § 551 - rental deposit rules",
        url: "https://www.gesetze-im-internet.de/bgb/__551.html",
      },
      {
        label: "BGB § 573c - housing notice periods",
        url: "https://www.gesetze-im-internet.de/bgb/__573c.html",
      },
      {
        label: "Mieterbund local tenant associations",
        url: "https://mieterbund.de/mieterverein-vor-ort/",
      },
    ],
  },
  {
    id: "work",
    label: "Work",
    route: "/topics?category=work",
    keywords: ["work", "employment", "wage", "contract", "termination", "trial", "internship"],
    targetFaqs: 4,
    desiredExplainables: [
      "Unpaid wages and trial work",
      "Mini-job vs student job basics",
      "Termination notice and payslips",
    ],
    sources: [
      {
        label: "BGB § 622 - employment notice periods",
        url: "https://www.gesetze-im-internet.de/bgb/__622.html",
      },
      {
        label: "BGB § 623 - written form for termination",
        url: "https://www.gesetze-im-internet.de/bgb/__623.html",
      },
      {
        label: "Make it in Germany - working while studying",
        url: "https://www.make-it-in-germany.com/en/study-vocational-training/studies-in-germany/work",
      },
    ],
  },
  {
    id: "police",
    label: "Police",
    route: "/topics?category=police",
    keywords: ["police", "id", "search", "fine", "summons", "statement"],
    targetFaqs: 4,
    desiredExplainables: [
      "Received a police summons",
      "Got a fine or penalty notice",
      "Phone search and privacy basics",
    ],
    sources: [
      {
        label: "AufenthG § 48 - ID and document duties for foreigners",
        url: "https://www.gesetze-im-internet.de/aufenthg_2004/__48.html",
      },
      {
        label: "StPO § 136 - accused person rights before questioning",
        url: "https://www.gesetze-im-internet.de/stpo/__136.html",
      },
      {
        label: "StPO § 102 - search of suspected persons",
        url: "https://www.gesetze-im-internet.de/stpo/__102.html",
      },
    ],
  },
  {
    id: "visa",
    label: "Visa & Immigration",
    route: "/topics?category=visa&immigration",
    keywords: ["visa", "immigration", "residence", "permit", "ausländerbehörde", "anmeldung"],
    targetFaqs: 5,
    desiredExplainables: [
      "Fiktionsbescheinigung when appointment is delayed",
      "Missing documents for residence permit extension",
      "Changing address while visa is pending",
    ],
    sources: [
      {
        label: "AufenthG § 81 - residence permit application and Fiktionsbescheinigung",
        url: "https://www.gesetze-im-internet.de/aufenthg_2004/__81.html",
      },
      {
        label: "AufenthG § 16b - study residence permit",
        url: "https://www.gesetze-im-internet.de/aufenthg_2004/__16b.html",
      },
      {
        label: "BAMF authority finder",
        url: "https://bamf-navi.bamf.de/en/Themen/Behoerden/",
      },
      {
        label: "BMG § 17 - address registration duty",
        url: "https://www.gesetze-im-internet.de/bmg/__17.html",
      },
    ],
  },
  {
    id: "health",
    label: "Health",
    route: "/topics?category=health",
    keywords: ["health", "insurance", "doctor", "krankenkasse", "medical"],
    targetFaqs: 4,
    desiredExplainables: [
      "Health insurance payment warning",
      "Switching public/private insurance",
      "Doctor bills and reimbursement",
    ],
    sources: [
      {
        label: "Studierendenwerke A-Z student support directory",
        url: "https://www.studierendenwerke.de/en/deutsches-studentenwerk/studentenwerke/studierendenwerke-a-z",
      },
      {
        label: "Consumer advice centres",
        url: "https://www.verbraucherzentrale.de/beratung",
      },
      {
        label: "Health insurance for international students",
        url: "https://www.studying-in-germany.org/insurances-germany/health-insurance/international-students/",
      },
    ],
  },
  {
    id: "education",
    label: "Education",
    route: "/topics?category=education",
    keywords: ["education", "university", "student", "exam", "enrollment", "exmatriculation"],
    targetFaqs: 4,
    desiredExplainables: [
      "Exmatriculation warning",
      "Exam appeal or missed deadline",
      "Blocked enrollment because documents are missing",
    ],
    sources: [
      {
        label: "Studierendenwerke A-Z student support directory",
        url: "https://www.studierendenwerke.de/en/deutsches-studentenwerk/studentenwerke/studierendenwerke-a-z",
      },
      {
        label: "AufenthG § 16b - study residence permit",
        url: "https://www.gesetze-im-internet.de/aufenthg_2004/__16b.html",
      },
      {
        label: "BAMF authority finder",
        url: "https://bamf-navi.bamf.de/en/Themen/Behoerden/",
      },
    ],
  },
  {
    id: "consumer",
    label: "Consumer Rights",
    route: "/topics?category=consumer-rights",
    keywords: ["consumer", "scam", "contract", "subscription", "inkasso", "mahnung"],
    targetFaqs: 3,
    desiredExplainables: [
      "Debt collection letter",
      "Subscription trap or cancellation",
      "Fake apartment or job scam",
    ],
    sources: [
      {
        label: "Verbraucherzentrale - debt collection information",
        url: "https://www.verbraucherzentrale.de/inkasso",
      },
      {
        label: "Verbraucherzentrale Inkasso-Check",
        url: "https://www.verbraucherzentrale.de/inkasso-check",
      },
      {
        label: "Verbraucherzentrale - suspicious debt collection letters",
        url: "https://www.verbraucherzentrale.de/schwarzliste-inkasso",
      },
    ],
  },
];

const navLabels = [
  { label: "Home", route: "/", footerOptional: true },
  { label: "Topics", route: "/topics" },
  { label: "Navigator", route: "/navigator" },
  { label: "AI Helper", route: "/document-helper" },
  { label: "FAQ", route: "/faq" },
  { label: "Explainers", route: "/explainers" },
  { label: "Resources", route: "/resources" },
  { label: "Bookmarks", route: "/saved" },
];

function slugify(input) {
  return input
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function includesAny(text, keywords) {
  const lower = text.toLowerCase();
  return keywords.some((keyword) => lower.includes(keyword.toLowerCase()));
}

async function readText(relativePath) {
  return fs.readFile(path.join(rootDir, relativePath), "utf8");
}

async function readJson(relativePath) {
  return JSON.parse(await readText(relativePath));
}

async function pathExists(relativePath) {
  try {
    await fs.access(path.join(rootDir, relativePath));
    return true;
  } catch {
    return false;
  }
}

function extractExplainerTitles(source) {
  const matches = [...source.matchAll(/^\s*"([^"]+)":\s*\{/gm)];
  return matches.map((match) => match[1]);
}

function extractTopics(source) {
  const matches = [...source.matchAll(/title:\s*"([^"]+)"[\s\S]*?category:\s*"([^"]+)"[\s\S]*?explainerTag:\s*"([^"]+)"/g)];
  return matches.map((match) => ({
    title: match[1],
    category: match[2],
    explainerTag: match[3],
  }));
}

function countByCategory(faqs, category) {
  return faqs.filter((faq) => {
    const haystack = `${faq.category || ""} ${faq.question || ""} ${faq.answer || ""} ${(faq.keywords || []).join(" ")}`;
    return includesAny(haystack, category.keywords);
  });
}

function buildDraftFaq(category, topic) {
  return {
    category: category.label,
    question: `What should I do if I have a ${topic.toLowerCase()} problem?`,
    answer:
      "Draft for human review: collect documents, check deadlines, keep communication in writing, and use the matching KnowYourRights guide before contacting a qualified advisor.",
    keywords: [category.label, ...topic.toLowerCase().split(/\s+/).filter(Boolean)].slice(0, 8),
    sources: category.sources,
  };
}

function buildDraftExplainer(category, topic) {
  return {
    title: topic,
    slug: slugify(topic),
    category: category.label,
    steps: [
      "Identify the document, deadline, or person asking for action.",
      "Collect proof, messages, contracts, IDs, and payment records.",
      "Write a short response in German and ask for confirmation in writing.",
      "Contact the matching official resource or qualified advisor if risk is high.",
    ],
    reviewNotes: [
      "Add official source links before publishing.",
      "Check whether rules differ by state, city, university, insurer, or visa type.",
      "Keep the wording informational and avoid promising outcomes.",
    ],
    sources: category.sources,
  };
}

async function main() {
  const faqs = await readJson("src/data/faqs.json");
  const topicsSource = await readText("src/data/topics.ts");
  const explainerSource = await readText("src/data/explainerSteps.ts");
  const appSource = await readText("src/App.tsx");
  const navbarSource = await readText("src/components/Navbar.tsx");
  const footerSource = await readText("src/components/Footer.tsx");
  const liveTopics = extractTopics(topicsSource);
  const explainerTitles = extractExplainerTitles(explainerSource);

  const categoryReports = categories.map((category) => {
    const matchingFaqs = countByCategory(faqs, category);
    const matchingExplainers = explainerTitles.filter((title) => includesAny(title, category.keywords));
    const matchingTopics = liveTopics.filter((topic) => includesAny(`${topic.category} ${topic.title} ${topic.explainerTag}`, category.keywords));
    const existingExplainerText = matchingExplainers.join(" ").toLowerCase();
    const missingExplainables = category.desiredExplainables.filter(
      (topic) => !includesAny(existingExplainerText, topic.toLowerCase().split(/\s+/).filter((word) => word.length > 3))
    );

    return {
      category,
      faqCount: matchingFaqs.length,
      explainerCount: matchingExplainers.length,
      topicCount: matchingTopics.length,
      missingFaqs: Math.max(category.targetFaqs - matchingFaqs.length, 0),
      missingExplainables,
      draftFaqs: missingExplainables.slice(0, 2).map((topic) => buildDraftFaq(category, topic)),
      draftExplainer: missingExplainables[0] ? buildDraftExplainer(category, missingExplainables[0]) : null,
    };
  });

  const routeChecks = navLabels.map((item) => ({
    ...item,
    inAppRoutes: item.route === "/" || appSource.includes(`path="${item.route.replace("/", "")}"`) || appSource.includes(`path="${item.route}"`),
    inNavbar: navbarSource.includes(item.label),
    inFooter: item.footerOptional || footerSource.includes(item.label) || item.label === "Bookmarks",
  }));

  const generatedAt = new Date().toISOString();
  const lines = [
    "# KnowYourRights Content Suggestions",
    "",
    `Generated: ${generatedAt}`,
    "",
    "This report is generated automatically by `npm run content:audit`. It suggests coverage improvements only. Legal content must be human-reviewed before publishing.",
    "",
    "## Route And Label Checks",
    "",
    "| Label | Route | App route | Navbar | Footer |",
    "| --- | --- | --- | --- | --- |",
    ...routeChecks.map(
      (item) =>
        `| ${item.label} | \`${item.route}\` | ${item.inAppRoutes ? "yes" : "check"} | ${item.inNavbar ? "yes" : "check"} | ${item.inFooter ? "yes" : "check"} |`
    ),
    "",
    "## Coverage Dashboard",
    "",
    "| Category | Topics | FAQs | Explainers | Suggested new explainers |",
    "| --- | ---: | ---: | ---: | --- |",
    ...categoryReports.map(
      (report) =>
        `| ${report.category.label} | ${report.topicCount} | ${report.faqCount}/${report.category.targetFaqs} | ${report.explainerCount} | ${report.missingExplainables.slice(0, 3).join("; ") || "Coverage looks healthy"} |`
    ),
    "",
    "## Draft Suggestions For Human Review",
    "",
  ];

  for (const report of categoryReports) {
    if (!report.missingFaqs && !report.missingExplainables.length) continue;

    lines.push(`### ${report.category.label}`, "");
    lines.push(`Route: \`${report.category.route}\``);
    lines.push(`Current topic cards: ${report.topicCount}`);
    lines.push(`Current FAQ coverage: ${report.faqCount}/${report.category.targetFaqs}`);
    lines.push(`Current explainer count: ${report.explainerCount}`, "");

    if (report.draftExplainer) {
      lines.push("Suggested explainer draft:", "");
      lines.push(`- Title: ${report.draftExplainer.title}`);
      lines.push(`- Slug: \`${report.draftExplainer.slug}\``);
      lines.push("- Steps:");
      report.draftExplainer.steps.forEach((step) => lines.push(`  - ${step}`));
      lines.push("- Review notes:");
      report.draftExplainer.reviewNotes.forEach((note) => lines.push(`  - ${note}`));
      lines.push("- Suggested sources:");
      report.draftExplainer.sources.forEach((source) => lines.push(`  - [${source.label}](${source.url})`));
      lines.push("");
    }

    if (report.draftFaqs.length) {
      lines.push("Suggested FAQ drafts:", "");
      report.draftFaqs.forEach((faq) => {
        lines.push(`- **${faq.question}**`);
        lines.push(`  - Category: ${faq.category}`);
        lines.push(`  - Answer: ${faq.answer}`);
        lines.push("  - Suggested sources:");
        faq.sources.forEach((source) => lines.push(`    - [${source.label}](${source.url})`));
      });
      lines.push("");
    }
  }

  lines.push("## Next Manual Review Checklist", "");
  lines.push("- Verify each suggested topic against official or trusted sources.");
  lines.push("- Add source URLs before moving drafts into `src/data/faqs.json` or `src/data/explainerSteps.ts`.");
  lines.push("- Keep user-facing labels aligned in Navbar, Footer, homepage quick access, and routes.");
  lines.push("- Re-run `npm run content:audit` after adding content.");
  lines.push("");

  await fs.mkdir(path.join(rootDir, "docs"), { recursive: true });
  await fs.writeFile(path.join(rootDir, "docs/content-suggestions.md"), `${lines.join("\n")}\n`);

  if (!(await pathExists(".github/workflows/content-audit.yml"))) {
    await fs.mkdir(path.join(rootDir, ".github/workflows"), { recursive: true });
  }

  console.log(`Content audit complete: ${path.join(rootDir, "docs/content-suggestions.md")}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
