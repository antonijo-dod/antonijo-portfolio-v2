import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const contentDirectory = path.join(process.cwd(), 'content');

export interface MarkdownData {
  slug: string;
  contentHtml: string;
  [key: string]: unknown;
}

export function getMarkdownFiles(dir: string): MarkdownData[] {
  const fullDir = path.join(contentDirectory, dir);

  if (!fs.existsSync(fullDir)) return [];

  const entries = fs.readdirSync(fullDir, { withFileTypes: true });
  const results: MarkdownData[] = [];

  for (const entry of entries) {
    let filePath: string;
    let slug: string;

    if (entry.isDirectory()) {
      const indexPath = path.join(fullDir, entry.name, 'index.md');
      if (!fs.existsSync(indexPath)) continue;
      filePath = indexPath;
      slug = entry.name;
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      filePath = path.join(fullDir, entry.name);
      slug = entry.name.replace(/\.md$/, '');
    } else {
      continue;
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    results.push({ slug, contentHtml: content, ...data });
  }

  return results;
}

export async function getMarkdownBySlug(
  dir: string,
  slug: string,
): Promise<MarkdownData | null> {
  const fullDir = path.join(contentDirectory, dir);

  const candidates = [
    path.join(fullDir, slug, 'index.md'),
    path.join(fullDir, `${slug}.md`),
  ];

  const filePath = candidates.find(p => fs.existsSync(p));
  if (!filePath) return null;

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  const processed = await remark().use(html, { sanitize: false }).process(content);
  const contentHtml = processed.toString();

  return { slug, contentHtml, ...data };
}

export function getAllSlugs(dir: string): string[] {
  const fullDir = path.join(contentDirectory, dir);
  if (!fs.existsSync(fullDir)) return [];

  return fs.readdirSync(fullDir, { withFileTypes: true }).flatMap(entry => {
    if (entry.isDirectory()) {
      const indexPath = path.join(fullDir, entry.name, 'index.md');
      return fs.existsSync(indexPath) ? [entry.name] : [];
    }
    if (entry.isFile() && entry.name.endsWith('.md')) {
      return [entry.name.replace(/\.md$/, '')];
    }
    return [];
  });
}
