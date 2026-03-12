import { ImageResponse } from "next/og";
import { type NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const title = searchParams.get("title") || "千葉勇志 / Yushi Chiba";
  const category = searchParams.get("category") || "";
  const description = searchParams.get("description") || "AI社員・AI導入の実践知";

  const categoryColors: Record<string, string> = {
    "ai-employees": "#3b82f6",
    "ai-business": "#10b981",
    education: "#8b5cf6",
    government: "#f59e0b",
    column: "#6366f1",
    events: "#ec4899",
  };

  const categoryNames: Record<string, string> = {
    "ai-employees": "AI社員・実運用",
    "ai-business": "AI導入・ビジネス",
    education: "AI研修・教育",
    government: "行政・自治体連携",
    column: "コラム",
    events: "イベント・コミュニティ",
  };

  const accentColor = categoryColors[category] || "#3b82f6";
  const categoryName = categoryNames[category] || "";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#0f172a",
          padding: "60px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top bar accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "6px",
            backgroundColor: accentColor,
          }}
        />

        {/* Category badge */}
        {categoryName && (
          <div
            style={{
              display: "flex",
              marginBottom: "24px",
            }}
          >
            <span
              style={{
                backgroundColor: accentColor,
                color: "white",
                padding: "6px 16px",
                borderRadius: "9999px",
                fontSize: "20px",
                fontWeight: 700,
              }}
            >
              {categoryName}
            </span>
          </div>
        )}

        {/* Title */}
        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
          }}
        >
          <h1
            style={{
              fontSize: title.length > 30 ? "48px" : "56px",
              fontWeight: 900,
              color: "white",
              lineHeight: 1.3,
              margin: 0,
              maxWidth: "90%",
            }}
          >
            {title}
          </h1>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontSize: "22px",
                fontWeight: 700,
                color: "white",
              }}
            >
              千葉 勇志
            </span>
            <span
              style={{
                fontSize: "14px",
                color: "#94a3b8",
                marginTop: "4px",
              }}
            >
              株式会社SOU 代表 / デジタルゴリラ 取締役COO兼CAIO
            </span>
          </div>
          <span
            style={{
              fontSize: "16px",
              color: "#64748b",
            }}
          >
            chiba-portfolio.vercel.app
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
