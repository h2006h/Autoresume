import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkHtml from 'remark-html';
import { readFileSync, existsSync } from 'fs';
import path from 'path';

function buildHtml(content: string): string {
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Resume</title>
  <style>
    @page {
      size: A4;
      margin: 14mm;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      font-size: 11px;
      line-height: 1.4;
      color: #333;
      max-width: 210mm;
      margin: 0 auto;
      padding: 10px;
    }
    h1 { font-size: 20px; border-bottom: 2px solid #333; padding-bottom: 6px; margin: 0 0 8px 0; }
    h2 { font-size: 14px; margin-top: 10px; margin-bottom: 4px; border-bottom: 1px solid #ddd; padding-bottom: 2px; }
    h3 { font-size: 12px; margin-top: 6px; margin-bottom: 2px; }
    ul { padding-left: 16px; margin: 2px 0; }
    li { margin-bottom: 1px; font-size: 11px; }
    strong { color: #222; }
    p { margin: 2px 0; font-size: 11px; }
    hr { border: none; border-top: 1px solid #ccc; margin: 6px 0; }
    blockquote { border-left: 2px solid #999; padding-left: 8px; margin: 3px 0; color: #666; font-size: 10px; }
    table { width: 100%; border-collapse: collapse; font-size: 11px; }
    th, td { padding: 2px 4px; text-align: left; border: 1px solid #ddd; }

    .resume-header { display: flex; gap: 16px; align-items: flex-start; margin-bottom: 6px; }
    .resume-photo { flex-shrink: 0; width: 75px; height: 98px; }
    .resume-photo img { width: 100%; height: 100%; object-fit: cover; border-radius: 3px; }
    .resume-photo-placeholder { width: 100%; height: 100%; background: #eee; border: 1px dashed #999; border-radius: 3px; display: flex; align-items: center; justify-content: center; color: #999; font-size: 10px; }
    .resume-info { flex: 1; min-width: 0; }
    .resume-info h1 { font-size: 18px; margin: 0 0 4px 0; padding: 0; border: none; }
    .resume-info-table { width: 100%; }
    .resume-info-table td { padding: 1px 4px; border: none; vertical-align: top; font-size: 10px; }
    .resume-info-table .label { color: #888; white-space: nowrap; width: 60px; }

    .skill-section { margin-top: 2px; }
    .skill-group { display: flex; flex-wrap: wrap; align-items: baseline; gap: 3px 2px; margin-bottom: 2px; }
    .skill-label { font-size: 10px; color: #888; min-width: 36px; flex-shrink: 0; }
    .skill-tag { display: inline-block; font-size: 10px; color: #444; background: #f5f5f5; border-radius: 2px; padding: 1px 4px; white-space: nowrap; }
  </style>
</head>
<body>
  ${content}
</body>
</html>`;
}

function embedPhoto(html: string): string {
  const photoPath = path.join(process.cwd(), 'public', 'photo.jpg');
  if (!existsSync(photoPath)) return html;

  const buffer = readFileSync(photoPath);
  const ext = path.extname(photoPath).toLowerCase();
  const mimeMap: Record<string, string> = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.webp': 'image/webp',
    '.gif': 'image/gif',
  };
  const mime = mimeMap[ext] || 'image/jpeg';
  const dataUrl = `data:${mime};base64,${buffer.toString('base64')}`;

  // Replace img src referencing /photo.jpg (with optional query string)
  return html.replace(
    /src="\/photo\.jpg(\?[^"]*)?"/g,
    `src="${dataUrl}"`,
  );
}

export async function generatePdf(markdown: string): Promise<Buffer> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkHtml, { sanitize: false })
    .process(markdown);

  const html = embedPhoto(buildHtml(result.toString()));

  const puppeteer = (await import('puppeteer')).default;

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'load' });

    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '12mm',
        bottom: '12mm',
        left: '12mm',
        right: '12mm',
      },
    });

    return Buffer.from(pdf);
  } finally {
    await browser.close();
  }
}
