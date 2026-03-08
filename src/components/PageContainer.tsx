import Breadcrumb from "@/components/Breadcrumb";

interface PageContainerProps {
  children: React.ReactNode;
  title: string;
  breadcrumb: { label: string; href?: string }[];
}

export default function PageContainer({ children, title, breadcrumb }: PageContainerProps) {
  return (
    <main className="pt-20 min-h-screen">
      <Breadcrumb items={breadcrumb} />
      <section className="container mx-auto max-w-6xl px-4 py-8 md:py-12">
        <h1 className="text-gold-retro font-[family-name:var(--font-pixel)] text-lg sm:text-2xl mb-6">
          {title}
        </h1>
        {children}
      </section>
    </main>
  );
}
