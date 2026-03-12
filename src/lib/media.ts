import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { MediaArticle, MediaCategory } from "@/types/media";

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

async function parseArticle(category: string, filename: string): Promise<MediaArticle> {
  const filePath = path.join(CONTENT_DIR, category, filename);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  const processed = await remark().use(html).process(content);
  const contentHtml = processed.toString();

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
