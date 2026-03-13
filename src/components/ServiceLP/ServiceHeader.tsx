export default function ServiceHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-slate-900 text-white rounded flex items-center justify-center font-black text-lg tracking-tighter">DG</div>
          <span className="font-bold text-lg hidden sm:block text-slate-900">デジタルゴリラ</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a href="#solution" className="hover:text-primary transition-colors">サービス概要</a>
          <a href="#pricing" className="hover:text-primary transition-colors">プラン</a>
          <a href="#proof" className="hover:text-primary transition-colors">実績</a>
          <a href="#faq" className="hover:text-primary transition-colors">FAQ</a>
        </nav>
        <div>
          <a href="#contact" className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-sm font-bold text-white transition-all bg-primary hover:bg-primary-hover rounded-lg shadow-sm hover:shadow">
            無料相談を予約する
          </a>
        </div>
      </div>
    </header>
  );
}
