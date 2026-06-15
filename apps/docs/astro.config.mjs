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
          ],
        },
        {
          label: "Architecture",
          items: [
            { label: "Architecture Overview", slug: "architecture/overview" },
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
