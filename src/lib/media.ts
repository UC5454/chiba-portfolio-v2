import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { MediaArticle, MediaCategory, HeadingItem } from "@/types/media";

const CONTENT_DIR = path.join(process.cwd(), "src/content/media");

function getCategoryDirs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs.readdirSync(CONTENT_DIR).filter((dir) => {
    const fullPath = path.join(CONTENT_DIR, dir);
    return fs.statSync(fullPath).isDirectory();
  });
}

function getMarkdownFiles(categoryDir: string): string[] {
  const dirPath = path.join(CONTENT_DIR, categoryDir);
  if (!fs.existsSync(dirPath)) return [];
  return fs.readdirSync(dirPath).filter((file) => file.endsWith(".md"));
}

/** Generate a URL-safe slug from heading text */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Extract headings from HTML and add IDs */
function processHeadings(htmlContent: string): { html: string; headings: HeadingItem[] } {
  const headings: HeadingItem[] = [];
  const slugCounts: Record<string, number> = {};

  const processed = htmlContent.replace(
    /<h([23])>(.*?)<\/h[23]>/g,
    (_match, level: string, text: string) => {
      const plainText = text.replace(/<[^>]*>/g, "");
      let id = slugify(plainText);
      if (!id) id = `heading-${headings.length}`;
      // Handle duplicates
      if (slugCounts[id] !== undefined) {
        slugCounts[id]++;
        id = `${id}-${slugCounts[id]}`;
      } else {
        slugCounts[id] = 0;
      }
      headings.push({ id, text: plainText, level: parseInt(level) as 2 | 3 });
      return `<h${level} id="${id}">${text}</h${level}>`;
    }
  );

  return { html: processed, headings };
}

/** Estimate reading time (Japanese: ~500 chars/min) */
function estimateReadingTime(htmlContent: string): number {
  const plainText = htmlContent.replace(/<[^>]*>/g, "");
  const charCount = plainText.length;
  return Math.max(1, Math.round(charCount / 500));
}

async function parseArticle(category: string, filename: string): Promise<MediaArticle> {
  const filePath = path.join(CONTENT_DIR, category, filename);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  const processed = await remark().use(html).process(content);
  const rawHtml = processed.toString();
  const { html: contentHtml, headings } = processHeadings(
    rawHtml.replace(/<table/g, '<div class="table-wrapper"><table').replace(/<\/table>/g, '</table></div>')
  );
  const readingTime = estimateReadingTime(rawHtml);

  return {
    slug: filename.replace(/\.md$/, ""),
    category: (data.category || category) as MediaCategory,
    title: data.title || "",
    description: data.description || "",
    date: data.date || "",
    updatedAt: data.updatedAt,
    thumbnail: data.thumbnail,
    tags: data.tags || [],
    content: contentHtml,
    headings,
    readingTime,
  };
}

export async function getAllArticles(): Promise<MediaArticle[]> {
  const categories = getCategoryDirs();
  const articles: MediaArticle[] = [];

  for (const category of categories) {
    const files = getMarkdownFiles(category);
    for (const file of files) {
      const article = await parseArticle(category, file);
      articles.push(article);
    }
  }

  return articles.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export async function getArticlesByCategory(category: string): Promise<MediaArticle[]> {
  const files = getMarkdownFiles(category);
  const articles: MediaArticle[] = [];

  for (const file of files) {
    const article = await parseArticle(category, file);
    articles.push(article);
  }

  return articles.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export async function getArticleBySlug(category: string, slug: string): Promise<MediaArticle | null> {
  const filename = `${slug}.md`;
  const filePath = path.join(CONTENT_DIR, category, filename);
  if (!fs.existsSync(filePath)) return null;
  return parseArticle(category, filename);
}

export function getAllCategories(): string[] {
  return getCategoryDirs();
}

/** Split HTML content at approximately 40% for mid-article CTA insertion.
 *  Returns null if fewer than 5 paragraphs (short articles don't need mid CTA). */
export function splitContentAt40Percent(htmlContent: string): { before: string; after: string } | null {
  const parts = htmlContent.split("</p>");
  // Need at least 5 paragraphs to insert a mid CTA
  if (parts.length < 6) return null; // 6 because split adds an empty tail
  const splitIndex = Math.floor(parts.length * 0.4);
  const before = parts.slice(0, splitIndex).join("</p>") + "</p>";
  const after = parts.slice(splitIndex).join("</p>");
  return { before, after };
}
