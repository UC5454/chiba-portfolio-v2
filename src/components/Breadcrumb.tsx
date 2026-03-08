import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const mergedItems: BreadcrumbItem[] =
    items[0]?.href === "/" ? items : [{ label: "ホーム", href: "/" }, ...items];

  return (
    <nav aria-label="breadcrumb" className="bg-navy-deep/50 px-4 py-2 text-sm border border-white/10">
      <ol className="container mx-auto max-w-6xl flex flex-wrap items-center gap-2 text-gold-retro">
        {mergedItems.map((item, index) => {
          const isLast = index === mergedItems.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link href={item.href} className="hover:text-gold-dim transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? "text-white" : ""}>{item.label}</span>
              )}
              {!isLast && <span className="font-[family-name:var(--font-pixel)] text-xs">&gt;</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
