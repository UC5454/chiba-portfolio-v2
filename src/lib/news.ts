import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export interface NewsItem {
  id: string;
  type: string;
  color: string;
  date: string;
  text: string;
  content: string;
  thumbnail?: string;
}

const CONTENT_DIR = path.join(process.cwd(), "src/content/news");

function getMarkdownFiles(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".md") && !file.startsWith("_"));
}

async function parseNewsItem(filename: string): Promise<NewsItem> {
  const filePath = path.join(CONTENT_DIR, filename);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  const processed = await remark().use(html).process(content);
  const contentHtml = processed.toString();

  return {
    id: filename.replace(/\.md$/, ""),
    type: data.type || "",
    color: data.color || "blue",
    date: data.date || "",
    text: data.title || "",
    content: contentHtml,
    thumbnail: data.thumbnail,
  };
}

export async function getAllNews(): Promise<NewsItem[]> {
  const files = getMarkdownFiles();
  const items: NewsItem[] = [];

  for (const file of files) {
    const item = await parseNewsItem(file);
    items.push(item);
  }

  return items.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export async function getNewsById(id: string): Promise<NewsItem | null> {
  const filename = `${id}.md`;
  const filePath = path.join(CONTENT_DIR, filename);
  if (!fs.existsSync(filePath)) return null;
  return parseNewsItem(filename);
}
