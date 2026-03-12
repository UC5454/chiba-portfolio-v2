"use client";

import { useEffect } from "react";
import { setupScrollTracking } from "@/lib/analytics";

interface ArticleScrollTrackerProps {
  articleTitle: string;
  category: string;
  wordCount: number;
  readingTime: number;
}

export default function ArticleScrollTracker({
  articleTitle,
  category,
  wordCount,
  readingTime,
}: ArticleScrollTrackerProps) {
  useEffect(() => {
    return setupScrollTracking(articleTitle, category, wordCount, readingTime);
  }, [articleTitle, category, wordCount, readingTime]);

  return null;
}
