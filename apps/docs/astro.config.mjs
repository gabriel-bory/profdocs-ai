import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

export default defineConfig({
  integrations: [
    starlight({
      title: "ProfDocs AI Docs",
      description: "Documentation as code for ProfDocs AI.",
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
          ],
        },
        {
          label: "Architecture",
          items: [
            { label: "Architecture Overview", slug: "architecture/overview" },
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
