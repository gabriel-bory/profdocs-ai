#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import * as docx from 'docx';
import { chromium } from '@playwright/test';

const {
  AlignmentType,
  Document,
  HeadingLevel,
  ImageRun,
  Packer,
  Paragraph,
  TextRun,
} = docx;

const repoRoot = process.cwd();

const manualPages = [
  {
    slug: 'web-application',
    file: 'apps/docs/src/content/docs/user-manual/web-application.mdx',
  },
  {
    slug: 'dashboard',
    file: 'apps/docs/src/content/docs/user-manual/dashboard.mdx',
  },
  {
    slug: 'documents',
    file: 'apps/docs/src/content/docs/user-manual/documents.mdx',
  },
  {
    slug: 'upload',
    file: 'apps/docs/src/content/docs/user-manual/upload.mdx',
  },
  {
    slug: 'ai-preview',
    file: 'apps/docs/src/content/docs/user-manual/ai-preview.mdx',
  },
  {
    slug: 'export-guide',
    file: 'apps/docs/src/content/docs/user-manual/export-guide.mdx',
  },
];

const outputDir = path.join(repoRoot, 'apps/docs/public/exports');
const docxOutputPath = path.join(outputDir, 'ProfDocs_AI_User_Manual.docx');
const pdfOutputPath = path.join(outputDir, 'ProfDocs_AI_User_Manual.pdf');

function ensureOutputDir() {
  fs.mkdirSync(outputDir, { recursive: true });
}

function normalizeText(value) {
  return value
    .replace(/\r/g, '')
    .replace(/→/g, '->')
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/[–—]/g, '-')
    .trim();
}

function stripInlineMarkdown(value) {
  return normalizeText(value)
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1');
}

