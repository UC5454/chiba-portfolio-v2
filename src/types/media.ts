export type MediaCategory = "ai-employees" | "ai-business" | "education" | "government" | "column" | "events" | "tech";

export interface HeadingItem {
  id: string;
  text: string;
  level: 2 | 3;
}

export interface MediaArticle {
  slug: string;
  category: MediaCategory;
  title: string;
  description: string;
  date: string;
  updatedAt?: string;
  thumbnail?: string;
  tags: string[];
  content: string; // HTML変換後
  headings: HeadingItem[];
  readingTime: number; // minutes
}

export interface CategoryInfo {
  slug: MediaCategory;
  name: string;
  icon: string;
  description: string;
  color: string;
}
