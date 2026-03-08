const locations = [
  {
    label: "CURRENT JOB",
    title: "COO・CAIO・顧問",
    subtitle: "Multiple Roles",
    color: "bg-gold-retro",
    hoverBorder: "hover:border-gold-retro",
    icon: (
      <path
        strokeLinecap="square"
        strokeLinejoin="miter"
        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
      />
    ),
  },
  {
    label: "PARTY SIZE",
    title: "25 AI Employees",
    subtitle: "Active Units",
    color: "bg-green-grass",
    hoverBorder: "hover:border-green-grass",
    icon: (
      <path
        strokeLinecap="square"
        strokeLinejoin="miter"
        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
      />
    ),
  },
  {
    label: "GUILD",
    title: "350+ Community",
    subtitle: "Tohoku Region",
    color: "bg-blue-sky",
    hoverBorder: "hover:border-blue-sky",
    icon: (
      <path
        strokeLinecap="square"
        strokeLinejoin="miter"
        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    ),
  },
  {
    label: "FAME",
    title: "50+ Speaking",
    subtitle: "Events & Seminars",
    color: "bg-red-500",
    hoverBorder: "hover:border-red-500",
    icon: (
      <path
        strokeLinecap="square"
        strokeLinejoin="miter"
        d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
      />
    ),
  },
];

export default function Status() {
  return (
    <section id="status" className="py-20 bg-navy-deep relative overflow-hidden">
      {/* Dashed Connector */}
      <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 border-t-4 border-dashed border-white/20 -translate-y-1/2 z-0" />

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-center text-gold-retro font-[family-name:var(--font-pixel)] text-base sm:text-xl mb-12">
          STATUS / LOCATIONS
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {locations.map((loc, i) => (
            <div
              key={i}
              className={`group flex flex-col items-center bg-navy-light/80 p-4 md:p-6 border-2 border-white/20 ${loc.hoverBorder} transition-colors backdrop-blur-sm relative`}
            >
              <div
                className={`w-12 h-12 md:w-16 md:h-16 ${loc.color} rounded-none flex items-center justify-center mb-4 shadow-pixel group-hover:animate-bounce`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 md:h-8 md:w-8 text-black"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  {loc.icon}
                </svg>
              </div>
              <div className="text-center">
                <p className="text-gray-400 text-[8px] md:text-xs font-[family-name:var(--font-pixel)] mb-1">
                  {loc.label}
                </p>
                <h3 className="text-sm md:text-lg font-bold mb-1">{loc.title}</h3>
                <p className="text-xs md:text-sm text-gray-300">{loc.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