function escapeHtml(value) {
  return normalizeText(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function readManualPage(page) {
  const fullPath = path.join(repoRoot, page.file);

  if (!fs.existsSync(fullPath)) {
    throw new Error(`Missing manual page: ${page.file}`);
  }

  const raw = fs.readFileSync(fullPath, 'utf8');
  const normalized = raw
    .replace(/^\uFEFF/, '')
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n');

  const match = normalized.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);

  if (!match) {
    const preview = JSON.stringify(normalized.slice(0, 160));
    throw new Error(`Missing frontmatter in ${page.file}. File preview: ${preview}`);
  }

  const frontmatter = match[1];
  const body = match[2].trim();
  const title = frontmatter.match(/^title:\s*["']?(.+?)["']?\s*$/m)?.[1]?.trim();

  if (!title) {
    throw new Error(`Missing title in ${page.file}`);
  }

  return {
    ...page,
    title,
    body,
    blocks: parseMarkdownBlocks(body),
  };
}
function parseMarkdownBlocks(markdown) {
  const lines = markdown.split(/\n/);
  const blocks = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];

    if (!line.trim()) {
      index += 1;
      continue;
    }

    const imageMatch = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imageMatch) {
      blocks.push({
        type: 'image',
        alt: normalizeText(imageMatch[1]),
        src: imageMatch[2].trim(),
      });
      index += 1;
      continue;
    }

    if (line.startsWith('```')) {
      const language = line.replace(/^```/, '').trim();
      const codeLines = [];
      index += 1;

      while (index < lines.length && !lines[index].startsWith('```')) {
        codeLines.push(lines[index]);
        index += 1;
      }

      index += 1;
      blocks.push({
        type: 'code',
        language,
        value: codeLines.join('\n'),
      });
      continue;
    }

    const headingMatch = line.match(/^(#{2,6})\s+(.+)$/);
    if (headingMatch) {
      blocks.push({
        type: 'heading',
        level: headingMatch[1].length,
        value: stripInlineMarkdown(headingMatch[2]),
      });
      index += 1;
      continue;
    }

    if (line.match(/^-\s+/)) {
      const items = [];

      while (index < lines.length && lines[index].match(/^-\s+/)) {
        items.push(stripInlineMarkdown(lines[index].replace(/^-\s+/, '')));
        index += 1;
      }

      blocks.push({
        type: 'list',
        items,
      });
      continue;
    }

    const paragraphLines = [];

    while (
      index < lines.length &&
      lines[index].trim() &&
      !lines[index].match(/^!\[([^\]]*)\]\(([^)]+)\)$/) &&
      !lines[index].startsWith('```') &&
      !lines[index].match(/^(#{2,6})\s+(.+)$/) &&
      !lines[index].match(/^-\s+/)
    ) {
      paragraphLines.push(lines[index].trim());
      index += 1;
    }

    blocks.push({
      type: 'paragraph',
      value: stripInlineMarkdown(paragraphLines.join(' ')),
    });
  }

  return blocks;
}

function resolveManualImage(src) {
  if (!src.startsWith('/')) {
    throw new Error(`Only public absolute image paths are supported for export: ${src}`);
  }

  const fullPath = path.join(repoRoot, 'apps/docs/public', src.replace(/^\//, ''));

  if (!fs.existsSync(fullPath)) {
    throw new Error(`Missing image referenced by manual export: ${src}`);
  }

  return fullPath;
}

function readPngSize(buffer) {
  const pngSignature = '89504e470d0a1a0a';

  if (buffer.subarray(0, 8).toString('hex') !== pngSignature) {
    throw new Error('Only PNG screenshots are supported in the current exporter.');
  }

  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
  };
}

function scaledImageDimensions(width, height, maxWidth = 560, maxHeight = 680) {
  const ratio = Math.min(maxWidth / width, maxHeight / height, 1);

  return {
    width: Math.round(width * ratio),
    height: Math.round(height * ratio),
  };
}

function docxHeadingLevel(level) {
  if (level <= 2) return HeadingLevel.HEADING_1;
  if (level === 3) return HeadingLevel.HEADING_2;
  return HeadingLevel.HEADING_3;
}

function blocksToDocxChildren(pages) {
  const children = [];

  children.push(
    new Paragraph({
      text: 'ProfDocs AI User Manual',
      heading: HeadingLevel.TITLE,
      alignment: AlignmentType.CENTER,
      spacing: { after: 240 },
    }),
  );

  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: 'Generated from the Astro Starlight documentation source.',
          italics: true,
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 420 },
    }),
  );

  pages.forEach((page, pageIndex) => {
    if (pageIndex > 0) {
      children.push(new Paragraph({ children: [new TextRun({ break: 1 })] }));
    }

    children.push(
      new Paragraph({
        text: page.title,
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 240, after: 180 },
      }),
    );

    for (const block of page.blocks) {
      if (block.type === 'heading') {
        children.push(
          new Paragraph({
            text: block.value,
            heading: docxHeadingLevel(block.level),
            spacing: { before: 220, after: 120 },
          }),
        );
      }

      if (block.type === 'paragraph' && block.value) {
        children.push(
          new Paragraph({
            children: [new TextRun({ text: block.value })],
            spacing: { after: 140 },
          }),
        );
      }

      if (block.type === 'list') {
        for (const item of block.items) {
          children.push(
            new Paragraph({
              text: item,
              bullet: { level: 0 },
              spacing: { after: 80 },
            }),
          );
        }
      }

      if (block.type === 'code') {
        for (const codeLine of block.value.split('\n')) {
          children.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: codeLine || ' ',
                  font: 'Courier New',
                  size: 18,
                }),
              ],
              shading: {
                type: 'clear',
                color: 'auto',
                fill: 'F3F4F6',
              },
              spacing: { after: 40 },
            }),
          );
        }
      }

      if (block.type === 'image') {
        const imagePath = resolveManualImage(block.src);
        const buffer = fs.readFileSync(imagePath);
        const { width, height } = readPngSize(buffer);
        const dimensions = scaledImageDimensions(width, height);

        children.push(
          new Paragraph({
            children: [
              new ImageRun({
                data: buffer,
                type: 'png',
                transformation: dimensions,
                altText: {
                  title: block.alt || path.basename(imagePath),
                  description: block.alt || path.basename(imagePath),
                  name: path.basename(imagePath),
                },
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { before: 120, after: 160 },
          }),
        );

        if (block.alt) {
          children.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: block.alt,
                  italics: true,
                  size: 18,
                }),
              ],
              alignment: AlignmentType.CENTER,
              spacing: { after: 160 },
            }),
          );
        }
      }
    }
  });

  return children;
}

async function writeDocx(pages) {
  const document = new Document({
    creator: 'Gabriel Bory Prevez',
    title: 'ProfDocs AI User Manual',
    description: 'Generated user manual for the ProfDocs AI web application.',
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 720,
              right: 720,
              bottom: 720,
              left: 720,
            },
          },
        },
        children: blocksToDocxChildren(pages),
      },
    ],
  });

  const buffer = await Packer.toBuffer(document);
  fs.writeFileSync(docxOutputPath, buffer);
}

function imageToDataUri(src) {
  const imagePath = resolveManualImage(src);
  const buffer = fs.readFileSync(imagePath);

  return `data:image/png;base64,${buffer.toString('base64')}`;
}

