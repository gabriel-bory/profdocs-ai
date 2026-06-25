import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

const isGitHubPages = process.env.GITHUB_PAGES === "true";
const githubPagesSite = "https://gabriel-bory.github.io";
const githubPagesBase = "/profdocs-ai/docs";

export default defineConfig({
  site: isGitHubPages ? githubPagesSite : "http://localhost:4321",
  base: isGitHubPages ? githubPagesBase : "/",
  integrations: [
    starlight({
      title: "ProfDocs AI Docs",
      description: "Documentation as code for ProfDocs AI.",
      customCss: ["./src/styles/profdocs-starlight.css"],
      components: {
        Head: "./src/components/starlight/Head.astro",
      },
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/gabriel-bory/profdocs-ai",
        },
      ],
      sidebar: [
        {
          label: "Start Here",
          items: [
            { label: "Introduction", link: "/" },
            {
              label: "Full-Stack Foundation",
              slug: "foundation/fullstack-foundation",
            },
          ],
        },
        {
          label: "Product",
          items: [
            { label: "Product Vision", slug: "product/product-vision" },
            { label: "Roadmap", slug: "product/roadmap" },
            {
              label: "UI Design Guidelines",
              slug: "product/ui-design-guidelines",
            },
            {
              label: "Stitch Design Review v1",
              slug: "product/stitch-design-review-v1",
            },
            {
              label: "Context Engine UI Study",
              slug: "product/context-engine-ui-study-v1",
            },
            {
              label: "Web Context Engine Preview",
              slug: "product/web-context-engine-preview",
            },

            {
              label: "Assistant Evolution Roadmap",
              slug: "product/assistant-evolution-roadmap",
            },
          ],
        },        {
          label: "User Manual",
          items: [
            {
              label: "Overview",
              slug: "user-manual/web-application",
            },
            {
              label: "Dashboard",
              slug: "user-manual/dashboard",
            },
            {
              label: "Documents",
              slug: "user-manual/documents",
            },
            {
              label: "Upload",
              slug: "user-manual/upload",
            },
            {
              label: "AI Preview",
              slug: "user-manual/ai-preview",
            },
            {
              label: "Export guide",
              slug: "user-manual/export-guide",
            },

          ],
        },

        {
          label: "Architecture",
          items: [
            { label: "Architecture Overview", slug: "architecture/overview" },
            { label: "Context Engine", slug: "architecture/context-engine" },

            {
              label: "Skill Registry",
              slug: "architecture/skill-registry",
            },
            {
              label: "Stack Detector",
              slug: "architecture/stack-detector",
            },
            {
              label: "Skill Safety Policy",
              slug: "architecture/skill-safety-policy",
            },
            {
              label: "Prompt Orchestrator",
              slug: "architecture/prompt-orchestrator",
            },
            {
              label: "Prompt Orchestrator Contracts",
              slug: "architecture/prompt-orchestrator-contracts",
            },
            {
              label: "Mock Skill Selector",
              slug: "architecture/mock-skill-selector",
            },
            {
              label: "Mock Skill Selector Tests",
              slug: "architecture/mock-skill-selector-tests",
            },
            {
              label: "Cloud Free-Tier Strategy",
              slug: "architecture/cloud-free-tier-strategy",
            },
            { label: "Frontend Architecture", slug: "architecture/frontend-architecture" },
            { label: "Config-Driven UI", slug: "architecture/config-driven-ui" },
            { label: "Database Model", slug: "architecture/database-model" },
          ],
        },
        {
          label: "Workflow",
          items: [
            {
              label: "Development Workflow",
              slug: "workflow/development-workflow",
            },
            {
              label: "Package Management",
              slug: "workflow/package-management",
            },
            { label: "CI Workflow", slug: "workflow/ci-workflow" },
          ],
        },
        {
          label: "ADRs",
          items: [{ autogenerate: { directory: "adrs" } }],
        },
      ],
    }),
  ],
});
