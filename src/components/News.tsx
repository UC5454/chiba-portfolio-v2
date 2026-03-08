const newsItems = [
  {
    type: "IMPORTANT",
    color: "red",
    date: "2026.03.05",
    text: "AIカンファレンス登壇決定！",
  },
  {
    type: "UPDATE",
    color: "blue",
    date: "2026.02.28",
    text: "AI社員が25名体制になりました",
  },
  {
    type: "COMMUNITY",
    color: "green",
    date: "2026.02.15",
    text: "東北AIコミュニティ メンバー350名突破",
  },
];

const colorMap: Record<string, { badge: string; border: string; bg: string }> = {
  red: {
    badge: "text-red-600 bg-red-100",
    border: "border-l-red-500",
    bg: "",
  },
  blue: {
    badge: "text-blue-600 bg-blue-100",
    border: "border-l-blue-500",
    bg: "",
  },
  green: {
    badge: "text-green-600 bg-green-100",
    border: "border-l-green-500",
    bg: "",
  },
};

export default function News() {
  return (
    <section id="news" className="py-16 bg-navy-light relative">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-wood-dark p-2 rounded-sm shadow-pixel">
          <div className="bg-wood-light border-4 border-[#5c3a21] p-6 relative">
            {/* Nails */}
            <div className="absolute top-2 left-2 w-3 h-3 rounded-full bg-gray-400 shadow-inner" />
            <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-gray-400 shadow-inner" />

            <div className="flex justify-center mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-[#3e2723] font-[family-name:var(--font-pixel)] bg-[#deb887] px-4 py-1 border-2 border-[#5c3a21] shadow-sm transform -rotate-1">
                旅の掲示板 (News)
              </h3>
            </div>

            <ul className="space-y-4">
              {newsItems.map((item, i) => {
                const colors = colorMap[item.color];
                return (
                  <li
                    key={i}
                    className={`bg-[#fdf5e6] p-4 text-gray-900 border-l-4 ${colors.border} shadow-sm flex flex-col md:flex-row gap-2 md:items-center transform hover:-translate-y-1 transition-transform`}
                  >
                    <span
                      className={`font-bold font-[family-name:var(--font-pixel)] text-[10px] ${colors.badge} px-2 py-1 rounded`}
                    >
                      {item.type}
                    </span>
                    <span className="text-sm font-bold text-gray-500">
                      {item.date}
                    </span>
                    <span className="font-bold">{item.text}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
