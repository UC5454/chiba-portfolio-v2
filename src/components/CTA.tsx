import Link from "next/link";

export default function CTA() {
  return (
    <section
      id="contact"
      className="py-32 relative overflow-hidden flex flex-col items-center justify-center"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0" style={{ backgroundImage: "url('/images/bg-cta.webp')", backgroundSize: "cover", backgroundPosition: "center" }} />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/60 to-purple-900/70 z-0" />

      <div className="relative z-10 text-center px-4">
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-6 drop-shadow-[4px_4px_0_#000]">
          語るより、動こう。
        </h2>
        <p className="text-blue-200 mb-12 text-base sm:text-lg">
          次の時代へ、共に出発しませんか？
        </p>

        <Link
          href="/contact"
          className="inline-block bg-gold-retro text-black font-[family-name:var(--font-pixel)] text-xs sm:text-sm md:text-base px-6 sm:px-8 py-4 border-b-4 border-r-4 border-black hover:translate-y-1 hover:border-b-0 hover:border-r-0 hover:mb-1 hover:mr-1 transition-all shadow-pixel-gold"
        >
          ▶ はなす
        </Link>
      </div>
    </section>
  );
}