function blocksToHtml(page) {
  const chunks = [`<section class="manual-section">`, `<h1>${escapeHtml(page.title)}</h1>`];

  for (const block of page.blocks) {
    if (block.type === 'heading') {
      const htmlLevel = Math.min(Math.max(block.level, 2), 4);
      chunks.push(`<h${htmlLevel}>${escapeHtml(block.value)}</h${htmlLevel}>`);
    }

    if (block.type === 'paragraph' && block.value) {
      chunks.push(`<p>${escapeHtml(block.value)}</p>`);
    }

    if (block.type === 'list') {
      chunks.push('<ul>');
      for (const item of block.items) {
        chunks.push(`<li>${escapeHtml(item)}</li>`);
      }
      chunks.push('</ul>');
    }

    if (block.type === 'code') {
      chunks.push(`<pre><code>${escapeHtml(block.value)}</code></pre>`);
    }

    if (block.type === 'image') {
      chunks.push(`
        <figure>
          <img src="${imageToDataUri(block.src)}" alt="${escapeHtml(block.alt)}" />
          ${block.alt ? `<figcaption>${escapeHtml(block.alt)}</figcaption>` : ''}
        </figure>
      `);
    }
  }

  chunks.push('</section>');
  return chunks.join('\n');
}

function buildHtml(pages) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>ProfDocs AI User Manual</title>
  <style>
    @page {
      size: A4;
      margin: 18mm 16mm;
    }

    :root {
      color-scheme: light;
      --text: #111827;
      --muted: #4b5563;
      --border: #d1d5db;
      --surface: #ffffff;
      --soft: #f3f4f6;
      --accent: #3949ab;
    }

    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      color: var(--text);
      background: var(--surface);
      font-family:
        Inter,
        ui-sans-serif,
        system-ui,
        -apple-system,
        BlinkMacSystemFont,
        "Segoe UI",
        sans-serif;
      font-size: 11.5pt;
      line-height: 1.55;
    }

    .cover {
      page-break-after: always;
      min-height: 235mm;
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
      border: 1px solid var(--border);
      padding: 32mm 18mm;
      border-radius: 16px;
    }

    .cover h1 {
      font-size: 34pt;
      line-height: 1.08;
      margin: 0 0 12pt;
      color: var(--accent);
    }

    .cover p {
      max-width: 520px;
      margin: 0 auto 6pt;
      color: var(--muted);
      font-size: 12pt;
    }

    .manual-section {
      page-break-before: always;
    }

    .manual-section:first-of-type {
      page-break-before: auto;
    }

    h1 {
      font-size: 24pt;
      line-height: 1.12;
      margin: 0 0 16pt;
      color: #0f172a;
    }

    h2 {
      font-size: 17pt;
      margin: 22pt 0 8pt;
      color: #111827;
      break-after: avoid;
    }

    h3 {
      font-size: 13.5pt;
      margin: 16pt 0 6pt;
      color: #1f2937;
      break-after: avoid;
    }

    p {
      margin: 0 0 9pt;
    }

    ul {
      margin: 0 0 11pt 18pt;
      padding: 0;
    }

    li {
      margin: 0 0 4pt;
    }

    pre {
      white-space: pre-wrap;
      background: var(--soft);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 10px;
      font-size: 9pt;
      line-height: 1.35;
      break-inside: avoid;
    }

    figure {
      margin: 14pt 0 16pt;
      padding: 0;
      break-inside: avoid;
      text-align: center;
    }

    img {
      max-width: 100%;
      max-height: 230mm;
      border: 1px solid var(--border);
      border-radius: 10px;
    }

    figcaption {
      color: var(--muted);
      font-size: 9.5pt;
      margin-top: 5pt;
    }
  </style>
</head>
<body>
  <section class="cover">
    <h1>ProfDocs AI User Manual</h1>
    <p>Generated from the Astro Starlight documentation source.</p>
    <p>Includes Playwright-generated visual evidence for the current MVP shell.</p>
  </section>

  ${pages.map(blocksToHtml).join('\n')}
</body>
</html>`;
}

async function writePdf(pages) {
  const html = buildHtml(pages);
  const launchOptions =
    process.env.PW_USE_SYSTEM_CHROME === 'true'
      ? { channel: 'chrome' }
      : {};

  const browser = await chromium.launch(launchOptions);

  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'load' });

    await page.pdf({
      path: pdfOutputPath,
      format: 'A4',
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: '<span></span>',
      footerTemplate:
        '<div style="font-size:8px;color:#6b7280;width:100%;text-align:center;">ProfDocs AI User Manual - Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>',
      margin: {
        top: '18mm',
        right: '16mm',
        bottom: '18mm',
        left: '16mm',
      },
    });
  } finally {
    await browser.close();
  }
}

function printOutputSummary() {
  const outputs = [docxOutputPath, pdfOutputPath];

  console.log('\nGenerated manual export files:\n');

  for (const output of outputs) {
    const stat = fs.statSync(output);
    const relative = path.relative(repoRoot, output);
    const sizeKb = Math.round(stat.size / 1024);
    console.log(`- ${relative} (${sizeKb} KB)`);
  }
}

async function main() {
  ensureOutputDir();

  const pages = manualPages.map(readManualPage);

  await writeDocx(pages);
  await writePdf(pages);

  printOutputSummary();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

