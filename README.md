# CostWise Marketing & Documentation Platform

This repository houses the source code for the official marketing, benchmarking, and documentation platform of **CostWise-MCP**—a high-performance Model Context Protocol (MCP) server designed for semantic code intelligence, codebase retrieval, and token compression.

* **Production URL / Source Repository Pointer:** `https://github.com/okyashgajjar/costwise-mcp`
* **Designed & Maintained by:** [Yash Gajjar](https://in.linkedin.com/in/okyashgajjar)

---

## 🌟 Rationale & Performance Metrics

Modern LLM agents suffer from the token explosion problem during large codebase exploration. CostWise-MCP solves this by performing AST symbol mapping and call-graph retrieval locally, resulting in:
* **45.9% fewer tokens** in context windows
* **54.3% fewer exploration loops** during code navigation
* **42.1% fewer tool calls** compared to legacy solutions (such as CodeGraph)
* **100% local-first and secure** (runs entirely in SQLite via stdio)

---

## 🚀 Repository References & Quick Links

All core server implementation logic, script installers, and diagnostic engines are hosted in the primary Go codebase:
* **Core Go MCP Server Codebase:** [okyashgajjar/costwise-mcp](https://github.com/okyashgajjar/costwise-mcp)
* **Automated Shell Installer Script:** [install.sh](https://raw.githubusercontent.com/okyashgajjar/costwise-mcp/main/install.sh)
* **CLI Diagnostics Engine:** `costwise doctor` (included in binary releases)
* **Creator Profile Badge:** [Yash Gajjar on LinkedIn](https://in.linkedin.com/in/okyashgajjar)

---

## 🛠️ Web App Technology Stack

This documentation and marketing site is built with production-grade web technologies:
* **Core Framework:** Next.js 15 (App Router)
* **Styling:** Tailwind CSS & Custom CSS variables
* **Icons:** Lucide React
* **Hosting Adaptability:** Fully static-ready (`next export` / SSG compatible)
* **SEO & GEO Hardened:** Native JSON-LD structured schemas (`TechArticle`, `Product`), semantic heading layouts, and performance-optimized asset streaming.

---

## 💻 Running the Web Platform Locally

### 1. Prerequisites
Ensure you have **Node.js v18.0.0+** and `npm` installed.

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
Start the Next.js development server dynamically on the default port:
```bash
npm run dev
```
To boot on a specific custom port (e.g. `8020`):
```bash
npm run dev -- -p 8020
```

### 4. Production Build & Export Validation
Validate static page compilation and optimize the assets:
```bash
npm run build
```
This compiles exactly 30 production routes, including static documentation variants for:
* `/docs/install` (Linux, macOS, and Windows variant installations)
* `/docs/cursor` (Cursor IDE integration)
* `/docs/claude-code` (Claude Code CLI setup)
* `/docs/opencode` (OpenCode integration)
* `/docs/codex` (Codex CLI configuration)
* `/docs/antigravity` (Antigravity & Gemini configuration)
* `/docs/troubleshooting` (Remediation failure matrices)

---

## 📂 Project Directory Structure

```text
├── app/                  # Next.js 15 App Router pages & routes
│   ├── layout.tsx        # Global page layouts & SEO headers
│   ├── page.tsx          # Landing page & primary benchmark cards
│   ├── architecture/     # Internal schema visualizations
│   ├── benchmarks/       # Case study tables (Continue OSS metrics)
│   ├── blog/             # Technical deep dives (3 articles)
│   ├── docs/             # Integration walkthroughs
│   └── tools/            # CLI utilities and command specifications
├── components/           # Reusable UI elements (Footer, Header, Terminal)
├── styles.css            # Vanilla styling and token theme sets
├── tailwind.config.js    # Styling framework variables
└── package.json          # Dependency mappings & script runners
```
