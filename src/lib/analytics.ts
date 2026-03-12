/**
 * GA4 Custom Event Tracking Utilities
 * Design doc: marketing-team/セイラ.../outputs/ga4-tracking-design.md
 */

type GTagEvent = {
  event_category?: string;
  event_label?: string;
  value?: number;
  [key: string]: string | number | boolean | undefined;
};

function gtag(event: string, params?: GTagEvent) {
  if (typeof window === "undefined") return;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const w = window as any;
  if (typeof w.gtag === "function") {
    w.gtag("event", event, params);
  }
}

// --- Lead Acquisition Funnel ---

export function trackLeadMagnetClick(magnetName: string, category?: string) {
  gtag("lead_magnet_click", {
    magnet_name: magnetName,
    page_path: window.location.pathname,
    category: category || "",
  });
}

export function trackLeadMagnetDownload(magnetName: string) {
  gtag("lead_magnet_download", {
    magnet_name: magnetName,
    page_path: window.location.pathname,
  });
}

export function trackCtaClick(ctaText: string, ctaPosition: string, category?: string) {
  gtag("cta_click", {
    cta_text: ctaText,
    cta_position: ctaPosition,
    page_path: window.location.pathname,
    category: category || "",
  });
}

export function trackContactFormSubmit(formType: string) {
  gtag("contact_form_submit", {
    form_type: formType,
    page_path: window.location.pathname,
  });
}

// --- Content Engagement ---

export function trackArticleReadComplete(
  articleTitle: string,
  category: string,
  wordCount: number,
  readingTime: number
) {
  gtag("article_read_complete", {
    article_title: articleTitle,
    category,
    word_count: wordCount,
    reading_time: readingTime,
  });
}

export function trackArticleRead50pct(articleTitle: string, category: string) {
  gtag("article_read_50pct", {
    article_title: articleTitle,
    category,
  });
}

export function trackInternalLinkClick(linkUrl: string, linkText: string, sourceCategory?: string) {
  gtag("internal_link_click", {
    link_url: linkUrl,
    link_text: linkText,
    source_page: window.location.pathname,
    source_category: sourceCategory || "",
  });
}

export function trackCategoryNavigation(category: string) {
  gtag("category_navigation", {
    category,
    source_page: window.location.pathname,
  });
}

export function trackRelatedArticleClick(targetArticle: string, sourceArticle: string, position: number) {
  gtag("related_article_click", {
    target_article: targetArticle,
    source_article: sourceArticle,
    position,
  });
}

export function trackTocClick(headingText: string, articleTitle: string) {
  gtag("toc_click", {
    heading_text: headingText,
    article_title: articleTitle,
  });
}

// --- Social / External ---

export function trackSocialShareClick(platform: string, articleTitle: string) {
  gtag("social_share_click", {
    platform,
    article_title: articleTitle,
    page_path: window.location.pathname,
  });
}

export function trackExternalLinkClick(linkUrl: string, linkText: string) {
  gtag("external_link_click", {
    link_url: linkUrl,
    link_text: linkText,
    page_path: window.location.pathname,
  });
}

// --- Scroll Tracking Hook ---

/**
 * Sets up scroll-based article reading tracking.
 * Call once on article page mount with the article content container ref.
 */
export function setupScrollTracking(
  articleTitle: string,
  category: string,
  wordCount: number,
  readingTime: number
): () => void {
  let has50 = false;
  let has90 = false;

  function onScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return;

    const pct = scrollTop / docHeight;

    if (!has50 && pct >= 0.5) {
      has50 = true;
      trackArticleRead50pct(articleTitle, category);
    }
    if (!has90 && pct >= 0.9) {
      has90 = true;
      trackArticleReadComplete(articleTitle, category, wordCount, readingTime);
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  return () => window.removeEventListener("scroll", onScroll);
}
